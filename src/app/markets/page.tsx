// src/app/markets/page.tsx
"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { markets } from "../data/markets";
import { Market } from "../lib/types";

// Dynamically import the map component to prevent SSR issues with Leaflet
const DynamicMapView = dynamic(() => import("../components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-earth-100 rounded-lg flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function MarketsPage() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMarkets, setFilteredMarkets] = useState<Market[]>(markets);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Filter markets based on search term
  useEffect(() => {
    const filtered = markets.filter(
      (market) =>
        market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.state.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredMarkets(filtered);
  }, [searchTerm]);

  // Get user's location if permitted
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Unable to get your location. Please try searching instead.");
        },
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  // Handle marker click
  const handleMarkerClick = (market: Market) => {
    setSelectedMarket(market);
    // Scroll to market details on mobile
    if (window.innerWidth < 768) {
      const element = document.getElementById("market-details");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-earth-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl font-bold text-primary-800 mb-8">
          Find Local Farmers Markets
        </h1>

        {/* Search and filter section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search markets by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                label="Search Markets"
                noMargin
              />
            </div>
            <Button
              onClick={handleGetLocation}
              variant="outline"
              className="whitespace-nowrap"
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                Use My Location
              </span>
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Found {filteredMarkets.length} market
            {filteredMarkets.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market listings for mobile and sidebar for desktop */}
          <div className="lg:order-2 lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-md h-[600px] overflow-y-auto">
              <h2 className="font-display text-2xl font-bold mb-4">
                Market Listings
              </h2>

              {filteredMarkets.length === 0 ? (
                <p className="text-gray-500">
                  No markets found matching your search.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredMarkets.map((market) => (
                    <div
                      key={market.id}
                      className={`cursor-pointer transition-all duration-300 border-l-4 ${
                        selectedMarket?.id === market.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-transparent hover:border-primary-200 hover:bg-earth-50"
                      }`}
                      onClick={() => handleMarkerClick(market)}
                    >
                      <div className="p-3">
                        <h3 className="font-display font-bold text-lg">
                          {market.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {market.city}, {market.state}
                        </p>
                        <p className="text-xs mt-1">
                          {market.hours[0]?.day}: {market.hours[0]?.open} -{" "}
                          {market.hours[0]?.close}
                          {market.hours.length > 1 && " (+ more days)"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Map section */}
          <div className="lg:order-1 lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="h-[600px] rounded-lg overflow-hidden">
                <DynamicMapView
                  markets={filteredMarkets}
                  selectedMarket={selectedMarket}
                  onMarkerClick={handleMarkerClick}
                  userLocation={userLocation}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Selected market details section (shown when a market is selected) */}
        {selectedMarket && (
          <div
            id="market-details"
            className="mt-8 bg-white p-6 rounded-lg shadow-md animate-fade-in"
          >
            <h2 className="font-display text-3xl font-bold mb-4">
              {selectedMarket.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  {selectedMarket.description}
                </p>
                <div className="mb-4">
                  <h3 className="font-display text-xl font-bold mb-2">
                    Location
                  </h3>
                  <p>{selectedMarket.address}</p>
                  <p>
                    {selectedMarket.city}, {selectedMarket.state}{" "}
                    {selectedMarket.zip}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="font-display text-xl font-bold mb-2">
                    Market Hours
                  </h3>
                  <ul className="space-y-1">
                    {selectedMarket.hours.map((hours, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="font-medium">{hours.day}:</span>
                        <span>
                          {hours.open} - {hours.close}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMarket.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  {selectedMarket.images[0] ? (
                    <Image
                      src={selectedMarket.images[0]}
                      alt={selectedMarket.name}
                      className="w-full h-full object-cover"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-earth-200 flex items-center justify-center">
                      <span className="text-earth-600">No image available</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    Reviews
                  </h3>
                  {selectedMarket.reviews &&
                  selectedMarket.reviews.length > 0 ? (
                    <div className="space-y-3">
                      {selectedMarket.reviews.slice(0, 2).map((review) => (
                        <div
                          key={review.id}
                          className="bg-earth-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">
                              {review.userName}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill={
                                    i < review.rating ? "currentColor" : "none"
                                  }
                                  stroke="currentColor"
                                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                  />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No reviews yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
