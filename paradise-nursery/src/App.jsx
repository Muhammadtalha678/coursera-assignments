import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';
import { ArrowRight, Sprout, Leaf } from 'lucide-react';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleNavigateHome = () => {
    setShowProductList(false);
  };

  return (
    <div className="min-h-screen">
      {!showProductList ? (
        <div id="landing-page" className="landing-page">
          <div className="landing-content">
            {/* Left Column: Hero & Call to Action */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5" />
                Premier Online Plant Nursery
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-none mb-3">
                  Paradise Nursery
                </h1>
                <p className="text-emerald-300 text-lg sm:text-xl font-serif italic">
                  Where Green Meets Serenity
                </p>
              </div>

              <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                Step into our living oasis. We handpick and nurture the finest indoor houseplants to purify your air, stimulate your senses with natural aromas, and bring enduring tranquility to your home.
              </p>

              <div>
                <button
                  id="get-started-btn"
                  onClick={handleGetStartedClick}
                  className="get-started-btn"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs text-stone-300 border-t border-white/15">
                <div className="flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  <span>18+ Botanical Varieties</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>100% Healthy Plant Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Column: About Us Details */}
            <div className="border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-8">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <ProductList onNavigateHome={handleNavigateHome} />
      )}
    </div>
  );
}

export default App;
