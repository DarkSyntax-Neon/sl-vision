import { IMAGES, WHATSAPP_LINK } from "../data";
import { ShieldCheck, Sparkles, MessageCircle, Heart } from "lucide-react";
import { motion } from "motion/react";

export default function Lifestyle() {
  return (
    <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.night} 
          alt="Sécurité résidentielle la nuit" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 filter brightness-50"
        />
        {/* Dark overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Emotion content (Lg: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Emotional Badge */}
            <div className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 tracking-wider uppercase font-mono mb-6 border border-emerald-500/20">
              <Heart className="w-3.5 h-3.5 fill-emerald-500/10" />
              La sérénité d'esprit garantie
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight leading-tight">
              La tranquillité d'esprit où que vous soyez.
            </h2>

            {/* Emotional copy addressing pain points */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-xl">
              Que vous soyez en voyage d'affaires à Cotonou, en déplacement à l'étranger ou simplement endormi paisiblement dans votre chambre, SL VISION veille sur tout ce qui compte pour vous.
            </p>
            
            <p className="mt-4 text-sm sm:text-base text-slate-400 font-sans leading-relaxed max-w-xl">
              Plus besoin de stresser lors des pannes d'électricité de la SBEE. Sentez-vous en sécurité, confiant et serein, sachant que vos proches, vos marchandises et vos chantiers sont protégés par une technologie infatigable.
            </p>

            {/* Core emotional values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 w-full">
              
              {/* Value 1: Sécurité absolue */}
              <div className="bg-slate-800/40 border border-slate-700/30 backdrop-blur-md rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base font-display">Sécurité Absolue</h4>
                <p className="text-xs text-slate-400 mt-1">Surveillance 24h/24 et alertes anti-intrusion instantanées.</p>
              </div>

              {/* Value 2: Confiance Totale */}
              <div className="bg-slate-800/40 border border-slate-700/30 backdrop-blur-md rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base font-display">Confiance Totale</h4>
                <p className="text-xs text-slate-400 mt-1">Savoir que votre matériel filme sans dépendre d'un réseau filaire.</p>
              </div>

              {/* Value 3: Paix d'esprit */}
              <div className="bg-slate-800/40 border border-slate-700/30 backdrop-blur-md rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base font-display">Sérénité d'esprit</h4>
                <p className="text-xs text-slate-400 mt-1">Regardez votre maison sur votre écran, rassuré à chaque instant.</p>
              </div>

            </div>

            {/* Action with WhatsApp CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 px-7 rounded-2xl shadow-lg transition duration-300 hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Sécuriser mon bien via WhatsApp
              </a>
              <div className="text-xs text-slate-400 font-sans">
                ★ Plus de 100 foyers et commerces déjà sécurisés au Bénin.
              </div>
            </div>

          </div>

          {/* Right Column: Clean abstract visual or subtle highlight (Lg: 5 cols) */}
          <div className="lg:col-span-5 hidden lg:flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-1 bg-gradient-to-tr from-slate-800 to-slate-700 rounded-[36px] shadow-2xl border border-slate-700/50"
            >
              <div className="bg-slate-900 p-8 rounded-[32px] text-center max-w-xs">
                <span className="text-sm font-mono uppercase tracking-widest text-emerald-400 font-semibold">TÉMOIGNAGE DU JOUR</span>
                <p className="text-slate-300 text-sm italic font-sans mt-4 leading-relaxed">
                  "J'ai voyagé à Cotonou pendant 2 semaines pour affaires, tout en gardant un œil sur mes ouvriers à Parakou. Pouvoir parler à travers la caméra et les voir travailler m'a donné une paix d'esprit inestimable !"
                </p>
                <div className="border-t border-slate-800 pt-4 mt-6">
                  <h5 className="font-bold text-sm text-white">M. Koffi S.</h5>
                  <p className="text-[10px] text-slate-500 font-sans">Propriétaire d'entrepôt, Parakou</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
