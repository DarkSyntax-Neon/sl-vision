import { WHATSAPP_LINK, PRODUCT_PRICE } from "../data";
import { MessageCircle, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function CTASection() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      
      {/* Decorative gradient glowing spots */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-gradient-to-br from-blue-900/60 to-slate-900 border border-blue-500/15 rounded-[40px] p-8 md:p-16 text-center shadow-2xl">
          
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Warning indicator */}
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 tracking-wider uppercase font-mono mb-6 border border-blue-500/15"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
              Offre limitée à 50 000 FCFA au lieu de 85 000 FCFA
            </motion.div>

            {/* Headline */}
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight leading-tight">
              Protégez ce qui compte le plus dès aujourd'hui.
            </h2>

            {/* Subheadline */}
            <p className="mt-6 text-base md:text-lg text-slate-300 font-sans leading-relaxed">
              Ne laissez pas votre maison, votre famille ou votre commerce sans surveillance. Profitez de l'autonomie solaire absolue et d'un contrôle complet depuis votre smartphone, même pendant le délestage.
            </p>

            {/* Price display inside banner */}
            <div className="mt-8 mb-10 flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">Tarif unique promotionnel</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl md:text-5xl font-extrabold font-display text-white">{PRODUCT_PRICE}</span>
                <span className="text-lg text-slate-500 line-through">85 000 FCFA</span>
              </div>
              <p className="text-xs text-emerald-400 font-sans mt-2 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Livraison gratuite rapide + Paiement après test en mains propres
              </p>
            </div>

            {/* Large Order Action Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <a
                href="#order-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-5 px-10 rounded-2xl shadow-xl hover:shadow-emerald-500/20 transition cursor-pointer"
              >
                <MessageCircle className="w-6 h-6 fill-white" />
                Commander Maintenant (Paiement à la livraison)
              </a>
            </motion.div>

            {/* Trust assurances block */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-slate-400 font-sans border-t border-slate-800/80 pt-6 w-full">
              <div>🛡 Garantie de fonctionnement</div>
              <div>🤝 Payez à la livraison après installation de démo</div>
              <div>⚡️ Prêt à expédier sous 24h</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
