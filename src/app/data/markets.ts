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
        date: "2024-03-15",
        marketName: 'Downtown Farmers Market'
      },
      {
        id: "r2",
        marketId: "1",
        userName: "Michael T.",
        rating: 4,
        comment: "Great atmosphere but parking can be challenging.",
        date: "2024-02-28",
        marketName: 'Downtown Farmers Market'
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
        date: "2024-03-20",
        marketName: 'Riverside Farmers Market'
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
        date: "2024-03-10",
        marketName: 'Hillside Community Market'
      },
      {
        id: "r5",
        marketId: "3",
        userName: "Taylor M.",
        rating: 5,
        comment: "The freshest strawberries I've ever had!",
        date: "2024-02-24",
        marketName: 'Hillside Community Market'
      }
    ]
  },
  {
    id: "4",
    name: "Borough Market",
    description: "One of London's oldest and most famous food markets, offering artisanal products, international cuisines, and gourmet ingredients.",
    address: "8 Southwark Street",
    city: "London",
    state: "",
    zip: "SE1 1TL",
    coordinates: { lat: 51.505, lng: -0.090 },
    hours: [
      { day: "Wednesday", open: "10:00", close: "17:00" },
      { day: "Thursday", open: "10:00", close: "17:00" },
      { day: "Friday", open: "10:00", close: "18:00" },
      { day: "Saturday", open: "08:00", close: "17:00" },
    ],
    images: [
      "/images/markets/downtown-1.jpg",
      "/images/markets/riverside-2.jpg"
    ],
    vendorIds: ["20", "21", "22", "23", "24"],
    features: ["Historic Site", "Covered Market", "Gourmet Food", "Cooking Demonstrations"],
    upcoming_events: ["8", "9"],
    reviews: [
      {
        id: "r10",
        marketId: "4",
        userName: "Emma W.",
        rating: 5,
        comment: "A food lover's paradise! The cheese selection is unbelievable.",
        date: "2024-03-25",
        marketName: 'Borough Market'
      },
      {
        id: "r11",
        marketId: "4",
        userName: "James H.",
        rating: 4,
        comment: "Fantastic market but can get extremely crowded on weekends.",
        date: "2024-03-12",
        marketName: 'Borough Market'
      }
    ]
  },
  {
    id: "5",
    name: "Tsukiji Outer Market",
    description: "A bustling food market in Tokyo featuring fresh seafood, traditional Japanese ingredients, and local street food.",
    address: "4-16-2 Tsukiji",
    city: "Tokyo",
    state: "",
    zip: "104-0045",
    coordinates: { lat: 35.665, lng: 139.770 },
    hours: [
      { day: "Monday", open: "09:00", close: "14:00" },
      { day: "Tuesday", open: "09:00", close: "14:00" },
      { day: "Wednesday", open: "09:00", close: "14:00" },
      { day: "Thursday", open: "09:00", close: "14:00" },
      { day: "Friday", open: "09:00", close: "14:00" },
      { day: "Saturday", open: "09:00", close: "14:00" },
    ],
    images: [
      "/images/markets/hillside-1.jpg",
      "/images/markets/downtown-2.jpg"
    ],
    vendorIds: ["25", "26", "27", "28"],
    features: ["Seafood Specialists", "Culinary Tours", "Japanese Knives", "Street Food"],
    upcoming_events: ["10"],
    reviews: [
      {
        id: "r12",
        marketId: "5",
        userName: "Kenji T.",
        rating: 5,
        comment: "The freshest sushi and seafood you'll find anywhere. A must-visit!",
        date: "2024-03-18",
        marketName: 'Tsukiji Outer Market'
      },
      {
        id: "r13",
        marketId: "5",
        userName: "Lisa C.",
        rating: 5,
        comment: "Amazing culinary experience. Go early to avoid crowds!",
        date: "2024-02-27",
        marketName: 'Tsukiji Outer Market'
      }
    ]
  },
  {
    id: "6",
    name: "Mercado de San Miguel",
    description: "A historic covered market in Madrid featuring gourmet tapas, fresh produce, and Spanish delicacies in a stunning iron structure.",
    address: "Plaza de San Miguel",
    city: "Madrid",
    state: "",
    zip: "28005",
    coordinates: { lat: 40.415, lng: -3.709 },
    hours: [
      { day: "Monday", open: "10:00", close: "22:00" },
      { day: "Tuesday", open: "10:00", close: "22:00" },
      { day: "Wednesday", open: "10:00", close: "22:00" },
      { day: "Thursday", open: "10:00", close: "24:00" },
      { day: "Friday", open: "10:00", close: "24:00" },
      { day: "Saturday", open: "10:00", close: "24:00" },
      { day: "Sunday", open: "10:00", close: "22:00" },
    ],
    images: [
      "/images/markets/riverside-1.jpg",
      "/images/markets/downtown-2.jpg"
    ],
    vendorIds: ["29", "30", "31", "32", "33"],
    features: ["Tapas Bars", "Wine Tasting", "Historic Building", "Evening Hours"],
    upcoming_events: ["11", "12"],
    reviews: [
      {
        id: "r14",
        marketId: "6",
        userName: "Sofia G.",
        rating: 5,
        comment: "Beautiful market with incredible variety of Spanish cuisine.",
        date: "2024-03-22",
        marketName: 'Mercado de San Miguel'
      },
      {
        id: "r15",
        marketId: "6",
        userName: "Marco P.",
        rating: 4,
        comment: "Great place to sample Spanish wines and tapas. A bit pricey but worth it.",
        date: "2024-03-05",
        marketName: 'Mercado de San Miguel'
      }
    ]
  },
  {
    id: "7",
    name: "Marrakech Medina Souk",
    description: "A labyrinthine traditional market in Morocco's ancient medina, offering spices, textiles, handicrafts, and authentic Moroccan goods.",
    address: "Jemaa el-Fnaa",
    city: "Marrakech",
    state: "",
    zip: "40000",
    coordinates: { lat: 31.631, lng: -7.989 },
    hours: [
      { day: "Monday", open: "08:00", close: "20:00" },
      { day: "Tuesday", open: "08:00", close: "20:00" },
      { day: "Wednesday", open: "08:00", close: "20:00" },
      { day: "Thursday", open: "08:00", close: "20:00" },
      { day: "Friday", open: "08:00", close: "20:00" },
      { day: "Saturday", open: "08:00", close: "20:00" },
      { day: "Sunday", open: "08:00", close: "20:00" },
    ],
    images: [
      "/images/markets/hillside-1.jpg",
      "/images/markets/riverside-1.jpg"
    ],
    vendorIds: ["34", "35", "36", "37", "38"],
    features: ["Spice Market", "Artisan Crafts", "Carpet Vendors", "Traditional Medicine"],
    upcoming_events: ["13"],
    reviews: [
      {
        id: "r16",
        marketId: "7",
        userName: "Amir H.",
        rating: 5,
        comment: "An incredible sensory experience. The spice markets are a highlight!",
        date: "2024-03-15",
        marketName: 'Marrakech Medina Souk'
      },
      {
        id: "r17",
        marketId: "7",
        userName: "Julia S.",
        rating: 4,
        comment: "Fascinating cultural experience. Be prepared to bargain!",
        date: "2024-02-20",
        marketName: 'Marrakech Medina Souk'
      }
    ]
  },
  {
    id: "8",
    name: "Mercado Municipal de São Paulo",
    description: "Known locally as Mercadão, this historic market features Brazilian specialties, fresh produce, and the famous mortadella sandwich.",
    address: "Rua da Cantareira, 306",
    city: "São Paulo",
    state: "",
    zip: "01024-900",
    coordinates: { lat: -23.542, lng: -46.629 },
    hours: [
      { day: "Monday", open: "06:00", close: "18:00" },
      { day: "Tuesday", open: "06:00", close: "18:00" },
      { day: "Wednesday", open: "06:00", close: "18:00" },
      { day: "Thursday", open: "06:00", close: "18:00" },
      { day: "Friday", open: "06:00", close: "18:00" },
      { day: "Saturday", open: "06:00", close: "18:00" },
      { day: "Sunday", open: "06:00", close: "16:00" },
    ],
    images: [
      "/images/markets/downtown-1.jpg",
      "/images/markets/hillside-1.jpg"
    ],
    vendorIds: ["39", "40", "41", "42"],
    features: ["Historic Building", "Food Court", "Brazilian Specialties", "Fruit Stalls"],
    upcoming_events: ["14", "15"],
    reviews: [
      {
        id: "r18",
        marketId: "8",
        userName: "Rafael C.",
        rating: 5,
        comment: "The mortadella sandwich is legendary for a reason! Amazing market.",
        date: "2024-03-27",
        marketName: 'Mercado Municipal de São Paulo'
      },
      {
        id: "r19",
        marketId: "8",
        userName: "Camila F.",
        rating: 5,
        comment: "Beautiful stained glass and incredible variety of exotic fruits.",
        date: "2024-03-10",
        marketName: 'Mercado Municipal de São Paulo'
      }
    ]
  },
  {
    id: "9",
    name: "Queen Victoria Market",
    description: "Melbourne's iconic open-air market dating back to the 19th century, offering fresh produce, specialty shopping, and cultural events.",
    address: "Queen Street",
    city: "Melbourne",
    state: "VIC",
    zip: "3000",
    coordinates: { lat: -37.807, lng: 144.956 },
    hours: [
      { day: "Tuesday", open: "06:00", close: "14:00" },
      { day: "Thursday", open: "06:00", close: "14:00" },
      { day: "Friday", open: "06:00", close: "17:00" },
      { day: "Saturday", open: "06:00", close: "15:00" },
      { day: "Sunday", open: "09:00", close: "16:00" },
    ],
    images: [
      "/images/markets/riverside-2.jpg",
      "/images/markets/downtown-1.jpg"
    ],
    vendorIds: ["43", "44", "45", "46", "47"],
    features: ["Heritage Site", "Night Market", "Food Tours", "Australian Products"],
    upcoming_events: ["16", "17"],
    reviews: [
      {
        id: "r20",
        marketId: "9",
        userName: "Liam J.",
        rating: 5,
        comment: "The night market in summer is an absolute must-do in Melbourne!",
        date: "2024-03-19",
        marketName: 'Queen Victoria Market'
      },
      {
        id: "r21",
        marketId: "9",
        userName: "Olivia W.",
        rating: 4,
        comment: "Great fresh seafood and produce. Love the historic atmosphere.",
        date: "2024-02-28",
        marketName: 'Queen Victoria Market'
      }
    ]
  }
];