import { TECH_SPECS } from "../data";
import { 
  Sun, BatteryCharging, Tv, Eye, Move3d, Wifi, Mic, HardDrive, CloudRain, Smartphone 
} from "lucide-react";
import { motion } from "motion/react";

function getSpecIcon(iconName: string) {
  const props = { className: "w-5 h-5 text-blue-600 stroke-[2]" };
  switch (iconName) {
    case "Sun":
      return <Sun {...props} />;
    case "BatteryCharging":
      return <BatteryCharging {...props} />;
    case "Tv":
      return <Tv {...props} />;
    case "Eye":
      return <Eye {...props} />;
    case "Move3d":
      return <Move3d {...props} />;
    case "Wifi":
      return <Wifi {...props} />;
    case "Mic":
      return <Mic {...props} />;
    case "HardDrive":
      return <HardDrive {...props} />;
    case "CloudRain":
      return <CloudRain {...props} />;
    case "Smartphone":
      return <Smartphone {...props} />;
    default:
      return <Sun {...props} />;
  }
}

export default function TechnicalSpecs() {
  return (
    <section id="specs" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 tracking-wider uppercase font-mono mb-4">
            🛠 Caractéristiques techniques
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Fiche technique et spécifications
          </h2>
          <p className="mt-4 text-base text-slate-600 font-sans">
            Des performances matérielles de niveau professionnel conçues pour durer et sécuriser vos espaces les plus sensibles.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TECH_SPECS.map((spec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300 text-left flex flex-col justify-between"
            >
              <div>
                {/* Category & Icon Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {spec.category}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    {getSpecIcon(spec.iconName)}
                  </div>
                </div>

                {/* Spec Title */}
                <h3 className="text-sm font-bold font-display text-slate-900 leading-tight">
                  {spec.title}
                </h3>
              </div>

              {/* Spec Value */}
              <p className="mt-3 text-xs text-slate-500 font-sans leading-relaxed pt-2 border-t border-slate-50">
                {spec.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technical standards trust block */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Certifié CE
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Norme IP66 Waterproof
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Résolution Super HD 2K
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Chiffrement de sécurité AES-128 bits
          </div>
        </div>

      </div>
    </section>
  );
}
