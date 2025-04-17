// src/app/components/calendar/SeasonalCalendar.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { products } from "../../data/products";
import { Month, Product } from "../../lib/types";
import MonthSelector from "./MonthSelector";

interface SeasonalCalendarProps {
  className?: string;
}

// Group products by seasonality
const groupProductsByMonth = (products: Product[]) => {
  const months: Month[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const productsByMonth: Record<Month, Product[]> = {} as Record<
    Month,
    Product[]
  >;

  // Initialize each month with empty array
  months.forEach((month) => {
    productsByMonth[month as Month] = [];
  });

  // Add products to each month they're in season
  products.forEach((product) => {
    product.seasonality.forEach((month) => {
      productsByMonth[month].push(product);
    });
  });

  return productsByMonth;
};

// Get current month name
const getCurrentMonth = (): Month => {
  const months: Month[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = new Date().getMonth();
  return months[currentMonth];
};

const SeasonalCalendar: React.FC<SeasonalCalendarProps> = ({
  className = "",
}) => {
  const [selectedMonth, setSelectedMonth] = useState<Month>(getCurrentMonth());
  const [productsByMonth, setProductsByMonth] = useState<
    Record<Month, Product[]>
  >({} as Record<Month, Product[]>);
  const [isLoaded, setIsLoaded] = useState(false);

  // Group products by month on component mount
  useEffect(() => {
    setProductsByMonth(groupProductsByMonth(products));
    setIsLoaded(true);
  }, []);

  // Get category counts for the selected month
  const getCategoryCounts = () => {
    const categoryCounts: Record<string, number> = {};

    if (!productsByMonth[selectedMonth]) return categoryCounts;

    productsByMonth[selectedMonth].forEach((product) => {
      if (categoryCounts[product.category]) {
        categoryCounts[product.category]++;
      } else {
        categoryCounts[product.category] = 1;
      }
    });

    return categoryCounts;
  };

  // Get category display name with proper capitalization
  const getCategoryDisplayName = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Get icon for each category
  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case "vegetable":
        return "/icons/vegetable.png";
      case "fruit":
        return "/icons/apple.png";
      case "dairy":
        return "/icons/dairy.png";
      case "meat":
        return "/icons/meat.png";
      case "bakery":
        return "/icons/bread.png";
      case "specialty":
        return "/icons/honey.png";
      case "prepared":
        return "/icons/chef.png";
      default:
        return "/icons/tomato.svg";
    }
  };

  const handleMonthChange = (month: Month) => {
    setSelectedMonth(month);
  };

  if (!isLoaded) {
    return (
      <div className="p-8 text-center">Loading seasonal information...</div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {/* Month Selector */}
      <MonthSelector
        currentMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />

      {/* Category Overview */}
      <div className="p-6 border-b border-earth-200">
        <h3 className="font-display text-xl font-bold mb-4">
          In Season This Month
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(getCategoryCounts()).map(([category, count]) => (
            <div
              key={category}
              className="flex items-center p-3 rounded-lg bg-earth-50 hover:bg-earth-100 transition"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <Image
                  src={getCategoryIcon(category)}
                  alt={category}
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p className="font-medium">
                  {getCategoryDisplayName(category)}
                </p>
                <p className="text-sm text-gray-600">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold">
            {selectedMonth} Produce
          </h3>
          <div className="text-sm bg-primary-50 text-primary-800 px-3 py-1 rounded-full">
            {productsByMonth[selectedMonth].length} items
          </div>
        </div>

        {productsByMonth[selectedMonth].length === 0 ? (
          <div className="text-center py-12 bg-earth-50 rounded-lg">
            <p className="text-gray-500">
              No products in season for {selectedMonth}.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Try selecting a different month.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsByMonth[selectedMonth].map((product) => (
              <div
                key={product.id}
                className="bg-white border border-earth-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.organic && (
                    <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                      Organic
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-display text-lg font-bold mb-1">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-700 font-medium">
                      {product.price}
                    </span>
                    <span className="text-xs bg-earth-100 text-earth-700 px-2 py-1 rounded-full capitalize">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seasonal Tips */}
      <div className="bg-primary-50 p-6">
        <h3 className="font-display text-xl font-bold mb-4">Seasonal Tips</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium text-lg mb-2">
            Making the Most of {selectedMonth} Produce
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary-600 mr-2 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Shop early in the day for the freshest selection</span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary-600 mr-2 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Ask vendors for storage and preparation tips</span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary-600 mr-2 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Try preserving extra produce through freezing, canning, or
                drying
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeasonalCalendar;
