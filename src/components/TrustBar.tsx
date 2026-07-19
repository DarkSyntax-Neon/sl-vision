import React from "react";
import { Star, Truck, ShieldCheck, MessageCircle, Sparkles, Zap, BatteryCharging } from "lucide-react";

export default function TrustBar() {
  const items = [
    {
      icon: <Truck className="w-4 h-4 text-emerald-400 shrink-0" />,
      text: "Livraison gratuite partout au Bénin",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />,
      text: "Paiement à la livraison - Testez avant de payer !",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />,
      text: "Caméra Solaire Autonome (Garantie de qualité)",
    },
    {
      icon: <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 fill-emerald-500/10" />,
      text: "Support WhatsApp 24h/7 : +229 61 26 15 07",
    },
    {
      icon: <Zap className="w-4 h-4 text-amber-400 shrink-0" />,
      text: "Expédition ultra-rapide en 24h à 48h",
    },
    {
      icon: <BatteryCharging className="w-4 h-4 text-blue-400 shrink-0" />,
      text: "Zéro coût d'électricité (Énergie 100% Solaire)",
    },
  ];

  // Duplicate items for infinite loop effect
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="bg-slate-900 text-white border-y border-slate-800 overflow-hidden py-3.5 relative z-20 select-none">
      <div className="flex w-full overflow-hidden relative">
        <div className="animate-marquee flex gap-10 items-center whitespace-nowrap">
          {marqueeItems.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 px-4 py-1 bg-slate-800/60 rounded-full border border-slate-700/50 text-xs font-semibold tracking-wide"
            >
              {item.icon}
              <span className="text-slate-100 font-sans">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
