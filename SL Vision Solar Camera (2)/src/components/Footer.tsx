import React from "react";
import { WHATSAPP_LINK, WHATSAPP_NUMBER, PRODUCT_PRICE, BRAND_NAME } from "../data";
import { ShieldCheck, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Footer({ onAdminClick }: { onAdminClick?: () => void }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-slate-900 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold font-display text-white tracking-tight">{BRAND_NAME}</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Votre sécurité, alimentée par le soleil. Nous importons et distribuons des équipements de surveillance solaire premium partout au Bénin.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-[10px] text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              SÉCURITÉ CERTIFIÉE
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => handleLinkClick(e, "features")}
                  className="hover:text-white transition"
                >
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  onClick={(e) => handleLinkClick(e, "gallery")}
                  className="hover:text-white transition"
                >
                  Galerie Photos
                </a>
              </li>
              <li>
                <a 
                  href="#specs" 
                  onClick={(e) => handleLinkClick(e, "specs")}
                  className="hover:text-white transition"
                >
                  Fiche Technique
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => handleLinkClick(e, "faq")}
                  className="hover:text-white transition"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Logistics & Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">Informations</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>🚚 Livraison partout au Bénin</li>
              <li>Paiement après vérification</li>
              <li>Garantie de satisfaction</li>
              <li>Support technique inclus</li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">Contact & Support</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href={`tel:+229${WHATSAPP_NUMBER}`} className="hover:text-white transition">+229 {WHATSAPP_NUMBER}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Cotonou, Bénin</span>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold py-1.5 px-3 rounded-lg transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-400/10" />
                  Assistance WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and legal mentions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 text-[11px] text-slate-600 font-mono text-center md:text-left">
          <div>
            © {currentYear} {BRAND_NAME}. Tous droits réservés.
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 items-center">
            <a href="#" className="hover:text-slate-400 transition">Politique de confidentialité</a>
            <a href="#" className="hover:text-slate-400 transition">Conditions générales</a>
            {onAdminClick && (
              <button 
                onClick={onAdminClick}
                className="hover:text-blue-400 text-slate-500 font-bold transition cursor-pointer text-[11px] flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-md border border-slate-800"
              >
                🔐 Espace Admin
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
