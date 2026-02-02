
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../constants';
import { ChatMessage } from '../types';

// Helper for PCM decoding (Manual implementation as per guidelines)
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper for PCM encoding (Manual implementation as per guidelines)
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Audio Decoding as per Live API Rules
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer, data.byteOffset, data.byteLength / 2);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm your Farm-To-Fit guide. Looking for meal recommendations or have a question about our local sourcing?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const liveSessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setIsProcessing(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });
      
      const text = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (err: any) {
      console.error(err);
      setError("Text assistant connection failed.");
      setMessages(prev => [...prev, { role: 'assistant', content: "Oops! Something went wrong on my end." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const startVoiceSession = async () => {
    setError(null);
    setIsListening(true);
    setMode('voice');

    try {
      // 1. Setup Audio Contexts
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      await inputAudioContext.resume();
      await outputAudioContext.resume();

      inputAudioContextRef.current = inputAudioContext;
      outputAudioContextRef.current = outputAudioContext;

      // 2. Request Mic
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // 3. Initialize AI Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 4. Connect to Live API
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            console.debug('Live session opened');
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000'
              };
              // Crucial: Rely on promise to avoid race condition/stale closures
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              }).catch(err => console.error("Failed to send audio input:", err));
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            // Find and process audio parts
            const parts = msg.serverContent?.modelTurn?.parts || [];
            for (const part of parts) {
              const base64Audio = part.inlineData?.data;
              if (base64Audio && outputAudioContextRef.current) {
                const ctx = outputAudioContextRef.current;
                
                // Track start time as per rules
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                
                const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
                const sourceNode = ctx.createBufferSource();
                sourceNode.buffer = audioBuffer;
                sourceNode.connect(ctx.destination);
                
                sourceNode.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                
                sourcesRef.current.add(sourceNode);
                sourceNode.onended = () => sourcesRef.current.delete(sourceNode);
              }
            }

            if (msg.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch (e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (err: any) => {
            console.error("Live API Error:", err);
            setError("Connection error. Please try again.");
            stopVoiceSession();
          },
          onclose: (e: any) => {
            console.debug('Live session closed', e);
            setIsListening(false);
          },
        }
      });

      liveSessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error("Failed to start voice session:", err);
      setError("Mic or Network error. Check permissions.");
      setIsListening(false);
    }
  };

  const stopVoiceSession = () => {
    if (liveSessionRef.current) {
      try { liveSessionRef.current.close(); } catch (e) {}
      liveSessionRef.current = null;
    }
    if (inputAudioContextRef.current) {
      try { inputAudioContextRef.current.close(); } catch (e) {}
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      try { outputAudioContextRef.current.close(); } catch (e) {}
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    setIsListening(false);
    setMode('text');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* FAB */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="forest-green w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group animate-bounce"
        >
          <div className="absolute inset-0 rounded-full forest-green opacity-40 animate-ping"></div>
          <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[400px] h-[600px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="forest-green p-6 text-white flex justify-between items-center">
            <div>
              <h3 className="font-bold">Farm-To-Fit Assistant</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">AI Guide Active</span>
              </div>
            </div>
            <button onClick={() => { setIsOpen(false); stopVoiceSession(); }} className="text-white/50 hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mode Switch */}
          <div className="bg-slate-50 p-2 flex gap-2">
            <button
              onClick={() => { stopVoiceSession(); setMode('text'); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${mode === 'text' ? 'bg-white shadow text-forest' : 'text-slate-400 hover:text-slate-600'}`}
            >
              TEXT MODE
            </button>
            <button
              onClick={() => setMode('voice')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${mode === 'voice' ? 'bg-white shadow text-forest' : 'text-slate-400 hover:text-slate-600'}`}
            >
              VOICE AGENT
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4" ref={scrollRef}>
            {error && (
              <div className="bg-red-50 text-red-600 text-[10px] p-3 rounded-xl font-bold uppercase tracking-wider text-center border border-red-100">
                {error}
              </div>
            )}
            
            {mode === 'text' ? (
              messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                    ? 'bg-[#D35400] text-white rounded-br-none shadow-md' 
                    : 'bg-slate-100 text-slate-700 rounded-bl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isListening ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/20 scale-110' : 'border-slate-100'}`}>
                  {isListening ? (
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-8 bg-orange-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-16 bg-orange-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-12 bg-orange-500 rounded-full animate-bounce delay-200"></div>
                      <div className="w-1.5 h-8 bg-orange-500 rounded-full animate-bounce delay-300"></div>
                    </div>
                  ) : (
                    <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{isListening ? "Listening..." : "Voice Mode Inactive"}</h4>
                  <p className="text-slate-500 text-sm px-8">
                    {isListening 
                      ? "Ask about our macros, meal sourcing, or place an order by voice."
                      : "Tap the microphone to start a real-time conversation with our coach."
                    }
                  </p>
                </div>
                {!isListening && (
                  <button
                    onClick={startVoiceSession}
                    className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition transform hover:scale-105 active:scale-95"
                  >
                    Start Voice Chat
                  </button>
                )}
                {isListening && (
                  <button
                    onClick={stopVoiceSession}
                    className="text-slate-400 font-bold hover:text-slate-600 underline text-sm transition"
                  >
                    End Session
                  </button>
                )}
              </div>
            )}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input */}
          {mode === 'text' && (
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-grow bg-white border border-slate-200 px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  className="forest-green text-white p-3 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
