// src/app/lib/types.ts

// Market data model
export interface Market {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    coordinates: { lat: number; lng: number };
    hours: OperatingHours[];
    images: string[];
    vendorIds: string[];
    features: string[]; // e.g., "parking", "EBT accepted"
    upcoming_events: string[]; // Event IDs
    reviews: Review[];
  }
  
  export interface OperatingHours {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    open: string; // Format: "09:00"
    close: string; // Format: "14:00"
    isClosed?: boolean;
  }
  
  // Vendor data model
  export interface Vendor {
    id: string;
    name: string;
    bio: string;
    marketIds: string[];
    products: string[]; // Product IDs
    images: string[];
    contact?: {
      phone?: string;
      email?: string;
      website?: string;
      instagram?: string;
    };
    featured?: boolean;
  }
  
  // Product/Produce data model
  export interface Product {
    id: string;
    name: string;
    description: string;
    category: 'vegetable' | 'fruit' | 'dairy' | 'meat' | 'bakery' | 'specialty' | 'prepared';
    seasonality: Month[];
    price?: string; // Optional price info
    image: string;
    organic: boolean;
    vendorId: string;
  }
  
  export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 
                     'July' | 'August' | 'September' | 'October' | 'November' | 'December';
  
  // Event data model
  export interface Event {
    id: string;
    title: string;
    description: string;
    marketId: string;
    date: string; // ISO format
    time: string; // e.g., "10:00 AM - 2:00 PM"
    image?: string;
  }
  
  // Review data model
  export interface Review {
    id: string;
    marketId: string;
    marketName: string;
    userName: string;
    rating: number; // 1-5
    comment: string;
    date: string; // ISO format
  }