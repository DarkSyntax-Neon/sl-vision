import React, { useState } from "react";
import { IMAGES, WHATSAPP_LINK } from "../data";
import { ZoomIn, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "real-unpacking",
    url: IMAGES.realProduct,
    title: "Nos Caméras Réelles & Emballage",
    description: "Rendu réel du modèle SL VISION Double Objectif sur sa boîte d'origine. Double objectif HD, double antenne Wi-Fi et boîtier robuste."
  },
  {
    id: "solar",
    url: IMAGES.hero,
    title: "SL VISION en Plein Jour",
    description: "Autonomie solaire et intégration parfaite sur façade."
  },
  {
    id: "night",
    url: IMAGES.night,
    title: "Vision Nocturne Active",
    description: "Projecteurs LED allumés pour une vision en couleur la nuit."
  },
  {
    id: "app",
    url: IMAGES.app,
    title: "Interface Mobile HD",
    description: "Visualisation fluide et contrôle rotatif sur smartphone."
  },
  {
    id: "waterproof",
    url: IMAGES.waterproof,
    title: "Résistance Extrême IP66",
    description: "Protection totale contre les pluies tropicales et la poussière."
  }
];

export default function ImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    setIsZoomed(false);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    setIsZoomed(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 tracking-wider uppercase font-mono mb-4">
            📸 Galerie de photos réelles
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            La caméra sous tous ses angles
          </h2>
          <p className="mt-4 text-base text-slate-600 font-sans">
            Aucun modèle 3D ou fausse maquette. Visualisez notre produit à travers des photos réelles démontrant ses capacités dans toutes les conditions.
          </p>
        </div>

        {/* Gallery Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Main Preview with zoom/swipe (Lg: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div 
              className="relative aspect-4/3 rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-100 group select-none touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              
              {/* Zoom overlay indicator */}
              <div className="absolute top-4 right-4 z-10 bg-slate-900/85 backdrop-blur-md p-2 rounded-full text-white cursor-pointer transition shadow-md hover:bg-slate-900">
                <ZoomIn className="w-5 h-5" onClick={() => setIsZoomed(!isZoomed)} />
              </div>

              {/* Main Image with Zoom effect */}
              <div 
                className="w-full h-full cursor-zoom-in overflow-hidden"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={GALLERY_IMAGES[activeIndex].url}
                    alt={GALLERY_IMAGES[activeIndex].title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover origin-center transition-transform duration-500 ${
                      isZoomed ? "scale-150 cursor-zoom-out" : "scale-100"
                    }`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>

              {/* Navigation arrows (desktop) */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-2.5 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100 focus:opacity-100 pointer-events-auto z-10 hover:scale-105"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-2.5 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100 focus:opacity-100 pointer-events-auto z-10 hover:scale-105"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Swipe Tip for Mobile */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md py-1 px-3 rounded-full text-white text-[10px] uppercase tracking-wider font-mono lg:hidden pointer-events-none">
                ← Glissez pour changer →
              </div>
            </div>

            {/* Thumbnail Slider */}
            <div className="flex gap-3 overflow-x-auto py-2 scrollbar-none snap-x">
              {GALLERY_IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative flex-shrink-0 w-24 aspect-4/3 rounded-xl overflow-hidden border-2 transition snap-center ${
                    idx === activeIndex 
                      ? "border-blue-600 ring-2 ring-blue-100 opacity-100" 
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img 
                    src={img.url} 
                    alt={`Miniature ${img.title}`} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Descriptions & CRO Box (Lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div>
              <div className="font-mono text-xs font-semibold text-blue-600 mb-2 uppercase tracking-widest">
                Image {activeIndex + 1} sur {GALLERY_IMAGES.length}
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900 mb-4">
                {GALLERY_IMAGES[activeIndex].title}
              </h3>
              <p className="text-slate-600 font-sans text-sm leading-relaxed mb-6">
                {GALLERY_IMAGES[activeIndex].description}
              </p>

              {/* Checklist details to boost trust */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span>Rendu visuel exact du modèle livré à votre adresse.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span>Boîtier robuste en ABS avec filtre UV longue durée.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span>Support d'attache mural pivotant multi-positions inclus.</span>
                </li>
              </ul>
            </div>

            {/* Quick action block inside gallery for CRO */}
            <div className="border-t border-slate-200/80 pt-6 mt-4">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-extrabold text-slate-900 font-display">50 000 FCFA</span>
                <span className="text-sm text-slate-500 line-through">85 000 FCFA</span>
                <span className="ml-auto bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Économie 41%
                </span>
              </div>
              
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3.5 px-6 rounded-2xl shadow-md transition hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Commander cette caméra sur WhatsApp
              </a>
              <p className="text-center text-[11px] text-slate-500 mt-3 font-sans">
                🚚 Livraison rapide gratuite et démo à la livraison partout au Bénin.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
