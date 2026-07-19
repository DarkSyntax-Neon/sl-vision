import React, { useState, useEffect } from "react";
import { 
  getOrders, 
  updateOrderStatus, 
  deleteOrder, 
  addOrder, 
  clearAndResetOrders, 
  switchToProductionMode,
  exportOrdersToCSV 
} from "../lib/orders";
import { Order } from "../types";
import { 
  Search, 
  Plus, 
  Download, 
  RefreshCw, 
  ArrowLeft, 
  MessageCircle, 
  Trash2, 
  SlidersHorizontal, 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  FileText, 
  MapPin, 
  Phone, 
  User, 
  X,
  AlertTriangle,
  Info,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BRAND_NAME, WHATSAPP_NUMBER, IMAGES } from "../data";

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  
  // Modals and manual inputs
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCity, setNewCity] = useState("Cotonou");
  const [newAddress, setNewAddress] = useState("");
  const [newPack, setNewPack] = useState("pack-2");
  const [newNotes, setNewNotes] = useState("");
  
  const [editingNoteOrderId, setEditingNoteOrderId] = useState<string | null>(null);
  const [noteInputValue, setNoteInputValue] = useState("");
  const [isProduction, setIsProduction] = useState(localStorage.getItem("sl_vision_production_mode") === "true");

  // Load orders on mount
  useEffect(() => {
    setOrders(getOrders());
  }, []);

  // Sync state helpers
  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    const updated = updateOrderStatus(orderId, status);
    setOrders(updated);
  };

  const handleNoteSave = (orderId: string) => {
    const updated = updateOrderStatus(orderId, orders.find(o => o.id === orderId)?.status || "pending", noteInputValue);
    setOrders(updated);
    setEditingNoteOrderId(null);
  };

  const handleDelete = (orderId: string, clientName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la commande de ${clientName} (${orderId}) ?`)) {
      const updated = deleteOrder(orderId);
      setOrders(updated);
    }
  };

  const handleResetSeed = () => {
    if (window.confirm("Voulez-vous réinitialiser la base de données avec les 10 commandes de démonstration du Bénin ?")) {
      const reset = clearAndResetOrders();
      setOrders(reset);
      setIsProduction(false);
    }
  };

  const handleSwitchToProduction = () => {
    if (window.confirm("ATTENTION : Voulez-vous supprimer TOUTES les commandes de démonstration fictives et passer en MODE RÉEL de production ?\n\n(La base de données sera vidée et n'enregistrera plus que les vraies commandes de vos clients !)")) {
      const reset = switchToProductionMode();
      setOrders(reset);
      setIsProduction(true);
      alert("Mode Production Activé ! Toutes les données de démonstration ont été effacées. Votre base de données de commandes est maintenant 100% propre et prête pour vos vrais clients.");
    }
  };

  const handleAddManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newPhone.trim() || !newAddress.trim()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const packsConfig = [
      { id: "pack-1", name: "1 Caméra Solaire Double Objectif (Kit Standard)", price: 50000, priceStr: "50 000 FCFA" },
      { id: "pack-2", name: "2 Caméras Solaires Double Objectif (Sécurité Totale)", price: 90000, priceStr: "90 000 FCFA" },
      { id: "pack-3", name: "3 Caméras Solaires Double Objectif (Pack Pro / Chantiers)", price: 130000, priceStr: "130 000 FCFA" }
    ];

    const selectedPackInfo = packsConfig.find(p => p.id === newPack) || packsConfig[1];

    addOrder({
      fullName: newFullName,
      phone: newPhone,
      city: newCity,
      address: newAddress,
      packId: selectedPackInfo.id,
      packName: selectedPackInfo.name,
      price: selectedPackInfo.price,
      priceStr: selectedPackInfo.priceStr,
      notes: newNotes.trim() || "Commande manuelle enregistrée par téléphone."
    });

    // Refresh state
    setOrders(getOrders());
    setShowAddModal(false);
    
    // Reset form fields
    setNewFullName("");
    setNewPhone("");
    setNewCity("Cotonou");
    setNewAddress("");
    setNewNotes("");
  };

  const handleDownloadCSV = () => {
    const csvData = exportOrdersToCSV(orders);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sl_vision_commandes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendWhatsAppConfirmation = (order: Order) => {
    const message = `Bonjour M./Mme *${order.fullName}*,\n\nIci le service clients *${BRAND_NAME}* (Caméras Solaires Double Objectif).\n\nNous avons bien reçu votre commande pour le produit : *${order.packName}*.\n💰 *Montant à régler* : ${order.priceStr}\n📍 *Ville de livraison* : ${order.city}\n🏠 *Quartier/Adresse* : ${order.address}\n\nLa livraison gratuite est planifiée pour vous. Pourriez-vous nous confirmer votre disponibilité à recevoir notre livreur aujourd'hui ou demain ?\n\nMerci de répondre par OUI pour lancer l'expédition ! 📦🤝`;
    
    // Clean phone number (removing space, ensuring country code)
    let cleanedPhone = order.phone.replace(/[\s+]/g, "");
    if (!cleanedPhone.startsWith("229") && cleanedPhone.length === 8) {
      cleanedPhone = "229" + cleanedPhone;
    }

    const whatsappUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadFile = async (url: string, defaultName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = defaultName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", defaultName);
      link.setAttribute("target", "_blank");
      link.click();
    }
  };

  // --- CALCULATIONS FOR KPIs ---
  const totalOrders = orders.length;
  
  // Revenue is counted for confirmed, shipped or delivered orders
  const validOrders = orders.filter(o => ["confirmed", "shipped", "delivered"].includes(o.status));
  const totalRevenueVal = validOrders.reduce((sum, o) => sum + o.price, 0);
  
  const pendingOrdersCount = orders.filter(o => o.status === "pending").length;
  const deliveredOrdersCount = orders.filter(o => o.status === "delivered").length;
  
  const averageOrderValue = totalOrders > 0 ? Math.round(orders.reduce((sum, o) => sum + o.price, 0) / totalOrders) : 0;
  const completionRate = totalOrders > 0 ? Math.round((deliveredOrdersCount / totalOrders) * 100) : 0;

  // --- FILTERED ORDERS LIST ---
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    const matchesCity = cityFilter === "all" || 
      (cityFilter === "cotonou" && order.city.toLowerCase().includes("cotonou")) ||
      (cityFilter === "calavi" && order.city.toLowerCase().includes("calavi")) ||
      (cityFilter === "porto-novo" && order.city.toLowerCase().includes("porto")) ||
      (cityFilter === "parakou" && order.city.toLowerCase().includes("parakou")) ||
      (cityFilter === "autres" && !["cotonou", "calavi", "porto", "parakou"].some(c => order.city.toLowerCase().includes(c)));
      
    return matchesSearch && matchesStatus && matchesCity;
  });

  // --- DATA GRAPH CALCULATIONS (Sales by City & Sales Trend) ---
  // Count by Cities
  const cityCounts: Record<string, number> = {};
  orders.forEach(o => {
    // Simplify city name
    let simplified = "Autre";
    if (o.city.toLowerCase().includes("cotonou")) simplified = "Cotonou";
    else if (o.city.toLowerCase().includes("calavi")) simplified = "Calavi";
    else if (o.city.toLowerCase().includes("porto")) simplified = "Porto-Novo";
    else if (o.city.toLowerCase().includes("parakou")) simplified = "Parakou";
    else if (o.city.toLowerCase().includes("ouidah")) simplified = "Ouidah";
    else if (o.city.toLowerCase().includes("bohicon") || o.city.toLowerCase().includes("abomey")) simplified = "Bohicon";
    else if (o.city.toLowerCase().includes("allada")) simplified = "Allada";
    
    cityCounts[simplified] = (cityCounts[simplified] || 0) + 1;
  });

  const cityDataList = Object.entries(cityCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const maxCityCount = cityDataList.length > 0 ? Math.max(...cityDataList.map(c => c.count)) : 1;

  // Status Counts
  const statusCounts = {
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  // Convert Status to French labels
  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "pending": return "En Attente";
      case "confirmed": return "Confirmée";
      case "shipped": return "Expédiée";
      case "delivered": return "Livrée";
      case "cancelled": return "Annulée";
      default: return status;
    }
  };

  const getStatusBadgeClass = (status: Order["status"]) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-800 border border-amber-200";
      case "confirmed": return "bg-blue-100 text-blue-800 border border-blue-200";
      case "shipped": return "bg-indigo-100 text-indigo-800 border border-indigo-200";
      case "delivered": return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "cancelled": return "bg-red-100 text-red-800 border border-red-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl border border-slate-700/50 transition cursor-pointer"
              title="Retourner au Site"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight font-display text-white">
                  {BRAND_NAME} Backoffice
                </h1>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  isProduction 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                }`}>
                  {isProduction ? "🟢 Mode Réel (Production)" : "🟡 Mode Démo (Simulations)"}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-mono text-slate-400">
                Espace d'administration connecté • Gestion des commandes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!isProduction ? (
              <button
                onClick={handleSwitchToProduction}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold rounded-xl transition cursor-pointer shadow-md shadow-red-900/10"
                title="Effacer toutes les commandes d'exemples et activer le mode production propre"
              >
                ⚠️ Activer le Mode Réel (Vider Démo)
              </button>
            ) : (
              <button
                onClick={handleResetSeed}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
                title="Repasser en mode démo avec des exemples pour les tests"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Mode Démo (Simuler)
              </button>
            )}
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Exporter CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold rounded-xl transition shadow-md shadow-blue-900/10 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Nouvelle Vente
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* INFO NOTICE */}
        <div className="bg-slate-900/60 border border-blue-950 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-300 flex-1 leading-relaxed">
            <span className="font-bold text-white font-sans text-sm block sm:inline mr-1">Dashboard en temps réel :</span>
            Cet espace administrateur lit et écrit directement dans le stockage de données. Toutes les nouvelles commandes reçues sur le site d'accueil s'ajouteront automatiquement ici. Vous pouvez changer leur statut, ajouter des notes, et contacter les clients béninois via WhatsApp en un seul clic !
          </div>
        </div>

        {/* 2. STATISTICAL KPI CARDS (SHOPIFY-STYLE) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Revenue KPI */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Chiffre d'Affaires</p>
            <p className="text-lg sm:text-2xl font-extrabold text-white mt-1.5 font-display tracking-tight text-emerald-400">
              {totalRevenueVal.toLocaleString("fr-FR")} FCFA
            </p>
            <p className="text-[9px] text-slate-500 mt-1">
              Sur {validOrders.length} ventes validées
            </p>
          </div>

          {/* Total Orders count KPI */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Total Commandes</p>
            <p className="text-lg sm:text-2xl font-extrabold text-white mt-1.5 font-display tracking-tight">
              {totalOrders}
            </p>
            <p className="text-[9px] text-slate-500 mt-1">
              Toutes étapes confondues
            </p>
          </div>

          {/* Pending checkups KPI */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">En Attente d'Appel</p>
            <p className="text-lg sm:text-2xl font-extrabold mt-1.5 font-display tracking-tight text-amber-500">
              {pendingOrdersCount}
            </p>
            <p className="text-[9px] text-slate-500 mt-1">
              Nouveaux prospects à appeler
            </p>
          </div>

          {/* Average Order Value KPI */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Panier Moyen</p>
            <p className="text-lg sm:text-2xl font-extrabold text-white mt-1.5 font-display tracking-tight text-blue-400">
              {averageOrderValue.toLocaleString("fr-FR")} FCFA
            </p>
            <p className="text-[9px] text-slate-500 mt-1">
              Achat moyen par client
            </p>
          </div>

          {/* Completion/Delivery rate KPI */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5 col-span-2 lg:col-span-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Taux de Livraison</p>
            <p className="text-lg sm:text-2xl font-extrabold mt-1.5 font-display tracking-tight text-indigo-400">
              {completionRate}%
            </p>
            <p className="text-[9px] text-slate-500 mt-1">
              {deliveredOrdersCount} colis livrés avec succès
            </p>
          </div>

        </div>

        {/* 3. INTERACTIVE VISUAL GRAPHS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sales by City (Bar Chart) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                Distribution Géographique au Bénin
              </h3>
              <p className="text-[11px] text-slate-400">
                Classement des ventes par ville principale
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {cityDataList.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">Aucune donnée géographique disponible</p>
              ) : (
                cityDataList.map((city, idx) => {
                  const percentage = Math.round((city.count / maxCityCount) * 100);
                  return (
                    <div key={city.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {city.name}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {city.count} {city.count > 1 ? "commandes" : "commande"}
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className={`h-full rounded-full bg-gradient-to-r ${
                            idx === 0 
                              ? "from-blue-600 to-indigo-500" 
                              : idx === 1 
                              ? "from-emerald-600 to-green-500" 
                              : "from-slate-700 to-slate-600"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Status breakdown (Ring / Progress Ring) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                Cycle de Vie des Commandes
              </h3>
              <p className="text-[11px] text-slate-400">
                Répartition par étape opérationnelle
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {[
                { key: "pending", label: "En Attente", val: statusCounts.pending, color: "bg-amber-500", rawColor: "amber" },
                { key: "confirmed", label: "Confirmées", val: statusCounts.confirmed, color: "bg-blue-500", rawColor: "blue" },
                { key: "shipped", label: "Expédiées (En cours)", val: statusCounts.shipped, color: "bg-indigo-500", rawColor: "indigo" },
                { key: "delivered", label: "Livrées (Succès)", val: statusCounts.delivered, color: "bg-emerald-500", rawColor: "emerald" },
                { key: "cancelled", label: "Annulées / Rejetées", val: statusCounts.cancelled, color: "bg-red-500", rawColor: "red" }
              ].map((item) => {
                const percent = totalOrders > 0 ? Math.round((item.val / totalOrders) * 100) : 0;
                return (
                  <div key={item.key} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/60 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-xs font-bold text-slate-200">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-white">{item.val}</span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded-md">
                        {percent}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* 4. ORDERS DATA TABLE & FILTER SEARCH PANEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          
          {/* SEARCH & FILTERS BAR */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/40 space-y-4">
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                  Liste des Commandes
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Recherchez, filtrez, et gérez vos clients
                </p>
              </div>

              {/* Status filter tabs */}
              <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {[
                  { id: "all", label: "Toutes" },
                  { id: "pending", label: "En Attente" },
                  { id: "confirmed", label: "Confirmées" },
                  { id: "shipped", label: "Expédiées" },
                  { id: "delivered", label: "Livrées" },
                  { id: "cancelled", label: "Annulées" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-tight transition cursor-pointer ${
                      statusFilter === tab.id
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              
              {/* Fulltext Search input */}
              <div className="sm:col-span-8 relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par nom, téléphone, adresse ou n° commande..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
                />
              </div>

              {/* City geographic filter dropdown */}
              <div className="sm:col-span-4">
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 transition appearance-none cursor-pointer"
                >
                  <option value="all">Toutes les Villes</option>
                  <option value="cotonou">Cotonou uniquement</option>
                  <option value="calavi">Abomey-Calavi uniquement</option>
                  <option value="porto-novo">Porto-Novo uniquement</option>
                  <option value="parakou">Parakou uniquement</option>
                  <option value="autres">Autres départements</option>
                </select>
              </div>

            </div>

          </div>

          {/* TABLE MAIN CONTAINER */}
          <div className="overflow-x-auto">
            {filteredOrders.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-xs px-4">
                {isProduction && orders.length === 0 ? (
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/20">
                      <CheckCircle className="w-6 h-6 animate-pulse" />
                    </div>
                    <p className="font-bold text-slate-200 text-sm">Votre boutique est prête à recevoir de vraies commandes !</p>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Le Mode Réel est activé et la base de données est propre. Dès qu'un client remplira le formulaire de commande express sur la page d'accueil, sa commande apparaîtra ici instantanément avec une alerte.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition cursor-pointer text-[11px]"
                      >
                        Retourner au site pour tester
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto space-y-2">
                    <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="font-bold text-slate-300">Aucune commande trouvée</p>
                    <p className="text-slate-400">Modifiez vos filtres de recherche ou réinitialisez les données.</p>
                  </div>
                )}
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px] font-mono">
                    <th className="py-3 px-4">Commande ID</th>
                    <th className="py-3 px-4">Client / Contact</th>
                    <th className="py-3 px-4">Adresse de Livraison</th>
                    <th className="py-3 px-4">Offre / Montant</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4">Suivi & Notes</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/80">
                  {filteredOrders.map((order) => {
                    const isEditingNote = editingNoteOrderId === order.id;
                    return (
                      <tr key={order.id} className="hover:bg-slate-900/40 transition">
                        
                        {/* 1. Order ID & Date */}
                        <td className="py-4.5 px-4 whitespace-nowrap">
                          <span className="font-mono font-extrabold text-blue-400 block">{order.id}</span>
                          <span className="text-[10px] text-slate-500 mt-1 block flex items-center gap-1">
                            <Calendar className="w-3 h-3 shrink-0" />
                            {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </td>

                        {/* 2. Client & Phone */}
                        <td className="py-4.5 px-4">
                          <div className="font-bold text-slate-100 flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {order.fullName}
                          </div>
                          <div className="text-[11px] text-emerald-400 font-medium font-mono mt-1 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                            {order.phone}
                          </div>
                        </td>

                        {/* 3. Shipping details (City & neighborhood) */}
                        <td className="py-4.5 px-4 max-w-xs">
                          <span className="inline-flex items-center gap-1 bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-md text-[10px] uppercase font-mono tracking-wide">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {order.city}
                          </span>
                          <p className="text-slate-400 text-[11px] mt-1.5 leading-tight italic break-words">
                            {order.address}
                          </p>
                        </td>

                        {/* 4. Pack & Price */}
                        <td className="py-4.5 px-4">
                          <span className="text-slate-200 font-medium block leading-snug">
                            {order.packName.replace(" Caméra Solaire Double Objectif", " Caméra(s)")}
                          </span>
                          <span className="text-emerald-400 font-mono font-bold block mt-1">
                            {order.priceStr}
                          </span>
                        </td>

                        {/* 5. Interactive Status Dropdown Selector */}
                        <td className="py-4.5 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-blue-600 transition cursor-pointer ${getStatusBadgeClass(order.status)}`}
                          >
                            <option value="pending">En Attente ⚠️</option>
                            <option value="confirmed">Confirmée 👍</option>
                            <option value="shipped">Expédiée 🚚</option>
                            <option value="delivered">Livrée (Payé) ✅</option>
                            <option value="cancelled">Annulée ❌</option>
                          </select>
                        </td>

                        {/* 6. Notes text display or inline editing input */}
                        <td className="py-4.5 px-4 max-w-xs">
                          {isEditingNote ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                value={noteInputValue}
                                onChange={(e) => setNoteInputValue(e.target.value)}
                                className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-[11px] text-white focus:outline-none w-full"
                                autoFocus
                              />
                              <button
                                onClick={() => handleNoteSave(order.id)}
                                className="p-1 bg-emerald-600 hover:bg-emerald-500 rounded text-white font-bold cursor-pointer"
                                title="Sauvegarder"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => setEditingNoteOrderId(null)}
                                className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 hover:text-white cursor-pointer"
                                title="Annuler"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div 
                              onClick={() => {
                                setEditingNoteOrderId(order.id);
                                setNoteInputValue(order.notes || "");
                              }}
                              className="text-[11px] text-slate-400 hover:text-white hover:bg-slate-800/40 p-1 rounded transition cursor-pointer group flex items-start justify-between gap-1.5"
                              title="Cliquez pour modifier la note"
                            >
                              <span className="italic break-words">
                                {order.notes || "Ajouter un commentaire..."}
                              </span>
                              <span className="text-[9px] text-slate-600 font-mono font-bold group-hover:text-blue-500">✍️</span>
                            </div>
                          )}
                        </td>

                        {/* 7. Action CTA columns (WhatsApp and Trash) */}
                        <td className="py-4.5 px-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleSendWhatsAppConfirmation(order)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold rounded-lg text-[10px] transition cursor-pointer"
                              title="Envoyer un message de confirmation de livraison"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                              WhatsApp
                            </button>
                            <button
                              onClick={() => handleDelete(order.id, order.fullName)}
                              className="p-1.5 bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 rounded-lg border border-transparent hover:border-red-900/30 transition cursor-pointer"
                              title="Supprimer la commande"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>
            )}
          </div>

          {/* TABLE FOOTER SUMMARY */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <p>
              Affichage de <strong>{filteredOrders.length}</strong> commandes sur un total de <strong>{orders.length}</strong> enregistrées.
            </p>
            <div className="flex gap-4 font-semibold text-[11px]">
              <span className="text-amber-500">● En attente : {statusCounts.pending}</span>
              <span className="text-blue-500">● Confirmées : {statusCounts.confirmed}</span>
              <span className="text-indigo-400">● Expédiées : {statusCounts.shipped}</span>
              <span className="text-emerald-500">● Livrées : {statusCounts.delivered}</span>
            </div>
          </div>

        </div>

        {/* --- ZONE EXCLUSIVE DE TÉLÉCHARGEMENT DE FICHIERS D'IMAGES RÉELS (POUR MAC & PC) --- */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-white font-display tracking-wide flex items-center gap-2">
                📂 ZONE DE TÉLÉCHARGEMENT DIRECT DES IMAGES (SPÉCIAL MAC & PC)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Sur Mac, certains dossiers d'assets ou de code peuvent être masqués par le système (Finder). Utilisez les boutons ci-dessous pour télécharger les images <strong>physiques et réelles au format .jpg</strong> directement dans votre dossier "Téléchargements" !
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase rounded-full">
                🚀 Sans Liens Morts • Fichiers Réels
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                id: "real",
                url: IMAGES.realProduct,
                name: "camera_double_objectif_reelle.jpg",
                title: "1. Image Envoyée (Réelle)",
                desc: "La photo de vos caméras réelles sur leurs boîtes d'emballage d'origine."
              },
              {
                id: "hero",
                url: IMAGES.hero,
                name: "camera_double_objectif_solaire.jpg",
                title: "2. Caméra de Face (Solaire)",
                desc: "Image principale montrant le panneau solaire et le double objectif."
              },
              {
                id: "night",
                url: IMAGES.night,
                name: "camera_vision_nocturne.jpg",
                title: "3. Vision Nocturne",
                desc: "Démonstration de la vision nocturne couleur 2K de nuit."
              },
              {
                id: "app",
                url: IMAGES.app,
                name: "camera_application_mobile.jpg",
                title: "4. Application Mobile",
                desc: "Interface de contrôle de la caméra double flux sur smartphone."
              },
              {
                id: "waterproof",
                url: IMAGES.waterproof,
                name: "camera_waterproof_ip66.jpg",
                title: "5. Résistance IP66",
                desc: "Démonstration de résistance extrême de la caméra à la pluie."
              }
            ].map((img) => (
              <div key={img.id} className="bg-slate-950 rounded-2xl p-3 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-mono font-bold text-white uppercase">
                      JPG
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white leading-tight">{img.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-normal line-clamp-2">{img.desc}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadFile(img.url, img.name)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95 shadow-md hover:shadow-blue-900/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  Télécharger le fichier
                </button>
              </div>
            ))}
          </div>

          <div className="bg-blue-950/20 border border-blue-900/30 rounded-2xl p-4 text-[11px] text-slate-400 space-y-1">
            <p className="font-extrabold text-blue-400 flex items-center gap-1">
              💡 Astuce Mac Finder :
            </p>
            <p>
              Si vous souhaitez tout de même afficher les fichiers cachés dans le Finder sur votre Mac, ouvrez le terminal et tapez : <code className="bg-slate-950 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">defaults write com.apple.finder AppleShowAllFiles YES && killall Finder</code>. Vous pouvez aussi utiliser le raccourci clavier <kbd className="bg-slate-800 px-1 py-0.5 rounded text-white font-bold text-[10px]">Cmd + Shift + . (point)</kbd> directement dans n'importe quel dossier Finder.
            </p>
          </div>
        </div>

      </div>

      {/* 5. ADD MANUAL ORDER OVERLAY MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
            >
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                  Enregistrer une Vente Manuelle (Téléphone)
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddManualOrder} className="p-5 space-y-4">
                
                {/* Client Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Nom du Client *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                      <User className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      required
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                      placeholder="Ex: Koffi Gbaguidi"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
                    />
                  </div>
                </div>

                {/* Telephone */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Numéro WhatsApp / Téléphone *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="Ex: +229 61 26 15 07"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
                    />
                  </div>
                </div>

                {/* City & Address */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Ville *</label>
                    <select
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 transition cursor-pointer"
                    >
                      <option value="Cotonou">Cotonou</option>
                      <option value="Abomey-Calavi">Abomey-Calavi</option>
                      <option value="Porto-Novo">Porto-Novo</option>
                      <option value="Parakou">Parakou</option>
                      <option value="Bohicon / Abomey">Bohicon / Abomey</option>
                      <option value="Ouidah">Ouidah</option>
                      <option value="Allada">Allada</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Produit Choisi *</label>
                    <select
                      value={newPack}
                      onChange={(e) => setNewPack(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 transition cursor-pointer"
                    >
                      <option value="pack-1">1 Caméra (50k FCFA)</option>
                      <option value="pack-2">2 Caméras (90k FCFA)</option>
                      <option value="pack-3">3 Caméras (130k FCFA)</option>
                    </select>
                  </div>
                </div>

                {/* Address details */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Quartier & Précisions de livraison *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      required
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="Ex: Fidjrossè, près de l'église catholique"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Notes Internes / Détails de l'appel</label>
                  <textarea
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="Ex: A appeler à midi pour confirmer l'heure exacte. Préfère un règlement MoMo."
                    rows={2}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition resize-none"
                  />
                </div>

                {/* Submit buttons */}
                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold rounded-xl border border-slate-750 transition cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold rounded-xl transition shadow-md shadow-blue-900/20 cursor-pointer"
                  >
                    Enregistrer la Vente
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
