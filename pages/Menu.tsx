
import React, { useState, useEffect } from 'react';
import { MOCK_MEALS } from '../constants';
import { Meal, AppRoute } from '../types';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 22, m: 45, s: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header & Timer */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-forest mb-4">This Week's Menu</h1>
            <p className="text-slate-500 max-w-xl text-lg">
              Freshly prepared meals inspired by local Colorado ingredients. 
              Orders for this window close soon!
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col items-center md:items-end">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">Rotating Weekly Countdown</span>
            <div className="flex gap-4">
              {[
                { val: timeLeft.h, label: 'Hours' },
                { val: timeLeft.m, label: 'Mins' },
                { val: timeLeft.s, label: 'Secs' }
              ].map((unit, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="forest-green text-white w-14 h-14 rounded-lg flex items-center justify-center text-xl font-black shadow-inner">
                    {String(unit.val).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] uppercase font-bold mt-1 text-slate-400">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters (Mock) */}
        <div className="flex flex-wrap gap-4 mb-10">
          {['All', 'High Protein', 'Gluten-Free', 'Vegan', 'Keto-Friendly'].map(filter => (
            <button
              key={filter}
              className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${
                filter === 'All' 
                ? 'bg-forest-green text-white border-transparent shadow-md' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-orange-500 hover:text-orange-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Meal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_MEALS.map((meal) => (
            <div key={meal.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {meal.tags.map(tag => (
                    <span key={tag} className="bg-white/90 backdrop-blur-sm text-forest text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-forest">{meal.name}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{meal.description}</p>
                
                {/* Macro Bar */}
                <div className="flex justify-between items-center mb-8 border-y border-slate-50 py-4">
                  <div className="text-center">
                    <span className="block text-xl font-black text-forest">{meal.protein}g</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Protein</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-black text-forest">{meal.carbs}g</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Carbs</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-black text-forest">{meal.fats}g</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Fats</span>
                  </div>
                  <div className="text-center border-l border-slate-200 pl-4">
                    <span className="block text-xl font-black text-orange-500">{meal.calories}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Cals</span>
                  </div>
                </div>

                <Link
                  to={AppRoute.CHECKOUT}
                  className="block text-center w-full forest-green text-white py-4 rounded-2xl font-bold hover:bg-green-800 transition-colors shadow-lg shadow-green-900/10"
                >
                  Add to My Plan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
