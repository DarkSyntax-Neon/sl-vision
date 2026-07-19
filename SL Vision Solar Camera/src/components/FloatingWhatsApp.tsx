import { WHATSAPP_LINK } from "../data";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative group"
      >
        {/* Glow effect ring */}
        <div className="absolute inset-0 bg-emerald-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-300" />
        
        {/* Main Floating Button */}
        <a
          href="#order-form"
          className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition hover:-translate-y-0.5 cursor-pointer"
          aria-label="Commander sur le formulaire"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
          
          {/* Unread dot notification */}
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
        </a>

        {/* Floating Tooltip Label (Desktop only) */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap pointer-events-none hidden sm:block border border-slate-800">
          Commander sur WhatsApp (50 000 FCFA)
        </div>
      </motion.div>
    </div>
  );
}
