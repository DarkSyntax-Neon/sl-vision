import { AUDIENCES_DATA, WHATSAPP_LINK } from "../data";
import { 
  Home, Store, Briefcase, Car, HardHat, Wheat, MessageCircle, LucideProps 
} from "lucide-react";
import { motion } from "motion/react";

function getAudienceIcon(iconName: string) {
  const props = { className: "w-6 h-6 transition-transform group-hover:scale-110 duration-300" };
  switch (iconName) {
    case "Home":
      return <Home {...props} className={`${props.className} text-blue-600`} />;
    case "Store":
      return <Store {...props} className={`${props.className} text-emerald-600`} />;
    case "Briefcase":
      return <Briefcase {...props} className={`${props.className} text-indigo-600`} />;
    case "Car":
      return <Car {...props} className={`${props.className} text-amber-600`} />;
    case "HardHat":
      return <HardHat {...props} className={`${props.className} text-orange-600`} />;
    case "Wheat":
      return <Wheat {...props} className={`${props.className} text-lime-600`} />;
    default:
      return <Home {...props} className={`${props.className} text-blue-600`} />;
  }
}

export default function WhoIsItFor() {
  return (
    <section id="who-is-it-for" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 tracking-wider uppercase font-mono mb-4">
            🎯 Pour tous les besoins
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Une protection sur-mesure pour chaque situation
          </h2>
          <p className="mt-4 text-base text-slate-600 font-sans">
            Que vous soyez un particulier souhaitant protéger sa famille ou un professionnel veillant sur ses actifs, la caméra SL VISION s'adapte à vos contraintes de terrain.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AUDIENCES_DATA.map((audience, idx) => (
            <motion.div
              key={audience.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`rounded-3xl p-8 border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start text-left group`}
            >
              {/* Icon Circle */}
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-slate-900/5 transition">
                {getAudienceIcon(audience.iconName)}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold font-display text-slate-900">
                {audience.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 font-sans leading-relaxed flex-grow">
                {audience.subtitle}
              </p>

              {/* Action arrow trigger inside card */}
              <div className="mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition">
                <span>Sécuriser cet espace</span>
                <span className="transform translate-x-0 group-hover:translate-x-1.5 transition">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic CTA box at footer of section to trigger conversion */}
        <div className="mt-16 bg-slate-900 text-white rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-emerald-500/10 pointer-events-none" />
          
          <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-bold font-display">Besoin de conseils personnalisés ?</h3>
            <p className="mt-3 text-sm text-slate-300 font-sans">
              Notre équipe d'experts est disponible gratuitement pour vous aider à choisir le bon nombre de caméras selon la taille de votre site.
            </p>
            
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 hover:-translate-y-0.5 cursor-pointer text-sm shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Parler à un conseiller WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
