import React, { useState, useEffect } from "react";
import { IMAGES, WHATSAPP_NUMBER, BRAND_NAME } from "../data";
import { addOrder } from "../lib/orders";
import { 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Tv,
  Sun,
  Eye,
  BellRing,
  Mic,
  RotateCw,
  CloudRain,
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Product options matching standard COD deals
const PACK_OPTIONS = [
  {
    id: "pack-1",
    name: "1 Caméra Solaire Double Objectif (Kit Standard)",
    price: 50000,
    priceStr: "50 000 FCFA",
    oldPriceStr: "85 000 FCFA",
    badge: "Offre Standard",
    popular: false,
    quantity: 1
  },
  {
    id: "pack-2",
    name: "2 Caméras Solaires Double Objectif (Sécurité Totale)",
    price: 90000,
    priceStr: "90 000 FCFA",
    oldPriceStr: "170 000 FCFA",
    badge: "Recommandé — Économisez 10 000 FCFA !",
    popular: true,
    quantity: 2
  },
  {
    id: "pack-3",
    name: "3 Caméras Solaires Double Objectif (Pack Pro / Chantiers)",
    price: 130000,
    priceStr: "130 000 FCFA",
    oldPriceStr: "255 000 FCFA",
    badge: "Super Économique — Économisez 20 000 FCFA",
    popular: false,
    quantity: 3
  }
];

const GALLERY_IMAGES = [
  { url: IMAGES.realProduct, label: "Notre Caméra Réelle & Boîte" },
  { url: IMAGES.hero, label: "Double Objectif de Face" },
  { url: IMAGES.night, label: "Vision Nocturne Couleur 2K" },
  { url: IMAGES.app, label: "Application Smartphone Incluse" },
  { url: IMAGES.waterproof, label: "Étanchéité IP66 Extrême" }
];

export default function Hero() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPack, setSelectedPack] = useState(PACK_OPTIONS[1]); // Default to 2 Caméras
  
  // Form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Cotonou");
  const [address, setAddress] = useState("");
  
  // Interaction states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<any>(null);

  // Urgent Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 53 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Reset countdown to simulate continuous action
          return { minutes: 14, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live order notifications mimicking Shopify apps
  const [liveNotification, setLiveNotification] = useState("");
  const firstNames = ["Koffi", "Mariam", "Saliou", "Akim", "Elise", "Hubert", "Bernice", "Gildas", "Florent", "Yasmine"];
  const cities = ["Cotonou", "Calavi", "Porto-Novo", "Parakou", "Ouidah", "Bohicon", "Allada"];
  
  useEffect(() => {
    const triggerNotification = () => {
      const name = firstNames[Math.floor(Math.random() * firstNames.length)];
      const itemCity = cities[Math.floor(Math.random() * cities.length)];
      const numCameras = Math.random() > 0.4 ? "2" : "1";
      setLiveNotification(`${name} de ${itemCity} vient de commander ${numCameras} caméra(s) solaire(s) double objectif ! 🔥`);
      
      setTimeout(() => {
        setLiveNotification("");
      }, 5000);
    };

    // Trigger every 28 seconds
    const interval = setInterval(triggerNotification, 28000);
    // Trigger first one after 5 seconds
    const timeout = setTimeout(triggerNotification, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Load previous local order to show status
  useEffect(() => {
    const saved = localStorage.getItem("sl_vision_order");
    if (saved) {
      setLastOrderDetails(JSON.parse(saved));
    }
  }, []);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      alert("Veuillez remplir tous les champs requis pour finaliser votre commande.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Add to our central localStorage order list
      const savedOrder = addOrder({
        fullName,
        phone,
        city,
        address,
        packId: selectedPack.id,
        packName: selectedPack.name,
        price: selectedPack.price,
        priceStr: selectedPack.priceStr,
        notes: "Commande express placée depuis la page d'accueil."
      });

      // Also set the last order for the local user confirmation UI
      localStorage.setItem("sl_vision_order", JSON.stringify(savedOrder));
      setLastOrderDetails(savedOrder);
      setOrderCreated(true);
      setIsSubmitting(false);

      // Create pre-filled WhatsApp message
      const whatsappMessage = `Bonjour ${BRAND_NAME},\n\nJ'aimerais valider ma commande express (Double Objectif) :\n\n📦 *Formule choisie* : ${selectedPack.name}\n💰 *Montant* : ${selectedPack.priceStr} (Paiement à la livraison)\n👤 *Nom complet* : ${fullName}\n📞 *Téléphone (WhatsApp)* : ${phone}\n📍 *Ville* : ${city}\n🏠 *Adresse de livraison* : ${address}\n\nMerci de me confirmer la livraison gratuite.`;
      
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open in new tab referrer policy safe
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 1200);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  return (
    <section className="relative bg-slate-50 pt-6 pb-16 md:pt-10 overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Real-time live sales notification popup */}
        <AnimatePresence>
          {liveNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 max-w-sm flex items-center gap-3.5"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0 animate-pulse">
                🛒
              </div>
              <p className="text-xs font-semibold leading-relaxed font-sans text-slate-100">
                {liveNotification}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand Header for Mobile landing structure */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          {/* Rating bar at absolute top */}
          <div className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100 mb-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800 font-sans">4.9/5 (194 avis vérifiés au Bénin)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
            {BRAND_NAME} — Caméra Solaire Double Objectif
          </h1>
          <p className="text-sm font-bold text-blue-600 mt-2 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Double Objectif • 100% Autonome Solaire • Audio Bidirectionnel
          </p>
        </div>

        {/* TWO-COLUMN GRID: Image Gallery (Left) & Checkout Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
          
          {/* ================= LEFT COLUMN: THE IMAGE GALLERY (FIRST THING VISIBLE) ================= */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Main Interactive Slide */}
            <div className="relative aspect-4/3 bg-slate-950 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img 
                src={GALLERY_IMAGES[activeImageIndex].url} 
                alt={GALLERY_IMAGES[activeImageIndex].label} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300 select-none"
              />
              
              {/* Image Label Tag */}
              <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-700 text-white text-[10px] font-bold tracking-wider uppercase font-mono shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {GALLERY_IMAGES[activeImageIndex].label}
              </div>

              {/* Special Red Discount Tag */}
              <div className="absolute top-4 right-4 bg-red-600 px-3.5 py-1.5 rounded-2xl text-white font-bold text-xs uppercase shadow-lg tracking-wider font-display animate-bounce">
                -41% OFFRE FLASH
              </div>

              {/* Navigation arrows overlay */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Slider Dots Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full">
                {GALLERY_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === activeImageIndex ? "bg-white scale-125" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Selection strip */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border-2 transition ${
                    i === activeImageIndex 
                      ? "border-blue-600 scale-95 shadow-md shadow-blue-100" 
                      : "border-transparent hover:border-slate-300 opacity-80"
                  }`}
                >
                  <img 
                    src={img.url} 
                    alt="" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                  />
                </button>
              ))}
            </div>

            {/* Quick value trust propositions in gallery */}
            <div className="bg-blue-50/60 border border-blue-100/80 rounded-2xl p-4 mt-1">
              <p className="text-xs font-semibold text-blue-900 uppercase tracking-widest font-mono mb-2">📦 Le kit complet Double Objectif comprend :</p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-medium text-slate-700">
                <li className="flex items-center gap-1.5">
                  <span className="text-blue-600 text-sm">✔</span> Caméra Double Capteur Ultra HD
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-blue-600 text-sm">✔</span> Panneau Solaire Double Rallonge
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-blue-600 text-sm">✔</span> Batterie 12000mAh Intégrée
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-blue-600 text-sm">✔</span> Kit de Fixation Murale Complet
                </li>
              </ul>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: THE FORM (SECOND THING VISIBLE) ================= */}
          <div className="lg:col-span-6">
            
            {/* The Shopify-style Order Form Container */}
            <div id="order-form" className="bg-white rounded-[32px] border-2 border-orange-500/80 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
              
              {/* Urgency Counter Badge */}
              <div className="absolute top-0 right-0 left-0 bg-orange-500 text-white py-1 px-4 text-center font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>OFFRE FLASH : STOCK DOUBLE OBJECTIF LIMITÉ — FIN DANS {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds} !</span>
              </div>

              {/* Form Title */}
              <div className="mt-4 mb-5 text-center">
                <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 flex items-center justify-center gap-1.5">
                  <Flame className="w-5.5 h-5.5 text-orange-500 fill-orange-500" />
                  BON DE COMMANDE EXPRESS
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Remplissez ce formulaire pour commander. Paiement sécurisé à la livraison !
                </p>
              </div>

              {/* Success State */}
              {orderCreated ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">Commande enregistrée au Bénin !</h3>
                  <p className="text-xs text-slate-600 mt-2">
                    Nous avons bien enregistré votre commande pour <strong>{lastOrderDetails?.fullName}</strong>.
                  </p>
                  
                  {/* Summary card */}
                  <div className="bg-white rounded-xl p-4 border border-slate-100 text-left my-4 text-xs space-y-1.5">
                    <p className="font-semibold text-slate-800">Récapitulatif de votre commande :</p>
                    <p><span className="text-slate-400">Commande N° :</span> <span className="font-bold text-slate-800">{lastOrderDetails?.id}</span></p>
                    <p><span className="text-slate-400">Offre :</span> {lastOrderDetails?.packName}</p>
                    <p><span className="text-slate-400">Montant :</span> <span className="font-bold text-emerald-600">{lastOrderDetails?.priceStr}</span></p>
                    <p><span className="text-slate-400">Téléphone (WhatsApp) :</span> {lastOrderDetails?.phone}</p>
                    <p><span className="text-slate-400">Ville :</span> {lastOrderDetails?.city}</p>
                    <p><span className="text-slate-400">Adresse de livraison :</span> {lastOrderDetails?.address}</p>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Un message pré-rempli a été préparé pour notre équipe sur WhatsApp afin de vous offrir la livraison gratuite immédiate. Si l'ouverture automatique n'a pas eu lieu, veuillez cliquer ci-dessous :
                  </p>

                  <button
                    onClick={() => {
                      const whatsappMessage = `Bonjour ${BRAND_NAME},\n\nJ'aimerais valider ma commande express (Double Objectif) :\n\n📦 *Formule choisie* : ${lastOrderDetails?.packName}\n💰 *Montant* : ${lastOrderDetails?.priceStr} (Paiement à la livraison)\n👤 *Nom complet* : ${lastOrderDetails?.fullName}\n📞 *Téléphone (WhatsApp)* : ${lastOrderDetails?.phone}\n📍 *Ville* : ${lastOrderDetails?.city}\n🏠 *Adresse de livraison* : ${lastOrderDetails?.address}\n\nMerci de me confirmer la livraison gratuite.`;
                      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
                      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                    }}
                    className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition cursor-pointer shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    Valider ma commande sur WhatsApp
                  </button>

                  <button
                    onClick={() => setOrderCreated(false)}
                    className="mt-3 text-xs text-blue-600 hover:underline block mx-auto font-medium"
                  >
                    Placer une nouvelle commande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  
                  {/* STEP 1: Pack choice cards */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider font-mono mb-2.5 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px]">1</span>
                      Étape 1 : Choisissez votre formule Double Objectif
                    </label>

                    <div className="space-y-2">
                      {PACK_OPTIONS.map((pack) => {
                        const isSelected = selectedPack.id === pack.id;
                        return (
                          <div
                            key={pack.id}
                            onClick={() => setSelectedPack(pack)}
                            className={`border-2 rounded-2xl p-3.5 cursor-pointer transition relative ${
                              isSelected 
                                ? "border-blue-600 bg-blue-50/50 shadow-md shadow-blue-50" 
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            {/* Best-seller Badge */}
                            {pack.popular && (
                              <div className="absolute -top-2.5 right-4 bg-orange-500 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                                🔥 RECOMMANDÉ (SÉCURITÉ DOUBLE ZONE)
                              </div>
                            )}

                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  isSelected ? "border-blue-600" : "border-slate-300"
                                }`}>
                                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                </div>
                                <div className="pr-2">
                                  <span className="block font-bold text-slate-800 text-xs sm:text-sm">
                                    {pack.name}
                                  </span>
                                  <span className="inline-block mt-0.5 text-[10px] font-semibold text-blue-600 font-mono bg-blue-100/50 px-2 py-0.5 rounded-md">
                                    {pack.badge}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="text-right shrink-0">
                                <span className="block text-sm font-extrabold text-slate-900 font-display">
                                  {pack.priceStr}
                                </span>
                                <span className="block text-[10px] text-slate-400 line-through leading-none">
                                  {pack.oldPriceStr}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 2: Shipping details */}
                  <div className="space-y-3.5 pt-1">
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px]">2</span>
                      Étape 2 : Vos coordonnées de livraison gratuite au Bénin
                    </label>

                    {/* Name input */}
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Votre Nom Complet (Ex: Koffi Gbaguidi)"
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                      />
                    </div>

                    {/* Phone/WhatsApp input */}
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Votre Numéro WhatsApp (Ex: +229 61 00 00 00)"
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                      />
                      <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[10px] text-emerald-500 font-bold font-mono">
                        WhatsApp requis
                      </span>
                    </div>

                    {/* City Dropdown */}
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition appearance-none cursor-pointer"
                      >
                        <option value="Cotonou">Cotonou (Livré sous 24H gratuitement)</option>
                        <option value="Abomey-Calavi">Abomey-Calavi (Livré sous 24H gratuitement)</option>
                        <option value="Porto-Novo">Porto-Novo (Livré sous 48H gratuitement)</option>
                        <option value="Parakou">Parakou (Livré sous 48H gratuitement)</option>
                        <option value="Bohicon / Abomey">Bohicon / Abomey (Livré sous 48H gratuitement)</option>
                        <option value="Ouidah">Ouidah (Livré sous 48H gratuitement)</option>
                        <option value="Allada">Allada (Livré sous 48H gratuitement)</option>
                        <option value="Autre Ville au Bénin">Autre Ville au Bénin (Livré sous 48-72H)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 text-xs font-bold font-mono">
                        ▼
                      </div>
                    </div>

                    {/* Precise neighborhood address input */}
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Quartier & Adresse de livraison (Ex: Fidjrossè, près de l'église)"
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* SUBMIT ACTION BUTTON (PULSING & HIGH-CONVERSION) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-green-200/50 hover:shadow-green-300 hover:scale-[1.01] transition-all duration-300 flex flex-col items-center justify-center gap-0.5 select-none animate-pulse cursor-pointer border border-emerald-400/30"
                    >
                      <span className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 fill-white" />
                        {isSubmitting ? "ENREGISTREMENT DE VOTRE COMMANDE..." : "VALIDER MA COMMANDE GRATUITE"}
                      </span>
                      <span className="text-[10px] font-medium opacity-90 font-sans tracking-wide">
                        ⚠️ Paiement sécurisé après vérification à la livraison !
                      </span>
                    </button>
                  </div>

                  {/* Trust guarantees footer on form */}
                  <div className="grid grid-cols-3 gap-1 pt-3 border-t border-slate-100 text-[9px] sm:text-[10px] text-slate-500 text-center font-medium font-sans">
                    <div className="flex flex-col items-center">
                      <span className="text-blue-500 font-bold mb-0.5 text-xs">🚚</span>
                      <span>Livraison Gratuite</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-slate-100">
                      <span className="text-emerald-500 font-bold mb-0.5 text-xs">💵</span>
                      <span>Payez à la livraison</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-amber-500 font-bold mb-0.5 text-xs">🛠️</span>
                      <span>Vérifié & Testé</span>
                    </div>
                  </div>

                </form>
              )}

            </div>

            {/* Overlapping alert trigger for conversion optimization */}
            <div className="mt-3 bg-red-50 border border-red-100 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-red-800 uppercase tracking-wider text-[10px] font-mono">⚠️ RUPTURE DE STOCK IMMINENTE</p>
                <p className="text-slate-600 mt-0.5 leading-tight text-[11px]">En raison d'une forte demande en période de délestage, il ne reste que <strong>14 caméras solaires double objectif</strong> en stock au Bénin.</p>
              </div>
            </div>

          </div>

        </div>

        {/* ================= TEXT / DESCRIPTION COMES AFTER (THE OLD HERO COPY REDESIGNED) ================= */}
        <div className="mt-16 bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold font-mono">
                ⚡ PROTECTION INTELLIGENTE 24H/24 SANS COURANT
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
                Caméra Solaire Double Objectif — Une Protection Révolutionnaire 24h/24 !
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                Protégez votre maison, votre boutique, votre bureau ou votre chantier avec notre caméra solaire à double objectif, conçue pour une surveillance optimale de jour comme de nuit. Deux yeux valent mieux qu'un : surveillez l'entrée générale de votre maison d'un côté et zoomez sur l'allée avec l'autre !
              </p>

              {/* The 8 Specific features requested by the user */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 sm:p-5 mt-4">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-mono mb-3 flex items-center gap-1">
                  🎯 Avantages clés exclusifs du Double Objectif :
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✅</span>
                    <span><strong>Double objectif</strong> pour une meilleure couverture double zone</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✅</span>
                    <span><strong>Alimentation 100% solaire</strong> — fonctionne sans électricité (Zéro SBEE)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✅</span>
                    <span><strong>Vision nocturne</strong> en couleur et infrarouge ultra-détaillée</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✅</span>
                    <span><strong>Détection intelligente</strong> des mouvements avec alertes instantanées sur téléphone</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✅</span>
                    <span><strong>Audio bidirectionnel</strong> : écoutez et parlez à distance en temps réel</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✅</span>
                    <span><strong>Rotation motorisée</strong> PTZ sur 355° pour une surveillance élargie</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✅</span>
                    <span><strong>Résistante à la pluie</strong> et au soleil intense (IP66 usage extérieur)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✅</span>
                    <span><strong>Accès et contrôle</strong> à distance complet depuis votre téléphone mobile</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 bg-gradient-to-tr from-slate-900 to-blue-950 text-white rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase">
                  ⭐ RECOMMANDÉ PAR NOTRE CLIENTÈLE
                </div>
                <p className="text-sm font-semibold italic text-slate-200 leading-relaxed">
                  "Ce système double objectif est fabuleux. J'ai placé la caméra sur mon pylône à Calavi. L'objectif du haut filme ma porte d'entrée de voiture, et l'objectif du bas suit automatiquement toute personne qui s'approche de mes portes. C'est l'autonomie totale !"
                </p>
                <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold">Armand T.</p>
                    <p className="text-[10px] text-slate-400">Calavi, Bénin</p>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
