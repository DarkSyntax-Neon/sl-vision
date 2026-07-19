import { HOW_IT_WORKS, WHATSAPP_LINK } from "../data";
import { Hammer, Wifi, Download, ShieldCheck, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

function getStepIcon(iconName: string) {
  const props = { className: "w-5 h-5 text-white" };
  switch (iconName) {
    case "Hammer":
      return <Hammer {...props} />;
    case "Wifi":
      return <Wifi {...props} />;
    case "Download":
      return <Download {...props} />;
    case "ShieldCheck":
      return <ShieldCheck {...props} />;
    default:
      return <Hammer {...props} />;
  }
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 tracking-wider uppercase font-mono mb-4">
            🚀 Simple & Rapide
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Comment fonctionne l'installation ?
          </h2>
          <p className="mt-4 text-base text-slate-600 font-sans">
            Pas besoin d'être un as du bricolage ou un électricien agréé. Suivez ces 4 étapes simples pour sécuriser votre propriété en moins de 10 minutes.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-0.5 bg-slate-100 -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {HOW_IT_WORKS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left relative group"
              >
                {/* Step Circle & Connector Line */}
                <div className="flex items-center justify-center mb-6">
                  {/* Outer circle with glow on hover */}
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300 relative">
                    {/* Number Badge */}
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-white text-[10px] font-bold text-white flex items-center justify-center font-mono">
                      {item.step}
                    </span>
                    {getStepIcon(item.iconName)}
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-500 font-sans leading-relaxed">
                  {item.description}
                </p>

              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to remove friction */}
        <div className="mt-16 bg-blue-50/50 rounded-2xl p-6 border border-blue-100 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-slate-900 font-display text-sm">Des questions lors du montage ?</h4>
            <p className="text-xs text-slate-500 mt-1">Notre support technique vous accompagne gratuitement par appel vidéo WhatsApp.</p>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-xl transition duration-300 text-xs shadow-sm shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            Aide à l'installation
          </a>
        </div>

      </div>
    </section>
  );
}
