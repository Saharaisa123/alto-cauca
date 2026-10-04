export type Language = 'es' | 'en' | 'pt';

export type EventCategory = 'Cultos' | 'Jóvenes' | 'Oración' | 'Familia' | 'Escuela Bíblica' | 'Misiones';

export interface ChurchEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  speaker: string;
  description: string;
  rsvpCount: number;
  isVirtual: boolean;
  virtualLink?: string;
}

export interface SocialProject {
  id: string;
  title: string;
  category: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  image: string;
  donorsCount: number;
  beneficiaries: string;
  status: 'active' | 'completed';
}

export type PaymentMethod = 'card' | 'crypto' | 'bank' | 'wallet';

export interface DonationTransaction {
  id: string;
  receiptNumber: string;
  donorName: string;
  email: string;
  amount: number;
  currency: 'USD' | 'COP' | 'EUR' | 'MXN' | 'BRL';
  convertedUSD: number;
  paymentMethod: PaymentMethod;
  paymentDetail: string; // e.g. "Visa ending in 4242", "USDT TRC-20", "PSE / Bancolombia"
  projectId: string;
  projectTitle: string;
  date: string;
  status: 'completed' | 'pending' | 'verified';
  txHash?: string;
  anonymous: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  city: string;
  category: 'Sanidad' | 'Familia' | 'Finanzas' | 'Fe';
  title: string;
  content: string;
  date: string;
  verified: boolean;
  approved: boolean;
}

export interface VolunteerApplication {
  id: string;
  code: string;
  fullName: string;
  email: string;
  phone: string;
  ministry: 'Alabanza' | 'Medios' | 'Infantil' | 'Ujieres' | 'AccionSocial' | 'Consejeria';
  availability: string;
  talents: string;
  status: 'pending' | 'approved' | 'in_review';
  appliedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  role: string;
  date: string;
  category: 'Devocional' | 'Estudio Bíblico' | 'Noticias' | 'Familia';
  readTime: string;
  audioDuration?: string;
  keyScripture?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Bautismos' | 'Adoración' | 'Acción Social' | 'Jóvenes' | 'Comunidad';
  date: string;
  image: string;
  description: string;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'stream' | 'event' | 'giving' | 'pastoral';
  link?: string;
}
