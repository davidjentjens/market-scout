// src/app/data/markets.ts
import { Market } from '../lib/types';

export const markets: Market[] = [
  {
    id: "1",
    name: "Downtown Farmers Market",
    description: "A vibrant market in the heart of downtown, featuring over 50 local vendors offering fresh produce, artisanal goods, and prepared foods.",
    address: "123 Main Street",
    city: "Portland",
    state: "OR",
    zip: "97204",
    coordinates: { lat: 45.522, lng: -122.677 },
    hours: [
      { day: "Saturday", open: "09:00", close: "14:00" },
      { day: "Wednesday", open: "16:00", close: "20:00" },
    ],
    images: [
      "/images/markets/downtown-1.jpg",
      "/images/markets/downtown-2.jpg"
    ],
    vendorIds: ["1", "2", "3", "4", "5"],
    features: ["Parking Available", "EBT Accepted", "Pet Friendly", "Live Music"],
    upcoming_events: ["1", "2"],
    reviews: [
      {
        id: "r1",
        marketId: "1",
        userName: "Sarah J.",
        rating: 5,
        comment: "Love the variety of produce and friendly vendors!",
        date: "2024-03-15"
      },
      {
        id: "r2",
        marketId: "1",
        userName: "Michael T.",
        rating: 4,
        comment: "Great atmosphere but parking can be challenging.",
        date: "2024-02-28"
      }
    ]
  },
  {
    id: "2",
    name: "Riverside Farmers Market",
    description: "Located along the scenic riverfront, this market specializes in organic produce and sustainable farming practices.",
    address: "456 River Road",
    city: "Portland",
    state: "OR",
    zip: "97209",
    coordinates: { lat: 45.531, lng: -122.669 },
    hours: [
      { day: "Sunday", open: "10:00", close: "15:00" },
    ],
    images: [
      "/images/markets/riverside-1.jpg",
      "/images/markets/riverside-2.jpg"
    ],
    vendorIds: ["6", "7", "8"],
    features: ["Waterfront Views", "Organic Focus", "Bike Racks", "Children's Activities"],
    upcoming_events: ["3"],
    reviews: [
      {
        id: "r3",
        marketId: "2",
        userName: "Alex K.",
        rating: 5,
        comment: "The best organic produce in the city!",
        date: "2024-03-20"
      }
    ]
  },
  {
    id: "3",
    name: "Hillside Community Market",
    description: "A community-focused market supporting small-scale local farmers and food artisans from the surrounding countryside.",
    address: "789 Oak Lane",
    city: "Lake Oswego",
    state: "OR",
    zip: "97034",
    coordinates: { lat: 45.421, lng: -122.669 },
    hours: [
      { day: "Saturday", open: "08:00", close: "13:00" },
    ],
    images: [
      "/images/markets/hillside-1.jpg"
    ],
    vendorIds: ["9", "10", "11"],
    features: ["Family Friendly", "Free Parking", "Community Events"],
    upcoming_events: ["4"],
    reviews: [
      {
        id: "r4",
        marketId: "3",
        userName: "Chris P.",
        rating: 4,
        comment: "Great community vibe and excellent variety.",
        date: "2024-03-10"
      },
      {
        id: "r5",
        marketId: "3",
        userName: "Taylor M.",
        rating: 5,
        comment: "The freshest strawberries I've ever had!",
        date: "2024-02-24"
      }
    ]
  }
];