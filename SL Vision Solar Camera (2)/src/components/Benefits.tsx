import { BENEFITS_DATA } from "../data";
import { Sun, Eye, Smartphone, BellRing, LucideProps } from "lucide-react";
import { motion } from "motion/react";

// Mapping helper for Lucide icons
function getIconComponent(iconName: string) {
  const props = { className: "w-7 h-7 text-blue-600 stroke-[2]" };
  switch (iconName) {
    case "Sun":
      return <Sun {...props} />;
    case "Eye":
      return <Eye {...props} />;
    case "Smartphone":
      return <Smartphone {...props} />;
    case "BellRing":
      return <BellRing {...props} />;
    default:
      return <Sun {...props} />;
  }
}

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 py-1 px-3 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 tracking-wider uppercase font-mono mb-4">
            ⚡ Sécurité Ininterrompue
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Pourquoi choisir la caméra solaire SL VISION ?
          </h2>
          <p className="mt-4 text-base text-slate-600 font-sans">
            Une combinaison technologique conçue pour faire face aux réalités locales : autonomie énergétique totale, sécurité de pointe et simplicité d'utilisation.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS_DATA.map((benefit, idx) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-slate-100/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col items-start text-left relative overflow-hidden group"
            >
              {/* Card top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition" />

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                <div className="group-hover:scale-110 transition duration-300">
                  {getIconComponent(benefit.iconName)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-blue-600 transition">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-slate-500 font-sans leading-relaxed flex-grow">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
