// src/app/community/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { markets } from '../data/markets';
import { events } from '../data/events';
import { Event, Review } from '../lib/types';
import dynamic from 'next/dynamic';
import { atcb_action } from 'add-to-calendar-button';

// Components imported dynamically to avoid SSR issues
const ReviewCard = dynamic(() => import('../components/community/ReviewCard'), { ssr: false });
const EventCard = dynamic(() => import('../components/community/EventCard'), { ssr: false });

export default function CommunityPage() {
  const [allEvents, setAllEvents] = useState<Event[]>(events);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState('all');
  
  // Initialize data
  useEffect(() => {
    // Get all events
    setAllEvents(events);
    
    // Get all reviews from markets
    const reviews = markets.reduce((acc, market) => {
      if (market.reviews && market.reviews.length > 0) {
        // Add market name to each review for display purposes
        const marketReviews = market.reviews.map(review => ({
          ...review,
          marketName: market.name
        }));
        return [...acc, ...marketReviews];
      }
      return acc;
    }, [] as Review[]);
    
    // Sort reviews by date (newest first)
    const sortedReviews = reviews.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setAllReviews(sortedReviews);
  }, []);
  
  // Handle add to calendar
  const handleAddToCalendar = async (event: Event) => {
    const eventDate = new Date(event.date);
    const market = markets.find(m => m.id === event.marketId);
    
    // Parse times properly
    const [startTimeStr, endTimeStr] = event.time.split(' - ');
    
    // Convert to 24-hour format
    const formatTimeFor24Hour = (timeStr: string) => {
      const match = timeStr.match(/(\d+):(\d+)\s+(AM|PM)/i);
      if (!match) return null;
      
      let hours = parseInt(match[1], 10);
      const minutes = match[2];
      const period = match[3].toUpperCase();
      
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      return `${hours.toString().padStart(2, '0')}:${minutes}`;
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
      startDate: eventDate.toISOString().split('T')[0],
      endDate: eventDate.toISOString().split('T')[0],
      startTime: startTime,
      endTime: endTime,
      options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
      timeZone: "America/Sao_Paulo",
      iCalFileName: event.title.replace(/\s+/g, '-').toLowerCase(),
    });
  };
  
  // Filter events by upcoming/past
  const filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    
    if (filter === 'upcoming') {
      return eventDate >= today;
    } else if (filter === 'past') {
      return eventDate < today;
    }
    
    return true; // 'all' filter
  });
  
  // Sort events by date (upcoming first)
  const sortedEvents = filteredEvents.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="min-h-screen bg-earth-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="bg-primary-600 rounded-xl shadow-lg mb-12 overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="/images/community-pattern.jpg" 
              alt="Background pattern" 
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Community</h1>
              <p className="text-lg md:text-xl mb-6 animate-fade-in-delay-1">
                Join our vibrant community of market-goers, farmers, and food enthusiasts. 
                Discover upcoming events, share your experiences, and connect with local food producers.
              </p>
              <div className="animate-fade-in-delay-2">
                <Link href="#events" className="btn btn-secondary">
                  Browse Events
                </Link>
                <Link href="#reviews" className="btn btn-outline bg-white/20 hover:bg-white/30 text-white ml-4">
                  See Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Events Section */}
        <section id="events" className="scroll-reveal mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-3xl font-bold text-primary-800">Market Events</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                All Events
              </button>
              <button 
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'upcoming' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'past' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>
          
          {sortedEvents.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-600">No events found for the selected filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`scroll-reveal-item ${index % 3 === 0 ? '' : index % 3 === 1 ? 'delay-1' : 'delay-2'}`}
                >
                  <EventCard 
                    event={event} 
                    market={markets.find(m => m.id === event.marketId)!}
                    onAddToCalendar={() => handleAddToCalendar(event)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* Reviews Section */}
        <section id="reviews" className="scroll-reveal mb-16">
          <h2 className="font-display text-3xl font-bold text-primary-800 mb-8">Community Reviews</h2>
          
          {allReviews.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-600">No reviews available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allReviews.slice(0, 6).map((review, index) => (
                <div 
                  key={review.id} 
                  className={`scroll-reveal-item ${index % 2 === 0 ? '' : 'delay-1'}`}
                >
                  <ReviewCard 
                    review={review} 
                    marketName={review.marketName}
                    marketId={review.marketId}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* Community Engagement Section */}
        <section className="scroll-reveal">
          <h2 className="font-display text-3xl font-bold text-primary-800 mb-8">Get Involved</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden scroll-reveal-item">
              <div className="h-48 relative">
                <Image 
                  src="/images/volunteer.jpg" 
                  alt="Volunteer at markets" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2">Volunteer</h3>
                <p className="text-gray-700 mb-4">
                  Help support your local markets by volunteering your time. Assist with setup, 
                  educational activities, or special events.
                </p>
                <Link href="#" className="text-primary-600 font-medium hover:text-primary-800 hover:underline inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden scroll-reveal-item delay-1">
              <div className="h-48 relative">
                <Image 
                  src="/images/workshop.jpg" 
                  alt="Attend workshops" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2">Workshops</h3>
                <p className="text-gray-700 mb-4">
                  Learn new skills through our community workshops on gardening, 
                  cooking, food preservation, and sustainable living.
                </p>
                <Link href="#" className="text-primary-600 font-medium hover:text-primary-800 hover:underline inline-flex items-center">
                  Browse workshops
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden scroll-reveal-item delay-2">
              <div className="h-48 relative">
                <Image 
                  src="/images/newsletter.jpg" 
                  alt="Newsletter signup" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2">Stay Connected</h3>
                <p className="text-gray-700 mb-4">
                  Sign up for our newsletter to receive updates on seasonal produce, 
                  vendor spotlights, and upcoming community events.
                </p>
                <Link href="#" className="text-primary-600 font-medium hover:text-primary-800 hover:underline inline-flex items-center">
                  Join our newsletter
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="scroll-reveal mt-16">
          <h2 className="font-display text-3xl font-bold text-primary-800 mb-8">Frequently Asked Questions</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-display text-xl font-bold mb-2">How can I become a vendor at a farmers market?</h3>
                <p className="text-gray-700">
                  Each market has its own application process. Visit the specific market page for contact 
                  information and application details. Most markets require proof of insurance, applicable 
                  permits, and product information.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-display text-xl font-bold mb-2">Do the markets operate year-round?</h3>
                <p className="text-gray-700">
                  Market schedules vary. Some markets operate year-round while others are seasonal. 
                  Check individual market pages for current hours and seasonal opening dates.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-display text-xl font-bold mb-2">Are dogs allowed at farmers markets?</h3>
                <p className="text-gray-700">
                  Pet policies differ between markets. Many markets welcome well-behaved dogs on leashes, 
                  but some have restrictions due to health regulations. Look for the &quot;Pet Friendly&quot; 
                  feature tag on market pages or check with market organizers.
                </p>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-bold mb-2">How can I recommend a market to be added to Market Scout?</h3>
                <p className="text-gray-700">
                  We&apos;re always looking to expand our database! Contact us through the form below 
                  with details about the market including location, hours, website, and any additional 
                  information that would be helpful.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="scroll-reveal mt-16">
          <h2 className="font-display text-3xl font-bold text-primary-800 mb-8">Contact Us</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl font-bold mb-4">Get in Touch</h3>
                <p className="text-gray-700 mb-6">
                  Have questions about local markets? Want to suggest a market to add to our database? 
                  We&apos;d love to hear from you. Fill out the form and our team will get back to you as soon as possible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h4 className="font-bold">Email</h4>
                      <p className="text-gray-700">hello@marketscout.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h4 className="font-bold">Phone</h4>
                      <p className="text-gray-700">(503) 555-0123</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="font-bold">Address</h4>
                      <p className="text-gray-700">123 Market Street, Portland, OR 97204</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}