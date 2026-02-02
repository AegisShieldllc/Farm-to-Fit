
import React, { useState } from 'react';

const Checkout: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [frequency, setFrequency] = useState('weekly');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-forest mb-12">Set Your Schedule</h1>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">Delivery Calendar - {new Date().toLocaleString('default', { month: 'long' })}</h3>
              <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div> Selected
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 border border-slate-200 rounded-full"></div> Available
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-3 mb-12">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-black text-slate-300 uppercase py-2">{day}</div>
              ))}
              {/* Dummy padding for calendar offset */}
              <div className="h-14"></div>
              <div className="h-14"></div>
              {days.map(day => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`h-14 rounded-2xl flex items-center justify-center font-bold transition-all border ${
                    selectedDays.includes(day)
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white border-slate-100 hover:border-orange-200 text-slate-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl">
              <h4 className="font-bold mb-4">Select Frequency</h4>
              <div className="flex flex-wrap gap-4">
                {['One-Time', 'Weekly', 'Bi-Weekly', 'Monthly'].map(freq => (
                  <button
                    key={freq}
                    onClick={() => setFrequency(freq.toLowerCase())}
                    className={`px-8 py-3 rounded-xl font-bold text-sm transition-all border ${
                      frequency === freq.toLowerCase()
                      ? 'bg-forest text-white border-transparent'
                      : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">
                *Subscriptions enjoy 15% discount and prioritized delivery slots.
              </p>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl sticky top-28">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-slate-500">Deliveries Selected</span>
                  <span className="font-bold">{selectedDays.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Frequency</span>
                  <span className="font-bold capitalize">{frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Price (Per Meal)</span>
                  <span className="font-bold">$14.50</span>
                </div>
                {frequency !== 'one-time' && (
                  <div className="flex justify-between text-orange-500">
                    <span>Subscription Discount</span>
                    <span className="font-bold">-15%</span>
                  </div>
                )}
              </div>
              
              <div className="border-t border-slate-100 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Total Estimated</span>
                  <span className="text-3xl font-black text-forest">
                    ${(selectedDays.length * 14.50 * (frequency === 'one-time' ? 1 : 0.85)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#D35400] text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition shadow-xl mb-4">
                Proceed to Payment
              </button>
              <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                Secure 256-bit Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
