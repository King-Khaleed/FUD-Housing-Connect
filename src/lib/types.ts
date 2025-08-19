export interface Property {
  id: number;
  title: string;
  price: number;
  priceType: 'annual' | 'monthly';
  location: {
    area: string;
    address: string;
    distanceFromCampus: string;
    coordinates: { lat: number; lng: number };
  };
  roomType: 'Self-contain' | '1-Bedroom' | '2-Bedroom' | 'Shared Apartment' | '3-Bedroom' | '4-Bedroom';
  size: string;
  images: string[];
  amenities: string[];
  description: string;
  agentId: number;
  available: boolean;
  featured: boolean;
  dateAdded: string;
  views: number;
  inquiries: number;
  verified: boolean;
}

export interface Agent {
  id: number;
  name: string;
  profileImage: string;
  phone: string;
  whatsapp: string;
  email: string;
  verified: boolean;
  verificationLevel: 'Basic' | 'Verified' | 'Premium';
  responseTime: string;
  rating: number;
  totalReviews: number;
  properties: number[];
  joinedDate: string;
  bio: string;
}
