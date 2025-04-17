// src/app/components/map/MarkerPopup.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Market } from "../../lib/types";

interface MarkerPopupProps {
  market: Market;
}

const MarkerPopup: React.FC<MarkerPopupProps> = ({ market }) => {
  // Function to get the current day's hours
  const getTodayHours = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = days[new Date().getDay()];

    const todayHours = market.hours.find((h) => h.day === today);

    if (!todayHours) return "Closed today";
    if (todayHours.isClosed) return "Closed today";

    return `Open today: ${todayHours.open} - ${todayHours.close}`;
  };

  // Handle next open day if not open today
  const getNextOpenDay = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();

    // Check if closed today
    const todayHours = market.hours.find((h) => h.day === days[today]);
    if (todayHours && !todayHours.isClosed) return null;

    // Find next open day
    for (let i = 1; i <= 7; i++) {
      const nextDay = (today + i) % 7;
      const nextDayHours = market.hours.find((h) => h.day === days[nextDay]);
      if (nextDayHours && !nextDayHours.isClosed) {
        return `Next open: ${days[nextDay]} ${nextDayHours.open} - ${nextDayHours.close}`;
      }
    }

    return "No upcoming hours found";
  };

  const nextOpen = getNextOpenDay();

  return (
    <div className="market-popup w-64">
      <div className="relative h-32 w-full mb-3 rounded overflow-hidden">
        <Image
          src={market.images[0] || "/images/markets/default.jpg"}
          alt={market.name}
          className="object-cover w-full h-full"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="font-display text-lg font-bold mb-1 text-primary-700">
        {market.name}
      </h3>
      <p className="text-gray-600 text-xs mb-2">
        {market.address}, {market.city}, {market.state}
      </p>

      <p
        className={`text-sm font-medium mb-1 ${
          getTodayHours().includes("Closed")
            ? "text-earth-700"
            : "text-primary-600"
        }`}
      >
        {getTodayHours()}
      </p>

      {nextOpen && <p className="text-xs text-earth-600 mb-2">{nextOpen}</p>}

      <div className="flex flex-wrap gap-1 mb-3">
        {market.features.slice(0, 3).map((feature, index) => (
          <span
            key={index}
            className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full"
          >
            {feature}
          </span>
        ))}
        {market.features.length > 3 && (
          <span className="text-gray-500 text-xs">
            +{market.features.length - 3} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200">
        <span className="text-xs text-gray-500">
          {market.vendorIds.length} vendors
        </span>
        <Link
          href={`/markets/${market.id}`}
          className="text-sm text-primary-600 font-medium hover:text-primary-800 hover:underline flex items-center"
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MarkerPopup;
