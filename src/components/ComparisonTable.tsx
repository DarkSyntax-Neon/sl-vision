import { COMPARISON_DATA, BRAND_NAME, WHATSAPP_LINK } from "../data";
import { Check, X, ShieldAlert, ShieldCheck, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export default function ComparisonTable() {
  return (
    <section id="comparison" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 tracking-wider uppercase font-mono mb-4">
            📊 Comparatif Direct
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Pourquoi choisir la caméra SL VISION ?
          </h2>
          <p className="mt-4 text-base text-slate-600 font-sans">
            Ne vous laissez plus piéger par les systèmes obsolètes. Découvrez la différence entre une caméra classique dépendante du réseau et notre solution solaire autonome.
          </p>
        </div>

        {/* Comparison Table Box */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200/80 shadow-lg bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-5 px-6 font-display font-bold text-sm tracking-wide uppercase">Caractéristiques</th>
                  <th className="py-5 px-6 font-display font-bold text-sm tracking-wide uppercase bg-slate-800 text-slate-300">Caméra Classique</th>
                  <th className="py-5 px-6 font-display font-bold text-sm tracking-wide uppercase text-blue-400">SL VISION Solar Cam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    
                    {/* Feature label */}
                    <td className="py-4.5 px-6 font-semibold text-slate-800 text-sm">
                      {row.feature}
                    </td>

                    {/* Traditional camera column */}
                    <td className="py-4.5 px-6 text-slate-500 text-xs md:text-sm bg-slate-50/50">
                      <div className="flex items-center gap-2 text-rose-600">
                        <X className="w-4.5 h-4.5 shrink-0 stroke-[2.5]" />
                        <span>{row.traditional.replace("❌", "")}</span>
                      </div>
                    </td>

                    {/* SL VISION column */}
                    <td className="py-4.5 px-6 text-slate-800 text-xs md:text-sm font-medium">
                      <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                        <Check className="w-4.5 h-4.5 shrink-0 stroke-[3]" />
                        <span>{row.slVision.replace("✅", "")}</span>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Summary Banner under table */}
          <div className="bg-slate-50 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900">Le choix de la sécurité et de l'économie</p>
                <p className="text-xs text-slate-500">Zéro facture d'électricité et fonctionnement assuré 24/7.</p>
              </div>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 hover:-translate-y-0.5 cursor-pointer text-sm w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Choisir SL VISION sur WhatsApp
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
