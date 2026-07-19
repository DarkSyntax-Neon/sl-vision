import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Benefits from "./components/Benefits";
import Lifestyle from "./components/Lifestyle";
import FeatureShowcase from "./components/FeatureShowcase";
import WhoIsItFor from "./components/WhoIsItFor";
import ComparisonTable from "./components/ComparisonTable";
import ImageGallery from "./components/ImageGallery";
import TechnicalSpecs from "./components/TechnicalSpecs";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import { BRAND_NAME } from "./data";
import { MessageCircle, ShieldAlert, Key, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [viewMode, setViewMode] = useState<"client" | "admin">("client");
  
  // Admin passcode states
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "142008" || passcode === "admin") {
      setViewMode("admin");
      setShowAdminLogin(false);
      setPasscode("");
      setLoginError("");
    } else {
      setLoginError("Code d'accès incorrect. Utilisez le code secret à 6 chiffres.");
      setPasscode("");
    }
  };

  const appendPasscodeChar = (char: string) => {
    setLoginError("");
    if (passcode.length < 6) {
      setPasscode(prev => prev + char);
    }
  };

  const clearPasscode = () => {
    setPasscode("");
    setLoginError("");
  };

  // If in admin mode, show the full screen dashboard directly
  if (viewMode === "admin") {
    return <AdminDashboard onClose={() => setViewMode("client")} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. Announcement Bar (CRO visual booster) */}
      <div className="bg-slate-900 text-white text-center py-2 px-4 text-xs font-medium font-sans tracking-wide relative z-50 flex items-center justify-center gap-1.5 select-none">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span>⚡ Offre Double Objectif : -41% de réduction immédiate + Livraison gratuite partout au Bénin !</span>
      </div>

      {/* 2. Top Header (Shopify-style Branding & WhatsApp quick access) */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isHeaderScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100" 
            : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg font-display transition group-hover:bg-blue-600">
                SL
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 font-display">
                {BRAND_NAME}
              </span>
            </a>

            {/* Middle Quick Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition">Fonctionnalités</a>
              <a href="#who-is-it-for" className="hover:text-blue-600 transition">Besoins</a>
              <a href="#gallery" className="hover:text-blue-600 transition">Photos</a>
              <a href="#specs" className="hover:text-blue-600 transition">Fiche Technique</a>
              <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
            </nav>

            {/* Right Quick Action Header Buttons */}
            <div className="flex items-center gap-3">
              {/* Desktop Only Quick Admin button to satisfy developer requirements */}
              <button
                onClick={() => setShowAdminLogin(true)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 py-2 px-3 rounded-xl transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>

              <a
                href="#order-form"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-xl text-xs sm:text-sm shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Commander</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* 2.5 Trust Bar with moving ticker */}
      <TrustBar />

      {/* 3. Section Flow */}
      <main>
        
        {/* Section 1: Hero with order integration */}
        <Hero />

        {/* Section 3: Benefits Matrix */}
        <Benefits />

        {/* Section 4: Lifestyle Emotional Banner */}
        <Lifestyle />

        {/* Section 5: Deep Feature Alternate Showcase */}
        <FeatureShowcase />

        {/* Section 6: Target Audience Segmentation */}
        <WhoIsItFor />

        {/* Section 7: VS Traditional Comparison Table */}
        <ComparisonTable />

        {/* Section 8: Image Gallery Slider with Zoom */}
        <ImageGallery />

        {/* Section 9: Technical Fiche Specifications */}
        <TechnicalSpecs />

        {/* Section 10: How It Works Timeline */}
        <HowItWorks />

        {/* Section 11: Accordion FAQ Area */}
        <FAQ />

        {/* Section 12: Testimonials Slider */}
        <Testimonials />

        {/* Section 13: Final Visual Call To Action */}
        <CTASection />

      </main>

      {/* 4. Footer with admin callback */}
      <Footer onAdminClick={() => setShowAdminLogin(true)} />

      {/* 5. Fixed Floating Trigger Button */}
      <FloatingWhatsApp />

      {/* 6. SECURE PASSCODE DIALOG MODAL */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl space-y-4"
            >
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setPasscode("");
                  setLoginError("");
                }}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto">
                <Key className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white font-display uppercase tracking-wide">
                  Espace Administration
                </h3>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-normal font-sans">
                  Veuillez saisir le code d'accès pour consulter le tableau de bord des commandes.
                </p>
                <p className="text-[10px] text-blue-400 font-mono mt-1 bg-blue-950/40 py-1 px-2 rounded inline-block font-semibold">
                  🔑 Code d'accès : 142008
                </p>
              </div>

              {/* Login error label */}
              {loginError && (
                <p className="text-[11px] font-semibold text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-900/30">
                  {loginError}
                </p>
              )}

              {/* Passcode indicators display */}
              <form onSubmit={handlePasscodeSubmit} className="space-y-4">
                <div className="flex justify-center gap-2.5 py-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4.5 h-4.5 rounded-full border-2 transition-all ${
                        passcode.length > i
                          ? "bg-blue-500 border-blue-500 scale-110"
                          : "border-slate-700 bg-transparent"
                      }`}
                    />
                  ))}
                </div>

                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setLoginError("");
                    setPasscode(e.target.value.slice(0, 6));
                  }}
                  placeholder="Code à 6 chiffres"
                  className="w-full text-center tracking-widest font-mono text-lg font-bold bg-slate-950 border border-slate-800 rounded-xl py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
                  maxLength={6}
                />

                {/* Simulated beautiful numeric keypad */}
                <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto pt-2">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => appendPasscodeChar(num)}
                      className="w-12 h-12 bg-slate-800/80 hover:bg-slate-750 text-white font-extrabold text-sm rounded-xl transition cursor-pointer select-none active:scale-90"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={clearPasscode}
                    className="w-12 h-12 bg-slate-950/50 hover:bg-slate-800 text-red-400 font-bold text-xs rounded-xl transition cursor-pointer select-none"
                  >
                    Effacer
                  </button>
                  <button
                    type="button"
                    onClick={() => appendPasscodeChar("0")}
                    className="w-12 h-12 bg-slate-800/80 hover:bg-slate-750 text-white font-extrabold text-sm rounded-xl transition cursor-pointer select-none"
                  >
                    0
                  </button>
                  <button
                    type="submit"
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl transition cursor-pointer select-none active:scale-95"
                  >
                    Entrer
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
