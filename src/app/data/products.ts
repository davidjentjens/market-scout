// src/app/data/products.ts
import { Product } from '../lib/types';

export const products: Product[] = [
  {
    id: "1",
    name: "Heirloom Tomatoes",
    description: "Variety of colorful, flavorful heirloom tomatoes grown without synthetic fertilizers or pesticides.",
    category: "vegetable",
    seasonality: ["July", "August", "September", "October"],
    price: "$4.50/lb",
    image: "/images/products/heirloom-tomatoes.jpg",
    organic: true,
    vendorId: "1"
  },
  {
    id: "2",
    name: "Kale Bunch",
    description: "Fresh, nutrient-dense kale. Great for salads, smoothies, or sautéed as a side dish.",
    category: "vegetable",
    seasonality: ["June", "July", "August", "September", "October", "November"],
    price: "$3/bunch",
    image: "/images/products/kale.jpg",
    organic: true,
    vendorId: "1"
  },
  {
    id: "3",
    name: "Fresh Herbs",
    description: "Culinary herbs including basil, parsley, cilantro, and mint. Add flavor to any dish!",
    category: "vegetable",
    seasonality: ["May", "June", "July", "August", "September"],
    price: "$2.50/bunch",
    image: "/images/products/fresh-herbs.jpg",
    organic: true,
    vendorId: "1"
  },
  {
    id: "4",
    name: "Sourdough Bread",
    description: "Naturally leavened sourdough bread made with organic flour and a starter that's been maintained for over 10 years.",
    category: "bakery",
    seasonality: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    price: "$7/loaf",
    image: "/images/products/sourdough.jpg",
    organic: true,
    vendorId: "2"
  },
  {
    id: "5",
    name: "Seasonal Fruit Pie",
    description: "Handmade pie featuring seasonal fruits. Flaky butter crust with local fruit fillings.",
    category: "bakery",
    seasonality: ["March", "April", "May", "June", "July", "August", "September", "October", "November"],
    price: "$18/pie",
    image: "/images/products/fruit-pie.jpg",
    organic: false,
    vendorId: "2"
  },
  {
    id: "6",
    name: "Farm Fresh Eggs",
    description: "Free-range eggs from hens raised on pasture with natural supplements. Rich, orange yolks and superior flavor.",
    category: "dairy",
    seasonality: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    price: "$6/dozen",
    image: "/images/products/farm-eggs.jpg",
    organic: true,
    vendorId: "3"
  },
  {
    id: "7",
    name: "Wildflower Honey",
    description: "Raw, unfiltered honey collected from hives placed in diverse wildflower meadows. Never heated or processed.",
    category: "specialty",
    seasonality: ["June", "July", "August", "September", "October"],
    price: "$12/jar",
    image: "/images/products/wildflower-honey.jpg",
    organic: true,
    vendorId: "4"
  },
  {
    id: "8",
    name: "Shiitake Mushrooms",
    description: "Cultivated shiitake mushrooms with rich, earthy flavor. Excellent for stir-fries, soups, and sauces.",
    category: "vegetable",
    seasonality: ["April", "May", "June", "July", "August", "September", "October"],
    price: "$8/half-pound",
    image: "/images/products/shiitake.jpg",
    organic: true,
    vendorId: "5"
  },
  {
    id: "9",
    name: "Seasonal Foraged Mushrooms",
    description: "Wild foraged mushrooms that vary by season, including chanterelles, morels, and lobster mushrooms.",
    category: "vegetable",
    seasonality: ["March", "April", "May", "September", "October", "November"],
    price: "Market price",
    image: "/images/products/foraged-mushrooms.jpg",
    organic: true,
    vendorId: "5"
  }
];