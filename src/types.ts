export type SpiceLevel = 0 | 1 | 2 | 3;

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'signature' | 'starters' | 'mains' | 'biryani' | 'breads' | 'desserts' | 'beverages';
  price: number;
  description: string;
  editorialStory?: string;
  ingredients: string[];
  allergens: string[];
  spiceLevel: SpiceLevel;
  isVegetarian: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSignature?: boolean;
  isChefsSelection?: boolean;
  chefQuote?: string;
  calories?: string;
  serves: string;
  prepTime?: string;
  floatingSpecs?: string[];
  image: string;
  accentHue?: string;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  instructions?: string;
}

export interface RestaurantInfo {
  name: string;
  monogram: string;
  tagline: string;
  location: string;
  fullAddress: string;
  googleMapsUrl: string;
  googleReviewUrl: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  displayWhatsApp: string;
  instagramUrl: string;
  instagramHandle: string;
  currency: string;
  currencySymbol: string;
  lunchHours: string;
  dinnerHours: string;
  daysOpen: string;
  chefName: string;
  chefTitle: string;
  qualityPillars: {
    title: string;
    description: string;
  }[];
  reviews: {
    quote: string;
    publication: string;
    author: string;
    rating?: string;
  }[];
}
