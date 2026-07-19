export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  benefit: string;
  specs: string[];
  imagePath: string;
  isReversed?: boolean;
}

export interface AudienceCard {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  bgGradient: string;
}

export interface ComparisonRow {
  feature: string;
  traditional: string;
  slVision: string;
  isPositive: boolean;
}

export interface TechSpecItem {
  category: string;
  title: string;
  value: string;
  iconName: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
  date: string;
  avatarSeed: string;
}

export interface Order {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  packId: string;
  packName: string;
  price: number;
  priceStr: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  notes?: string;
}

