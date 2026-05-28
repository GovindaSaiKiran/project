export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  guests: number;
  amenities: string[];
  features: string[];
  imageUrl: string;
}

export interface DiningItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "breakfast" | "lunch" | "dinner";
  isChefSpecial?: boolean;
}

export interface Experience {
  id: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Package {
  id: string;
  tag: string;
  title: string;
  description: string;
  price: number;
  durationDays: number;
  highlights: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

export interface OrderState {
  id: string;
  item: string;
  status: "ordered" | "preparing" | "en-route" | "delivered";
  guestRoom: string;
  timestamp: number;
}

export interface DashboardStats {
  occupancyRate: number;
  activeGuests: number;
  ambientTempC: string;
  conciergeRequestsToday: number;
  averageResolutionMins: number;
  roomServiceTrackers: OrderState[];
}
