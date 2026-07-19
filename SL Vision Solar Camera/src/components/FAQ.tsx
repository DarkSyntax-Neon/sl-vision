import { useState } from "react";
import { FAQ_DATA, WHATSAPP_LINK } from "../data";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1"); // First accordion open by default for CRO engagement

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 tracking-wider uppercase font-mono mb-4">
            💬 FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Questions Fréquentes
          </h2>
          <p className="mt-4 text-base text-slate-600 font-sans">
            Nous répondons à toutes vos questions pour vous aider à commander votre caméra solaire en toute confiance.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="flex flex-col gap-4">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between text-left p-6 md:p-7 hover:bg-slate-50/50 transition cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex gap-4 items-start">
                    <HelpCircle className="w-5.5 h-5.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="font-bold text-slate-900 font-display text-base md:text-md">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Chevron indicator */}
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`} 
                  />
                </button>

                {/* Accordion Content with smooth height transition */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:px-7 md:pb-7 pt-0 border-t border-slate-100 text-sm md:text-base text-slate-600 font-sans leading-relaxed pl-[42px] md:pl-[46px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Unresolved question block inside FAQ */}
        <div className="mt-12 text-center bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h3 className="font-bold font-display text-slate-900 text-lg">Vous avez une autre question ?</h3>
          <p className="text-sm text-slate-500 mt-2 font-sans">
            Notre service client au Bénin est disponible pour vous répondre instantanément sur WhatsApp.
          </p>
          
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 hover:-translate-y-0.5 cursor-pointer text-sm"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            Poser ma question sur WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
