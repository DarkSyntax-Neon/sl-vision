import { Order } from "../types";

const LOCAL_STORAGE_KEY = "sl_vision_all_orders";

// High-quality Benin seed data for initial presentation
const BENIN_SEED_ORDERS: Order[] = [
  {
    id: "SLV-101",
    fullName: "Koffi Gbaguidi",
    phone: "+229 61 26 15 07",
    city: "Cotonou",
    address: "Fidjrossè, près de l'église catholique",
    packId: "pack-2",
    packName: "2 Caméras Solaires (Pack Sécurité Totale)",
    price: 90000,
    priceStr: "90 000 FCFA",
    status: "delivered",
    createdAt: "2026-07-12T14:32:00.000Z",
    notes: "Client très satisfait. A testé l'audio bidirectionnel devant l'agent de livraison."
  },
  {
    id: "SLV-102",
    fullName: "Mariam Soglo",
    phone: "+229 97 45 12 36",
    city: "Abomey-Calavi",
    address: "Arconville, villa blanche face pharmacie",
    packId: "pack-1",
    packName: "1 Caméra Solaire (Kit Standard)",
    price: 50000,
    priceStr: "50 000 FCFA",
    status: "delivered",
    createdAt: "2026-07-13T09:15:00.000Z",
    notes: "Livré en moins de 24h. Installée sur le portail principal."
  },
  {
    id: "SLV-103",
    fullName: "Bernice Houndéton",
    phone: "+229 95 62 88 44",
    city: "Porto-Novo",
    address: "Ouando, à côté du grand marché",
    packId: "pack-2",
    packName: "2 Caméras Solaires (Pack Sécurité Totale)",
    price: 90000,
    priceStr: "90 000 FCFA",
    status: "confirmed",
    createdAt: "2026-07-15T18:40:00.000Z",
    notes: "Appel de confirmation passé. Livraison programmée pour samedi matin."
  },
  {
    id: "SLV-104",
    fullName: "Akim Bio",
    phone: "+229 66 12 34 56",
    city: "Parakou",
    address: "Zongo, derrière la mosquée centrale",
    packId: "pack-3",
    packName: "3 Caméras Solaires (Pack Pro / Entreprise)",
    price: 130000,
    priceStr: "130 000 FCFA",
    status: "shipped",
    createdAt: "2026-07-16T11:24:00.000Z",
    notes: "Envoyé par le bus ATT. Le client récupère au terminal de Parakou."
  },
  {
    id: "SLV-105",
    fullName: "Gildas Dossou",
    phone: "+229 90 41 55 12",
    city: "Cotonou",
    address: "Akpakpa, quartier Midombo, carré 1420",
    packId: "pack-1",
    packName: "1 Caméra Solaire (Kit Standard)",
    price: 50000,
    priceStr: "50 000 FCFA",
    status: "pending",
    createdAt: "2026-07-18T16:45:00.000Z",
    notes: "Nouvelle commande via le site. À appeler pour confirmation."
  },
  {
    id: "SLV-106",
    fullName: "Yasmine Lawson",
    phone: "+229 62 88 99 77",
    city: "Ouidah",
    address: "Route des Esclaves, face hôtel de la plage",
    packId: "pack-2",
    packName: "2 Caméras Solaires (Pack Sécurité Totale)",
    price: 90000,
    priceStr: "90 000 FCFA",
    status: "cancelled",
    createdAt: "2026-07-14T10:05:00.000Z",
    notes: "Hors budget finalement. Souhaite reporter à la fin du mois."
  },
  {
    id: "SLV-107",
    fullName: "Hubert Sèdjro",
    phone: "+229 94 33 22 11",
    city: "Bohicon / Abomey",
    address: "Sodohomè, près de l'école primaire publique",
    packId: "pack-2",
    packName: "2 Caméras Solaires (Pack Sécurité Totale)",
    price: 90000,
    priceStr: "90 000 FCFA",
    status: "delivered",
    createdAt: "2026-07-14T15:20:00.000Z",
    notes: "Installé pour surveiller un troupeau. Les deux objectifs fonctionnent à merveille."
  },
  {
    id: "SLV-108",
    fullName: "Florent Agbo",
    phone: "+229 96 15 16 17",
    city: "Abomey-Calavi",
    address: "Zogbadjè, près du campus UAC",
    packId: "pack-3",
    packName: "3 Caméras Solaires (Pack Pro / Entreprise)",
    price: 130000,
    priceStr: "130 000 FCFA",
    status: "confirmed",
    createdAt: "2026-07-17T13:12:00.000Z",
    notes: "Commande confirmée pour l'immeuble d'étudiants. Livraison prévue ce soir."
  },
  {
    id: "SLV-109",
    fullName: "Chantal Tokpo",
    phone: "+229 61 40 80 90",
    city: "Cotonou",
    address: "Cadjehoun, ruelle de l'aéroport",
    packId: "pack-1",
    packName: "1 Caméra Solaire (Kit Standard)",
    price: 50000,
    priceStr: "50 000 FCFA",
    status: "pending",
    createdAt: "2026-07-19T02:30:00.000Z",
    notes: "Commande de nuit. En attente d'appel ce matin."
  },
  {
    id: "SLV-110",
    fullName: "Saliou Alao",
    phone: "+229 91 12 13 14",
    city: "Allada",
    address: "Quartier administratif, face à la préfecture",
    packId: "pack-2",
    packName: "2 Caméras Solaires (Pack Sécurité Totale)",
    price: 90000,
    priceStr: "90 000 FCFA",
    status: "delivered",
    createdAt: "2026-07-11T16:00:00.000Z",
    notes: "Livraison de confiance. Client a payé cash."
  }
];

