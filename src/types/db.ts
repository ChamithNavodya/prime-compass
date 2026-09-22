export interface DbCategory {
  id: string;
  name: string;
  slug: string;
}

export interface DbDestination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  attractions: string[];
  latitude: number | null;
  longitude: number | null;
  _count?: { packages: number };
}

export interface RouteWaypoint {
  id: string;
  label: string;
  lat: number;
  lng: number;
  destinationId?: string;
}

export interface DbItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface DbPackage {
  id: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  pricingType: 'FIXED' | 'RANGE' | 'HIDDEN';
  price: number | null;
  priceMin: number | null;
  priceMax: number | null;
  currency: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  description: string;
  itinerary: DbItineraryItem[];
  route: RouteWaypoint[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  bestTimeToVisit: string | null;
  isFeatured: boolean;
  isBestSeller: boolean | null;
  discount: number | null;
  categories: DbCategory[];
}
