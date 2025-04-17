// src/app/calendar/page.tsx
import React from "react";

import SeasonalCalendar from "../components/calendar/SeasonalCalendar";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-earth-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl mx-auto font-bold text-primary-800 mb-6">
          Seasonal Produce Guide
        </h1>

        <div className="max-w-3xl mb-8">
          <p className="text-lg text-gray-700">
            Discover what&apos;s freshest each month at your local farmers
            markets. Eating seasonally means enjoying produce at its peak
            flavor, nutritional value, and affordability while supporting local
            farmers.
          </p>
        </div>

        <div className="mb-12">
          <SeasonalCalendar />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Benefits of Eating Seasonally
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2 text-primary-800">
                Better Flavor
              </h3>
              <p>
                Seasonal produce is harvested at peak ripeness, resulting in
                better flavor and texture than out-of-season alternatives.
              </p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2 text-primary-800">
                More Nutritious
              </h3>
              <p>
                Fruits and vegetables consumed in-season tend to be more
                nutritionally dense than those grown out of season.
              </p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2 text-primary-800">
                Environmentally Friendly
              </h3>
              <p>
                Seasonal eating reduces the need for long-distance
                transportation and energy-intensive growing methods.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="font-display text-2xl font-bold mb-4">
            Seasonal Eating Tips
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-bold">
                  Plan your meals around what&apos;s in season
                </h3>
                <p className="text-gray-600">
                  Check what&apos;s available locally before planning your
                  weekly meals.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-bold">Preserve seasonal abundance</h3>
                <p className="text-gray-600">
                  Learn simple preservation techniques like freezing, canning,
                  and fermenting to enjoy seasonal produce year-round.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-bold">Talk to your farmers</h3>
                <p className="text-gray-600">
                  Ask for preparation tips and recipe ideas from the people who
                  grow your food.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
