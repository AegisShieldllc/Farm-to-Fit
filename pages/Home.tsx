
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1920"
            alt="Macro balanced meal"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Farm-Sourced, <br />
              <span className="text-orange-500 italic">Macro-Minded</span> Meals.
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-slate-200 leading-relaxed">
              Chef-crafted performance nutrition delivered straight to your door in Colorado Springs. 
              Fresh ingredients from local farms, fueled for your peak performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={AppRoute.MENU}
                className="bg-[#D35400] text-center px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-xl"
              >
                View This Week's Menu
              </Link>
              <Link
                to={AppRoute.PHILOSOPHY}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-center px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all shadow-xl"
              >
                Learn Our Philosophy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-8">Trusted By Colorado's Best</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="text-xl font-black italic">MOUNTAIN GYM</span>
            <span className="text-xl font-black italic">PEAK FITNESS</span>
            <span className="text-xl font-black italic">COS RUNNERS</span>
            <span className="text-xl font-black italic">FLORISSANT FARMS</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="w-16 h-16 forest-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Chef-Crafted Weekly</h3>
              <p className="text-slate-600">Rotating menus designed by nutritionists to keep your body fueled and your taste buds inspired.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D35400] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg -rotate-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Always Local</h3>
              <p className="text-slate-600">Sourcing directly from Pikes Peak region farms. Better for you, better for our Colorado community.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 forest-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Precision Macros</h3>
              <p className="text-slate-600">Every meal labeled with exact protein, carb, and fat counts. Tracking your nutrition has never been easier.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Teaser */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800"
                alt="Meal prep"
                className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6 text-forest">Grown in Colorado. <br />Made for Champions.</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We believe that performance starts with high-quality fuel. That's why we partner with farmers in the El Paso and Teller County areas to bring the freshest ingredients to your kitchen. No frozen fillers, no artificial preservatives. Just clean, calorie-balanced fuel.
              </p>
              <Link to={AppRoute.PHILOSOPHY} className="text-orange-500 font-bold hover:underline flex items-center gap-2">
                Explore our sourcing network 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
