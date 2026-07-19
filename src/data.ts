import { 
  BenefitCard, 
  FeatureItem, 
  AudienceCard, 
  ComparisonRow, 
  TechSpecItem, 
  HowItWorksStep, 
  FAQItem, 
  TestimonialItem 
} from "./types";

// Constant for WhatsApp link and messages
export const WHATSAPP_NUMBER = "22961261507";
export const PRODUCT_PRICE = "50 000 FCFA";
export const PRODUCT_NAME = "SL VISION Caméra Solaire Double Objectif";
export const BRAND_NAME = "SL VISION";

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Bonjour, je suis intéressé par la caméra solaire SL VISION Double Objectif à 50 000 FCFA. J'aimerais connaître la disponibilité ainsi que les modalités de livraison."
)}`;

// Image paths matching generated assets
export const IMAGES = {
  hero: "/src/assets/images/camera_hero_solar_1784456245764.jpg",
  night: "/src/assets/images/camera_night_vision_1784456260968.jpg",
  app: "/src/assets/images/camera_mobile_app_1784456274955.jpg",
  waterproof: "/src/assets/images/camera_waterproof_ip66_1784456288913.jpg",
  realProduct: "/src/assets/images/camera_real_life_box_1784459667392.jpg"
};

// 1. Benefits Section Data (4 Premium Cards) - Updated for Double Objectif
export const BENEFITS_DATA: BenefitCard[] = [
  {
    id: "dual-lens",
    title: "Double Objectif Connecté",
    description: "Deux yeux valent mieux qu'un ! Un objectif fixe pour surveiller une zone globale, et un objectif motorisé PTZ pour suivre les mouvements en zoomant.",
    iconName: "Eye"
  },
  {
    id: "solar",
    title: "Énergie 100% Solaire",
    description: "Autonome et écologique. Fonctionne non-stop grâce à son panneau solaire photovoltaïque haut rendement, même durant les pannes SBEE.",
    iconName: "Sun"
  },
  {
    id: "audio",
    title: "Audio Bidirectionnel",
    description: "Écoutez et parlez en temps réel depuis votre smartphone. Dissuadez les intrus instantanément grâce au micro et au haut-parleur intégrés.",
    iconName: "Mic"
  },
  {
    id: "motion",
    title: "Détection & Alertes AI",
    description: "Détecte les formes humaines intelligemment et vous envoie une notification instantanée avec sirène automatique pour faire fuir les voleurs.",
    iconName: "BellRing"
  }
];

// 2. Feature Showcase Data (Detailed analysis) - Tailored for Double Objectif
export const FEATURES_DATA: FeatureItem[] = [
  {
    id: "dual-lens-coverage",
    title: "Technologie Double Objectif Ultra HD",
    benefit: "Surveillez deux zones distinctes simultanément sans aucun angle mort. Le premier objectif grand angle garde une vue d'ensemble, tandis que le second pivote pour traquer les détails.",
    specs: [
      "Deux flux vidéo synchronisés en Ultra HD sur votre écran",
      "Zoom hybride puissant pour lire les plaques d'immatriculation",
      "Suivi automatique intelligent des cibles en mouvement",
      "Élimine totalement le besoin d'acheter deux caméras distinctes"
    ],
    imagePath: IMAGES.hero,
    isReversed: false
  },
  {
    id: "solar-autonomy",
    title: "Alimentation Solaire Continue & Batterie Pro",
    benefit: "Profitez d'une protection non-stop 365 jours par an, sans jamais avoir besoin de prise électrique ni de recharge manuelle.",
    specs: [
      "Panneau solaire monocristallin résistant à haut rendement",
      "Batterie Lithium rechargeable intégrée haute capacité",
      "Économisez sur vos factures : 0 FCFA de coût d'électricité",
      "Protection active même pendant les périodes de délestage SBEE"
    ],
    imagePath: IMAGES.waterproof,
    isReversed: true
  },
  {
    id: "night-vision-color",
    title: "Vision Nocturne Couleur & Projecteurs LED",
    benefit: "La nuit n'est plus un obstacle. Identifiez clairement les visages et les couleurs de vêtements avec des images nettes même dans l'obscurité totale.",
    specs: [
      "Vision nocturne en couleur ultra-claire",
      "Projecteurs LED lumineux activés par le mouvement",
      "Mode vision infrarouge discret avec portée de 30m",
      "Capteurs optiques professionnels de sécurité"
    ],
    imagePath: IMAGES.night,
    isReversed: false
  },
  {
    id: "mobile-app-ptz",
    title: "Contrôle Rotatif PTZ & Accès Smartphone",
    benefit: "Pilotez votre caméra à distance depuis votre téléphone. Faites-la tourner, écoutez, parlez et configurez vos options d'un simple geste.",
    specs: [
      "Rotation motorisée horizontale à 355° et verticale à 90°",
      "Application gratuite sur iPhone et Android (icSee / V380)",
      "Audio bidirectionnel en temps réel (micro + haut-parleur)",
      "Partage d'accès instantané avec vos proches ou collaborateurs"
    ],
    imagePath: IMAGES.app,
    isReversed: true
  }
];

// 3. Who Is It For Data
export const AUDIENCES_DATA: AudienceCard[] = [
  {
    id: "home",
    title: "Maison & Villa",
    subtitle: "Surveillez votre cour et l'entrée principale en même temps grâce aux deux objectifs.",
    iconName: "Home",
    bgGradient: "from-slate-50 to-blue-50"
  },
  {
    id: "shop",
    title: "Boutique & Supermarché",
    subtitle: "Gardez un œil sur la caisse et la porte d'entrée simultanément avec un seul appareil.",
    iconName: "Store",
    bgGradient: "from-slate-50 to-emerald-50"
  },
  {
    id: "office",
    title: "Bureau & Commerce",
    subtitle: "Contrôlez les allées et venues de vos employés et des clients en haute définition.",
    iconName: "Briefcase",
    bgGradient: "from-slate-50 to-indigo-50"
  },
  {
    id: "parking",
    title: "Parking & Garage",
    subtitle: "Surveillez vos véhicules garés de jour comme de nuit sans risque de vandalisme.",
    iconName: "Car",
    bgGradient: "from-slate-50 to-amber-50"
  },
  {
    id: "construction",
    title: "Chantiers & Bâtiments",
    subtitle: "Le top pour les zones isolées sans électricité afin de prévenir les vols de matériaux.",
    iconName: "HardHat",
    bgGradient: "from-slate-50 to-orange-50"
  },
  {
    id: "farm",
    title: "Fermes & Plantations",
    subtitle: "Suivez vos bêtes et vos cultures à distance, même à des kilomètres de la ville.",
    iconName: "Wheat",
    bgGradient: "from-slate-50 to-lime-50"
  }
];

// 4. Comparison Table Data
export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Structure de l'objectif",
    traditional: "Objectif unique - Angle de vue restreint ❌",
    slVision: "Double objectif (Vue d'ensemble fixe + PTZ mobile) ✅",
    isPositive: true
  },
  {
    feature: "Alimentation électrique",
    traditional: "Coupée immédiatement en cas de panne de courant ❌",
    slVision: "100% Solaire - Fonctionne même sous coupures de courant ✅",
    isPositive: true
  },
  {
    feature: "Coût de l'installation",
    traditional: "Électricien, câbles, goulottes et travaux coûteux ❌",
    slVision: "Installation sans fil prête en 10 minutes chrono ✅",
    isPositive: true
  },
  {
    feature: "Vision Nocturne",
    traditional: "Images sombres et floues en noir et blanc ❌",
    slVision: "Vision couleur éclatante avec projecteurs intelligents ✅",
    isPositive: true
  },
  {
    feature: "Communication",
    traditional: "Pas d'audio ou son inaudible de mauvaise qualité ❌",
    slVision: "Audio bidirectionnel fluide (haut-parleur puissant) ✅",
    isPositive: true
  },
  {
    feature: "Facture d'électricité",
    traditional: "Consomme de l'énergie en continu sur votre compteur ❌",
    slVision: "0 FCFA consommés ! Énergie solaire gratuite à vie ✅",
    isPositive: true
  }
];

// 5. Technical Specifications Data - Updated for Double Objectif
export const TECH_SPECS: TechSpecItem[] = [
  {
    category: "Alimentation",
    title: "Panneau Solaire",
    value: "Silicium monocristallin 6W orientable à haut rendement",
    iconName: "Sun"
  },
  {
    category: "Alimentation",
    title: "Batterie",
    value: "12000mAh Lithium-ion rechargeable longue durée",
    iconName: "BatteryCharging"
  },
  {
    category: "Optique",
    title: "Double Objectif",
    value: "Double capteur de 4 Megapixels chacun (Résolution HD 2K)",
    iconName: "Tv"
  },
  {
    category: "Optique",
    title: "Vision Nocturne",
    value: "Couleur intégrale par projecteurs LED + Infrarouge (30m)",
    iconName: "Eye"
  },
  {
    category: "Rotation",
    title: "Angle de vue PTZ",
    value: "Objectif motorisé : Horiz 355°, Vert 90° | Objectif fixe : 110°",
    iconName: "Move3d"
  },
  {
    category: "Réseau",
    title: "Connectivité",
    value: "Wi-Fi 2.4 GHz avec double antenne haut gain (Modem Wi-Fi OK)",
    iconName: "Wifi"
  },
  {
    category: "Audio",
    title: "Bidirectionnel",
    value: "Microphone et haut-parleur intégrés haute fidélité",
    iconName: "Mic"
  },
  {
    category: "Stockage",
    title: "Enregistrement",
    value: "Support carte Micro SD (jusqu'à 128 Go) & Stockage Cloud",
    iconName: "HardDrive"
  },
  {
    category: "Résistance",
    title: "Étanchéité",
    value: "IP66 waterproof (conçu pour pluie, vent et fortes chaleurs)",
    iconName: "CloudRain"
  },
  {
    category: "Logiciel",
    title: "Application",
    value: "icSee / V380 Pro (gratuite en français sur iOS et Android)",
    iconName: "Smartphone"
  }
];

// 6. How It Works Steps
export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    step: 1,
    title: "Fixez l'appareil",
    description: "Vissez la caméra et son panneau solaire orientable à l'endroit de votre choix. Pas besoin de câble électrique.",
    iconName: "Hammer"
  },
  {
    step: 2,
    title: "Connectez au Wi-Fi",
    description: "Allumez l'appareil et jumelez-le au Wi-Fi de votre maison, de votre bureau ou de votre modem Wi-Fi mobile.",
    iconName: "Wifi"
  },
  {
    step: 3,
    title: "Installez l'App",
    description: "Installez l'application mobile gratuite sur votre smartphone Android ou iPhone et scannez le code QR de la caméra.",
    iconName: "Download"
  },
  {
    step: 4,
    title: "Surveillez en direct",
    description: "C'est tout ! Vous pouvez désormais voir les deux flux en direct, faire tourner la caméra et recevoir les alertes.",
    iconName: "ShieldCheck"
  }
];

// 7. Frequently Asked Questions
export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Comment fonctionne le double objectif de la caméra ?",
    answer: "La caméra possède deux objectifs distincts qui travaillent ensemble : le premier objectif en haut est fixe et garde constamment une vue d'ensemble large à 110 degrés de votre cour ou de votre magasin. Le deuxième objectif en bas est motorisé (PTZ) et peut pivoter à 355 degrés pour zoomer ou suivre automatiquement une personne en mouvement. Vous voyez les deux images en même temps sur l'écran de votre téléphone !"
  },
  {
    id: "faq-2",
    question: "Fonctionne-t-elle sans électricité de la SBEE lors de délestages ?",
    answer: "Oui, à 100%. C'est l'un des plus grands atouts de notre système. Grâce à son panneau solaire monocristallin haut rendement et sa batterie rechargeable intégrée de 12000mAh, la caméra produit et stocke sa propre électricité. Elle fonctionne en continu jour et nuit sans interruption, peu importe la durée de la coupure de courant."
  },
  {
    id: "faq-3",
    question: "Faut-il un abonnement mensuel pour utiliser la caméra ?",
    answer: "Non, aucun abonnement n'est requis ! L'application mobile de contrôle est gratuite à vie et toutes les fonctions (vision en direct, alertes, rotation, parler/écouter) sont gratuites. Pour enregistrer les vidéos, il vous suffit d'insérer une carte mémoire Micro SD classique dans la caméra."
  },
  {
    id: "faq-4",
    question: "La caméra résiste-t-elle aux fortes pluies et au soleil intense au Bénin ?",
    answer: "Absolument. Certifiée selon la norme internationale IP66, elle est totalement hermétique à la poussière (parfaite en saison d'harmattan) et résiste aux pluies torrentielles et aux températures élevées de notre pays."
  },
  {
    id: "faq-5",
    question: "Puis-je l'utiliser s'il n'y a pas de Wi-Fi fixe chez moi ?",
    answer: "Oui ! Vous pouvez connecter la caméra à un modem Wi-Fi portable ou de poche (comme les modems MTN ou Moov). La caméra se connecte au Wi-Fi du modem et vous permet de regarder en direct depuis votre téléphone, n'importe où dans le monde."
  },
  {
    id: "faq-6",
    question: "Quelles sont les conditions et délais de livraison au Bénin ?",
    answer: "La livraison est entièrement GRATUITE partout au Bénin ! Nous livrons en 24h à Cotonou, Abomey-Calavi et Porto-Novo. Pour les autres villes (Parakou, Bohicon, Natitingou, Ouidah, etc.), la livraison prend entre 48h et 72h. Le paiement est 100% sécurisé et s'effectue après réception et vérification du colis par vos soins."
  }
];

// 8. Sample Customer Testimonials
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Akim G.",
    role: "Propriétaire de quincaillerie",
    location: "Cotonou, Akpakpa",
    text: "La caméra double objectif de SL VISION est révolutionnaire. Avec une caméra classique, je ne pouvais voir que devant ma porte. Maintenant, avec le double objectif, un œil surveille ma caisse et l'autre pivote pour voir tout le magasin. Et l'alimentation solaire est parfaite !",
    rating: 5,
    date: "Il y a 2 semaines",
    avatarSeed: "akim"
  },
  {
    id: "t-2",
    name: "Mariam K.",
    role: "Commerçante de pagnes",
    location: "Calavi, Arconville",
    text: "L'installation a été d'une simplicité enfantine. Je surveille ma villa depuis mon magasin au marché de Dantokpa. Même sous de grosses pluies à Calavi, l'image reste nette et la batterie solaire ne fléchit jamais. Je recommande vivement.",
    rating: 5,
    date: "Il y a 1 mois",
    avatarSeed: "mariam"
  },
  {
    id: "t-3",
    name: "Armand T.",
    role: "Directeur de chantier BTP",
    location: "Ouidah, Bénin",
    text: "En tant qu'entrepreneur, je perdais beaucoup de ciment sur mes chantiers sans électricité. J'ai installé cette caméra double objectif sur un poteau : elle se recharge seule et surveille tout le dépôt. J'ai pu prendre des voleurs en flagrant délit grâce à l'alerte sur mon téléphone !",
    rating: 5,
    date: "Il y a 3 jours",
    avatarSeed: "armand"
  },
  {
    id: "t-4",
    name: "Sébastien D.",
    role: "Fermier avicole",
    location: "Allada, Bénin",
    text: "C'est la solution rêvée pour surveiller mes poulaillers à Allada. Je l'ai couplée à un petit routeur Wi-Fi Mtn et j'obtiens un flux vidéo parfait à Cotonou. L'audio bidirectionnel me permet même de parler pour effrayer les bêtes ou avertir les gardiens.",
    rating: 5,
    date: "Il y a 3 semaines",
    avatarSeed: "sebastien"
  }
];
