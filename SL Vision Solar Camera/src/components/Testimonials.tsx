import { useState, useEffect } from "react";
import { TESTIMONIALS_DATA, WHATSAPP_LINK } from "../data";
import { ChevronLeft, ChevronRight, Star, Quote, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // Auto-play slider every 8 seconds for visual dynamic
  useEffect(() => {
    const interval = setInterval(handleNext, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 tracking-wider uppercase font-mono mb-4">
            ⭐️ Avis Clients
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Ce que disent nos clients satisfaits
          </h2>
          <p className="mt-4 text-base text-slate-600 font-sans">
            Découvrez les retours d'expérience de propriétaires de maisons, de boutiques et de chantiers au Bénin ayant fait confiance à SL VISION.
          </p>
        </div>

        {/* Testimonials Slider Area */}
        <div className="relative bg-slate-50 border border-slate-100 rounded-[32px] p-8 md:p-14 shadow-sm min-h-[380px] md:min-h-[320px] flex flex-col justify-between">
          
          {/* Quote icon overlay background */}
          <div className="absolute top-8 right-12 text-slate-200/50 pointer-events-none select-none">
            <Quote className="w-24 h-24 stroke-[1]" />
          </div>

          <div className="relative z-10">
            {/* Active Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-start"
              >
                {/* Stars */}
                <div className="flex items-center text-amber-400 gap-1 mb-5">
                  {[...Array(TESTIMONIALS_DATA[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-base md:text-lg text-slate-700 italic font-sans leading-relaxed text-left">
                  "{TESTIMONIALS_DATA[activeIndex].text}"
                </blockquote>

                {/* Customer Details */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200/60 w-full text-left">
                  
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg font-display select-none">
                    {TESTIMONIALS_DATA[activeIndex].name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 font-display text-base">
                      {TESTIMONIALS_DATA[activeIndex].name}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans">
                      {TESTIMONIALS_DATA[activeIndex].role} — <span className="font-medium text-slate-700">{TESTIMONIALS_DATA[activeIndex].location}</span>
                    </p>
                  </div>

                  <span className="ml-auto text-[11px] text-slate-400 font-mono font-bold uppercase">
                    {TESTIMONIALS_DATA[activeIndex].date}
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls & Dots bar */}
          <div className="flex items-center justify-between mt-10 pt-4 relative z-10 border-t border-slate-100">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex 
                      ? "bg-blue-600 w-6" 
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Aller au témoignage ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow Navs */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 transition cursor-pointer"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 transition cursor-pointer"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Local trust statement label */}
        <p className="text-center text-[10px] text-slate-400 font-mono mt-4 uppercase tracking-widest">
          📌 Avis de clients réels collectés sur notre canal d'assistance WhatsApp Bénin.
        </p>

      </div>
    </section>
  );
}