export function getOrders(): Order[] {
  const isProduction = localStorage.getItem("sl_vision_production_mode") === "true";
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    if (isProduction) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    // Seed and save initial records so the dashboard isn't blank
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(BENIN_SEED_ORDERS));
    return BENIN_SEED_ORDERS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return isProduction ? [] : BENIN_SEED_ORDERS;
  }
}

export function saveOrders(orders: Order[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
}

export function addOrder(orderData: Omit<Order, "id" | "status" | "createdAt">): Order {
  const orders = getOrders();
  
  // Custom prefix ID generator
  const nextNumber = orders.length > 0 
    ? Math.max(...orders.map(o => parseInt(o.id.replace("SLV-", "")) || 100)) + 1 
    : 111;
    
  const newOrder: Order = {
    ...orderData,
    id: `SLV-${nextNumber}`,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  
  orders.unshift(newOrder); // Add to the top of list
  saveOrders(orders);
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: Order["status"], notes?: string): Order[] {
  const orders = getOrders();
  const updated = orders.map(o => {
    if (o.id === orderId) {
      return { 
        ...o, 
        status, 
        ...(notes !== undefined ? { notes } : {}) 
      };
    }
    return o;
  });
  saveOrders(updated);
  return updated;
}

export function deleteOrder(orderId: string): Order[] {
  const orders = getOrders();
  const filtered = orders.filter(o => o.id !== orderId);
  saveOrders(filtered);
  return filtered;
}

export function clearAndResetOrders(): Order[] {
  localStorage.removeItem("sl_vision_production_mode");
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(BENIN_SEED_ORDERS));
  return BENIN_SEED_ORDERS;
}

export function switchToProductionMode(): Order[] {
  localStorage.setItem("sl_vision_production_mode", "true");
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
  return [];
}

// Convert orders list to downloadble CSV string
export function exportOrdersToCSV(orders: Order[]): string {
  const headers = ["ID Commande", "Nom Complet", "Telephone", "Ville", "Adresse", "Produit", "Prix (FCFA)", "Statut", "Date de Creation", "Notes"];
  
  const rows = orders.map(o => [
    o.id,
    o.fullName.replace(/"/g, '""'),
    o.phone,
    o.city,
    o.address.replace(/"/g, '""'),
    o.packName.replace(/"/g, '""'),
    o.price,
    o.status.toUpperCase(),
    new Date(o.createdAt).toLocaleString("fr-FR"),
    (o.notes || "").replace(/"/g, '""')
  ]);
  
  const csvContent = [
    headers.join(","),
    ...rows.map(r => r.map(val => `"${val}"`).join(","))
  ].join("\n");
  
  return csvContent;
}
