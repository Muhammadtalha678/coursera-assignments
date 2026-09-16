import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

const AboutUs = () => {
  return (
    <div id="about-us" className="aboutus-container text-left space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium tracking-wide uppercase">
        <Sparkles className="w-3.5 h-3.5" />
        Botanical Sanctuary
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif text-emerald-300 font-bold tracking-tight">
        Welcome to Paradise Nursery
      </h2>

      <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
        At <strong>Paradise Nursery</strong>, we believe that living greenery has the extraordinary power to transform any room into a tranquil, revitalizing sanctuary. Based in the heart of botanical craft, our nursery cultivates vibrant indoor houseplants designed to purify your atmosphere, soothe the senses, and reconnect your daily life with nature.
      </p>

      <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
        Every single plant is ethically sourced, hand-nurtured by expert horticulturists, and carefully inspected before dispatch. Whether you are seeking air-purifying foliage to naturally cleanse indoor toxins, calming aromatic herbs for peaceful relaxation, or hardy, drought-tolerant succulents that thrive on neglect, our curated collections cater to seasoned collectors and novice plant parents alike.
      </p>

      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-200 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/10">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Hand-inspected, healthy roots guarantee</span>
        </div>
        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/10">
          <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Lifetime horticultural support & care tips</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
