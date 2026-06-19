export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  image?: string;
}

export interface Package {
  id: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  price: number;
  currency: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  description: string;
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  category: 'adventure' | 'luxury' | 'family' | 'honeymoon' | 'cultural' | 'beach';
  bestTimeToVisit: string;
  isFeatured: boolean;
  isBestSeller?: boolean;
  discount?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  packageCount: number;
  description: string;
  attractions: string[];
}

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  duration: string;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'popularity';
}
