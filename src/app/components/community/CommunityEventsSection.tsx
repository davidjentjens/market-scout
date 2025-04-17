// src/app/components/community/CommunityEventsSection.tsx
"use client";

import { useState } from "react";

import { markets } from "../../data/markets";
import { Event } from "../../lib/types";
import EventCard from "./EventCard";

interface CommunityEventsSectionProps {
  events: Event[];
}

export default function CommunityEventsSection({
  events,
}: CommunityEventsSectionProps) {
  const [filter, setFilter] = useState("all");
  const [displayedEvents, setDisplayedEvents] = useState(events);

  // Filter and sort events
  const filterEvents = (filterType: string) => {
    setFilter(filterType);

    const today = new Date();
    let filteredEvents = [...events]; // Create a copy of all events

    if (filterType === "upcoming") {
      filteredEvents = events.filter((event) => new Date(event.date) >= today);
    } else if (filterType === "past") {
      filteredEvents = events.filter((event) => new Date(event.date) < today);
    }

    // Sort events by date (upcoming first for 'upcoming', past first for 'past')
    const sortedEvents = filteredEvents.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return filterType === "past"
        ? dateB - dateA // Most recent past events first
        : dateA - dateB; // Upcoming events in chronological order
    });

    setDisplayedEvents(sortedEvents);
  };

  // Handle add to calendar
  const handleAddToCalendar = async (event: Event) => {
    // Dynamic import to avoid SSR issues
    const { atcb_action } = await import("add-to-calendar-button");

    const eventDate = new Date(event.date);
    const market = markets.find((m) => m.id === event.marketId);

    // Parse times properly
    const [startTimeStr, endTimeStr] = event.time.split(" - ");

    // Convert to 24-hour format
    const formatTimeFor24Hour = (timeStr: string) => {
      const match = timeStr.match(/(\d+):(\d+)\s+(AM|PM)/i);
      if (!match) return null;

      let hours = parseInt(match[1], 10);
      const minutes = match[2];
      const period = match[3].toUpperCase();

      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      return `${hours.toString().padStart(2, "0")}:${minutes}`;
    };

    const startTime = formatTimeFor24Hour(startTimeStr);
    const endTime = formatTimeFor24Hour(endTimeStr);

    if (!startTime || !endTime || !market) {
      console.error("Invalid data for calendar event");
      return;
    }

    await atcb_action({
      name: event.title,
      description: event.description,
      location: `${market.name}, ${market.address}, ${market.city}, ${market.state}`,
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
      timeZone: "America/Sao_Paulo",
      iCalFileName: event.title.replace(/\s+/g, "-").toLowerCase(),
    });
  };

  return (
    <section id="events" className="scroll-reveal mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-3xl font-bold text-primary-800">
          Market Events
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => filterEvents("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:bg-primary-50"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => filterEvents("upcoming")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "upcoming"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:bg-primary-50"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => filterEvents("past")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "past"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:bg-primary-50"
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {displayedEvents.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">
            No events found for the selected filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event, index) => (
            <div
              key={event.id}
              className={`scroll-reveal-item ${index % 3 === 0 ? "" : index % 3 === 1 ? "delay-1" : "delay-2"}`}
            >
              <EventCard
                event={event}
                market={markets.find((m) => m.id === event.marketId)!}
                onAddToCalendar={() => handleAddToCalendar(event)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
