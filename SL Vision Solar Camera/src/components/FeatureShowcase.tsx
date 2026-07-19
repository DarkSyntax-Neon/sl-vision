import { FEATURES_DATA, WHATSAPP_LINK } from "../data";
import { Check, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export default function FeatureShowcase() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 tracking-wider uppercase font-mono mb-4">
            🔍 Fonctionnalités en détail
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Une technologie de pointe pour votre sécurité
          </h2>
          <p className="mt-4 text-base text-slate-600 font-sans">
            Chaque fonctionnalité a été sélectionnée et testée pour garantir une fiabilité irréprochable face aux réalités environnementales et de sécurité au Bénin.
          </p>
        </div>

        {/* Features List */}
        <div className="flex flex-col gap-24 md:gap-32">
          {FEATURES_DATA.map((feature, idx) => {
            const isReversed = feature.isReversed;
            return (
              <div 
                key={feature.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                
                {/* Image Column (Lg: 6 cols) */}
                <div className={`lg:col-span-6 ${isReversed ? "lg:order-last" : ""}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-lg border border-slate-100 group"
                  >
                    <img 
                      src={feature.imagePath} 
                      alt={feature.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                {/* Text & Specs Column (Lg: 6 cols) */}
                <div className="lg:col-span-6 flex flex-col items-start text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {/* Feature badge count */}
                    <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 py-1 px-3 rounded-full">
                      Module 0{idx + 1}
                    </span>

                    {/* Feature Title */}
                    <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900 mt-4 tracking-tight leading-tight">
                      {feature.title}
                    </h3>

                    {/* Benefit Paragraph (CRO Emphasized) */}
                    <p className="text-slate-600 font-sans text-base leading-relaxed mt-4">
                      {feature.benefit}
                    </p>

                    {/* Technical bullet specs */}
                    <div className="mt-6 space-y-3.5">
                      {feature.specs.map((spec, specIdx) => (
                        <div key={specIdx} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                          <span className="text-slate-700 text-sm font-sans font-medium">{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA section under each card to boost CRO */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm bg-slate-900 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition duration-300 shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        Acheter ce modèle
                      </a>
                      <span className="text-xs text-slate-400 font-mono font-bold uppercase">
                        50 000 FCFA à la livraison
                      </span>
                    </div>

                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
