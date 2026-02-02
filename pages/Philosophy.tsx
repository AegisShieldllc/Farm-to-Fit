
import React from 'react';

const Philosophy: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920"
            alt="Colorado Farm"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 px-4">
          <span className="text-orange-500 uppercase font-black tracking-widest text-sm mb-4 block">Our Commitment</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white max-w-4xl mx-auto">Farm-To-Fitness Sourcing</h1>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="prose prose-lg prose-slate mx-auto">
          <h2 className="text-4xl font-bold text-forest mb-8">Why "Farm-to-Fit"?</h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            In Colorado Springs, we're surrounded by some of the richest agricultural lands in the country. Yet, most food delivery services rely on industrial supply chains that ship ingredients across thousands of miles. 
          </p>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            We do things differently. By sourcing within a 100-mile radius, we ensure that the nutrients in your food are preserved, the flavor is peaked, and your local economy is supported.
          </p>

          <div className="grid md:grid-cols-2 gap-12 my-20">
            <div className="bg-slate-50 p-10 rounded-3xl border-l-8 border-forest">
              <h3 className="text-2xl font-bold text-forest mb-4">The Science of Fresh</h3>
              <p className="text-slate-600">
                Produce loses up to 50% of its vitamins within a week of harvest. By shortening the distance between the soil and your door, we deliver higher concentrations of Vitamin C, E, and B-complex.
              </p>
            </div>
            <div className="bg-slate-50 p-10 rounded-3xl border-l-8 border-orange-500">
              <h3 className="text-2xl font-bold text-forest mb-4">Macro Precision</h3>
              <p className="text-slate-600">
                Our kitchen is led by sports nutritionists. We don't just cook for flavor; we engineer for performance. Every gram of protein is weighed, every carbohydrate choice is deliberate.
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-forest mb-8">Our Local Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center opacity-70">
            <div className="text-center p-4">
              <p className="font-bold text-lg text-forest">Black Forest Mushrooms</p>
              <p className="text-xs uppercase text-slate-400">Fungi & Microgreens</p>
            </div>
            <div className="text-center p-4">
              <p className="font-bold text-lg text-forest">Pikes Peak Produce</p>
              <p className="text-xs uppercase text-slate-400">Seasonal Veggies</p>
            </div>
            <div className="text-center p-4">
              <p className="font-bold text-lg text-forest">Fountain Valley Bison</p>
              <p className="text-xs uppercase text-slate-400">Grass-Fed Meats</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-green py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to transform your nutrition?</h2>
          <button className="bg-[#D35400] text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-orange-700 transition shadow-2xl">
            Build My Performance Plan
          </button>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;
