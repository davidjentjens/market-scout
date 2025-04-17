// src/app/markets/[id]/page.tsx
"use client";

import { atcb_action } from "add-to-calendar-button";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { events } from "../../data/events";
import { markets } from "../../data/markets";
import { vendors } from "../../data/vendors";
import { Event, Market, Vendor } from "../../lib/types";

// Dynamically import the map component to prevent SSR issues with Leaflet
const DynamicMapView = dynamic(() => import("../../components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-earth-100 rounded-lg flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function MarketDetailPage() {
  const params = useParams();
  const [market, setMarket] = useState<Market | null>(null);
  const [marketVendors, setMarketVendors] = useState<Vendor[]>([]);
  const [marketEvents, setMarketEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<"details" | "vendors" | "events">(
    "details",
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAddToCalendar = async (event: Event) => {
    const eventDate = new Date(event.date);

    // Parse times properly
    const [startTimeStr, endTimeStr] = event.time.split(" - ");

    // Convert to 24-hour format required by the library (HH:MM)
    const formatTimeFor24Hour = (timeStr: string) => {
      // Extract hours and minutes
      const match = timeStr.match(/(\d+):(\d+)\s+(AM|PM)/i);
      if (!match) return null;

      let hours = parseInt(match[1], 10);
      const minutes = match[2];
      const period = match[3].toUpperCase();

      // Convert to 24-hour format
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      // Format with leading zeros
      return `${hours.toString().padStart(2, "0")}:${minutes}`;
    };

    const startTime = formatTimeFor24Hour(startTimeStr);
    const endTime = formatTimeFor24Hour(endTimeStr);

    if (!startTime || !endTime) {
      console.error("Invalid time format");
      return;
    }

    await atcb_action({
      name: event.title,
      description: event.description,
      location: `${market?.name}, ${market?.address}, ${market?.city}, ${market?.state}`,
      startDate: eventDate.toISOString().split("T")[0],
      endDate: eventDate.toISOString().split("T")[0],
      startTime: startTime,
      endTime: endTime,
      options: [
        "Apple",
        "Google",
        "iCal",
        "Microsoft365",
        "Outlook.com",
        "Yahoo",
      ],
      timeZone: "America/Sao_Paulo", // Use the user's timezone
      iCalFileName: event.title.replace(/\s+/g, "-").toLowerCase(),
    });
  };

  useEffect(() => {
    // Find the market by ID
    const marketId = params.id as string;
    const foundMarket = markets.find((m) => m.id === marketId) || null;
    setMarket(foundMarket);

    if (foundMarket) {
      // Get market's vendors
      const marketVends = vendors.filter((v) =>
        foundMarket.vendorIds.includes(v.id),
      );
      setMarketVendors(marketVends);

      // Get market's events
      const marketEvts = events.filter((e) => e.marketId === foundMarket.id);
      setMarketEvents(marketEvts);
    }
  }, [params.id]);

  // Format date for events
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Handle image carousel navigation
  const goToNextImage = () => {
    if (!market || isTransitioning || market.images.length <= 1) return;

    setIsTransitioning(true);
    const nextIndex =
      currentImageIndex === market.images.length - 1
        ? 0
        : currentImageIndex + 1;
    setCurrentImageIndex(nextIndex);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const goToPrevImage = () => {
    if (!market || isTransitioning || market.images.length <= 1) return;

    setIsTransitioning(true);
    const prevIndex =
      currentImageIndex === 0
        ? market.images.length - 1
        : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const goToImage = (index: number) => {
    if (!market || isTransitioning || index === currentImageIndex) return;

    setIsTransitioning(true);
    setCurrentImageIndex(index);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  // Handle touch events for mobile swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Required swipe distance in px to trigger navigation
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextImage();
    }

    if (isRightSwipe) {
      goToPrevImage();
    }
  };

  if (!market) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="font-display text-3xl font-bold text-center">
              Market not found
            </h2>
            <p className="text-center mt-4">
              <Link
                href="/markets"
                className="text-primary-600 hover:text-primary-800 cursor-pointer"
              >
                View all markets
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50 py-12">
      <div className="container mx-auto px-4">
        {/* Market Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="font-display text-4xl font-bold mb-4 text-primary-800">
                {market.name}
              </h1>
              <p className="text-gray-700 mb-6">{market.description}</p>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                {market.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="font-display text-xl font-bold mb-3 text-primary-700">
                    Location
                  </h2>
                  <p className="flex items-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {market.address}
                  </p>
                  <p className="ml-7 mb-4">
                    {market.city}, {market.state} {market.zip}
                  </p>

                  <Link
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${market.address}, ${market.city}, ${market.state} ${market.zip}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-7 text-primary-600 font-medium hover:text-primary-800 hover:underline inline-flex items-center cursor-pointer"
                  >
                    Get Directions
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
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </Link>
                </div>

                <div>
                  <h2 className="font-display text-xl font-bold mb-3 text-primary-700">
                    Hours
                  </h2>
                  <div className="bg-earth-50 p-3 rounded-lg">
                    <ul className="space-y-2">
                      {market.hours.map((hour, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="font-medium">{hour.day}:</span>
                          <span>
                            {hour.isClosed
                              ? "Closed"
                              : `${hour.open} - ${hour.close}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Image Carousel */}
              {market.images.length > 0 ? (
                <div
                  className="relative h-64 lg:h-80 w-full rounded-lg overflow-hidden cursor-pointer"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <div className="carousel-container relative w-full h-full">
                    {market.images.map((image, index) => (
                      <div
                        key={index}
                        className={`carousel-slide absolute top-0 left-0 w-full h-full transition-opacity duration-400 ease-in-out ${
                          index === currentImageIndex
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0"
                        }`}
                      >
                        <Image
                          src={image || "/images/markets/default.jpg"}
                          alt={`${market.name} - Photo ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0}
                        />
                      </div>
                    ))}

                    {/* Navigation Arrows - Only show if more than one image */}
                    {market.images.length > 1 && (
                      <>
                        <button
                          onClick={goToPrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 z-20 cursor-pointer"
                          aria-label="Previous image"
                          disabled={isTransitioning}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={goToNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 z-20 cursor-pointer"
                          aria-label="Next image"
                          disabled={isTransitioning}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Mobile instructions - only visible on touch devices */}
                    {market.images.length > 1 && (
                      <div className="absolute bottom-2 left-0 right-0 text-center text-white text-xs bg-black/30 py-1 md:hidden z-20">
                        Swipe to see more photos
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative h-64 lg:h-80 w-full rounded-lg overflow-hidden bg-earth-200 flex items-center justify-center">
                  <span className="text-earth-600">No images available</span>
                </div>
              )}

              {/* Indicator Dots */}
              {market.images.length > 1 && (
                <div className="flex justify-center mt-3 space-x-2">
                  {market.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                        index === currentImageIndex
                          ? "bg-primary-600"
                          : "bg-gray-300 hover:bg-primary-300"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                      disabled={isTransitioning}
                      aria-current={
                        index === currentImageIndex ? "true" : "false"
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-6 font-medium text-center transition-colors cursor-pointer ${
                activeTab === "details"
                  ? "text-primary-700 border-b-2 border-primary-500"
                  : "text-gray-600 hover:text-primary-600"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Market Details
            </button>
            <button
              className={`flex-1 py-4 px-6 font-medium text-center transition-colors cursor-pointer ${
                activeTab === "vendors"
                  ? "text-primary-700 border-b-2 border-primary-500"
                  : "text-gray-600 hover:text-primary-600"
              }`}
              onClick={() => setActiveTab("vendors")}
            >
              Vendors{" "}
              <span className="ml-1 text-sm">({marketVendors.length})</span>
            </button>
            <button
              className={`flex-1 py-4 px-6 font-medium text-center transition-colors cursor-pointer ${
                activeTab === "events"
                  ? "text-primary-700 border-b-2 border-primary-500"
                  : "text-gray-600 hover:text-primary-600"
              }`}
              onClick={() => setActiveTab("events")}
            >
              Events{" "}
              <span className="ml-1 text-sm">({marketEvents.length})</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Market Details Tab */}
            {activeTab === "details" && (
              <div>
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-bold mb-4">
                    Market Map
                  </h2>
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <DynamicMapView
                      markets={[market]}
                      selectedMarket={market}
                      onMarkerClick={() => {}}
                    />
                  </div>
                </div>

                {market.reviews && market.reviews.length > 0 && (
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold mb-4">
                      Customer Reviews
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {market.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-earth-50 p-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-white border border-transparent hover:border-primary-100 relative overflow-hidden group"
                        >
                          {/* Shiny animated highlight effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/30 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"></div>

                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">{review.userName}</span>
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
                          <p className="text-gray-700">{review.comment}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-600 text-xs font-medium">
                              Helpful review
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="font-display text-2xl font-bold mb-4">
                    Shopping Tips
                  </h2>
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
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
                          Bring your own bags to reduce waste and make carrying
                          purchases easier.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
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
                          Arrive early for the best selection, especially for
                          popular seasonal items.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
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
                          Bring small bills and change to make transactions
                          easier for vendors.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
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
                          Don&apos;t be afraid to ask vendors about their
                          growing practices and for cooking tips.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Vendors Tab */}
            {activeTab === "vendors" && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">
                  Vendors at this Market
                </h2>

                {marketVendors.length === 0 ? (
                  <p className="text-gray-600">
                    No vendor information available for this market.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketVendors.map((vendor) => (
                      <Link
                        href={`/vendors/${vendor.id}`}
                        key={vendor.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
                      >
                        <div className="relative h-40">
                          <Image
                            src={
                              vendor.images[0] || "/images/vendors/default.jpg"
                            }
                            alt={vendor.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {vendor.featured && (
                            <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                              Featured
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-display text-lg font-bold mb-1 group-hover:text-primary-600 transition-colors">
                            {vendor.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {vendor.bio}
                          </p>
                          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <span className="text-sm text-earth-700">
                              {vendor.products.length} products
                            </span>
                            <span className="text-primary-600 text-sm font-medium group-hover:underline">
                              View Profile →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">
                  Upcoming Events
                </h2>

                {marketEvents.length === 0 ? (
                  <p className="text-gray-600">
                    No upcoming events scheduled for this market.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {marketEvents.map((event) => (
                      <div
                        key={event.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row cursor-pointer"
                      >
                        <div className="relative h-48 md:h-auto md:w-1/3">
                          <Image
                            src={event.image || "/images/events/default.jpg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="p-4 md:w-2/3 flex flex-col">
                          <div className="mb-2">
                            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                              {formatEventDate(event.date)}
                            </span>
                            <span className="ml-2 text-sm text-gray-600">
                              {event.time}
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-bold mb-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 flex-grow">
                            {event.description}
                          </p>
                          <div className="mt-4 pt-2 border-t border-gray-100">
                            <button
                              onClick={() => handleAddToCalendar(event)}
                              className="text-primary-600 font-medium hover:text-primary-800 hover:underline cursor-pointer"
                            >
                              Add to Calendar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
