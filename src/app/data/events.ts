// src/app/data/events.ts
import { Event } from '../lib/types';

export const events: Event[] = [
  {
    id: "1",
    title: "Spring Planting Workshop",
    description: "Learn tips and techniques for starting your spring garden from local master gardeners.",
    marketId: "1",
    date: "2025-04-20",
    time: "10:00 AM - 12:00 PM",
    image: "/images/events/gardening-workshop.jpg"
  },
  {
    id: "2",
    title: "Cooking Demonstration: Spring Vegetables",
    description: "Local chef demonstrates seasonal recipes featuring early spring produce.",
    marketId: "1",
    date: "2025-04-27",
    time: "11:00 AM - 01:00 PM",
    image: "/images/events/cooking-demo.jpg"
  },
  {
    id: "3",
    title: "Kids' Farm Day",
    description: "Interactive activities for children to learn about farming, including seed planting and farm animal visits.",
    marketId: "2",
    date: "2025-05-05",
    time: "10:00 AM - 2:00 PM",
    image: "/images/events/kids-farm-day.jpg"
  },
  {
    id: "4",
    title: "Community Seed Swap",
    description: "Bring your extra seeds to trade with other gardeners and discover new varieties.",
    marketId: "3",
    date: "2025-04-13",
    time: "9:00 AM - 11:00 AM",
    image: "/images/events/seed-swap.jpg"
  }
];