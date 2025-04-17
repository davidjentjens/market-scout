// src/app/data/vendors.ts
import { Vendor } from "../lib/types";

export const vendors: Vendor[] = [
  {
    id: "1",
    name: "Green Valley Organic Farm",
    bio: "Family-owned organic farm specializing in heirloom vegetables and herbs. Farming sustainably since 1995.",
    marketIds: ["1", "2"],
    products: ["1", "2", "3"],
    images: [
      "/images/vendors/green-valley-1.jpg",
      "/images/vendors/green-valley-2.jpg",
    ],
    contact: {
      email: "info@greenvalleyfarm.com",
      website: "www.greenvalleyfarm.com",
      instagram: "@greenvalleyfarm",
    },
    featured: true,
  },
  {
    id: "2",
    name: "Sunshine Bakery",
    bio: "Artisanal bakery creating sourdough breads, pastries, and seasonal treats using locally-sourced ingredients.",
    marketIds: ["1"],
    products: ["4", "5"],
    images: ["/images/vendors/sunshine-bakery-1.jpg"],
    contact: {
      phone: "555-123-4567",
      instagram: "@sunshinebakes",
    },
  },
  {
    id: "3",
    name: "Happy Hen Eggs",
    bio: "Free-range, pasture-raised chickens producing nutritious eggs. Our hens are raised with love and respect.",
    marketIds: ["1", "3"],
    products: ["6"],
    images: ["/images/vendors/happy-hen-1.jpg"],
    contact: {
      email: "eggs@happyhen.com",
    },
  },
  {
    id: "4",
    name: "Wild Meadow Honey",
    bio: "Local, raw honey from sustainably managed hives. Our bees forage on diverse wildflowers resulting in distinctive seasonal varieties.",
    marketIds: ["1"],
    products: ["7"],
    images: ["/images/vendors/wild-meadow-1.jpg"],
    contact: {
      website: "www.wildmeadowhoney.com",
    },
    featured: true,
  },
  {
    id: "5",
    name: "Forest Mushrooms",
    bio: "Specializing in cultivated and foraged mushrooms. We offer a rotating selection of seasonal fungi for culinary adventures.",
    marketIds: ["1", "2"],
    products: ["8", "9"],
    images: ["/images/vendors/forest-mushrooms-1.jpg"],
    contact: {
      instagram: "@forestmushrooms",
    },
  },
];
