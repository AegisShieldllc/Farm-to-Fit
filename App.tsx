
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppRoute } from './types';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Philosophy from './pages/Philosophy';
import Checkout from './pages/Checkout';
import AIAssistant from './components/AIAssistant';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Weekly Menu', path: AppRoute.MENU },
    { label: 'Our Philosophy', path: AppRoute.PHILOSOPHY },
    { label: 'Order Now', path: AppRoute.CHECKOUT },
  ];

  return (
    <nav className="sticky top-0 z-40 forest-green text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to={AppRoute.HOME} className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight italic">FARM-TO-FIT</span>
            <span className="text-[10px] tracking-[0.2em] uppercase opacity-80">Colorado Springs</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-orange-400 ${
                  location.pathname === link.path ? 'text-orange-500 underline underline-offset-8' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={AppRoute.CHECKOUT}
              className="bg-[#D35400] px-6 py-2 rounded-full font-bold text-sm hover:bg-orange-700 transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-green-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isMenuOpen && (
        <div className="md:hidden forest-green pb-6 px-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium border-b border-green-800 pb-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-white text-lg font-bold mb-4 italic">FARM-TO-FIT</h3>
          <p className="text-sm leading-relaxed">
            Fueling Colorado Springs with locally-sourced, chef-prepared, macro-balanced meals.
            Fresh from the farm to your fitness journey.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 underline decoration-[#D35400]">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to={AppRoute.MENU} className="hover:text-white">Current Menu</Link></li>
            <li><Link to={AppRoute.PHILOSOPHY} className="hover:text-white">Our Sourcing</Link></li>
            <li><Link to={AppRoute.CHECKOUT} className="hover:text-white">Subscription Plans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 underline decoration-[#D35400]">Contact Us</h4>
          <p className="text-sm">Tejon Street, Downtown</p>
          <p className="text-sm">Colorado Springs, CO 80903</p>
          <p className="text-sm mt-2">hello@farmtofitcos.com</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 underline decoration-[#D35400]">Join the Menu Leak</h4>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-slate-800 border-none px-4 py-2 w-full text-sm rounded-l focus:ring-1 focus:ring-orange-500"
            />
            <button className="bg-[#D35400] text-white px-4 py-2 text-sm rounded-r font-bold hover:bg-orange-700 transition">
              Join
            </button>
          </div>
          <p className="text-[10px] mt-2 opacity-60">Be the first to see next week's menu.</p>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
        &copy; {new Date().getFullYear()} Farm-To-Fit Colorado. All rights reserved.
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-[#D35400] selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path={AppRoute.HOME} element={<Home />} />
            <Route path={AppRoute.MENU} element={<Menu />} />
            <Route path={AppRoute.PHILOSOPHY} element={<Philosophy />} />
            <Route path={AppRoute.CHECKOUT} element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
        <AIAssistant />
      </div>
    </Router>
  );
}

export default App;
