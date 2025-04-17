// src/app/profile/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { events } from '../data/events';
import { markets } from '../data/markets';
import { vendors } from '../data/vendors';

// Mock user data - in a real app, this would come from an API or context
const mockUser = {
  name: "Jamie Smith",
  email: "jamie.smith@example.com",
  avatar: "/icons/user-avatar.png",
  joinDate: "January 2023",
  marketsVisited: ["1", "3"], // IDs of markets visited
  eventsAttended: ["1", "4"], // IDs of events attended
  favoriteVendors: ["1", "4"], // IDs of favorite vendors
  reviews: [
    {
      id: "r5",
      marketId: "3",
      userName: "Jamie S.",
      rating: 5,
      comment: "The freshest strawberries I've ever had!",
      date: "2025-03-24",
      marketName: 'Hillside Community Market'
    },
    {
      id: "r6",
      marketId: "1",
      userName: "Jamie S.",
      rating: 4,
      comment: "Great selection of organic produce, but a bit crowded on weekends.",
      date: "2025-02-15",
      marketName: 'Downtown Farmers Market'
    }
  ]
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the full market objects for visited markets
  const visitedMarkets = markets.filter(market => 
    mockUser.marketsVisited.includes(market.id)
  );
  
  // Find the full event objects for attended events
  const attendedEvents = events.filter(event => 
    mockUser.eventsAttended.includes(event.id)
  );
  
  // Find the full vendor objects for favorite vendors
  const favoriteVendorsList = vendors.filter(vendor => 
    mockUser.favoriteVendors.includes(vendor.id)
  );

  // Sort reviews by date (newest first)
  const sortedReviews = [...mockUser.reviews].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-0 md:mr-6">
            <Image 
              src={mockUser.avatar} 
              alt={`${mockUser.name}'s Profile Picture`} 
              fill
              className="rounded-full object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{mockUser.name}</h1>
            <p className="text-gray-600">{mockUser.email}</p>
            <p className="text-sm text-gray-500 mt-1">Member since {mockUser.joinDate}</p>
            
            <div className="flex mt-3 space-x-4">
              <div className="text-center">
                <span className="block text-xl font-bold text-primary-600">{mockUser.marketsVisited.length}</span>
                <span className="text-sm text-gray-600">Markets</span>
              </div>
              
              <div className="text-center">
                <span className="block text-xl font-bold text-primary-600">{mockUser.eventsAttended.length}</span>
                <span className="text-sm text-gray-600">Events</span>
              </div>
              
              <div className="text-center">
                <span className="block text-xl font-bold text-primary-600">{mockUser.reviews.length}</span>
                <span className="text-sm text-gray-600">Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'overview' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          
          <button 
            onClick={() => setActiveTab('markets')}
            className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'markets' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Markets
          </button>
          
          <button 
            onClick={() => setActiveTab('events')}
            className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'events' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Events
          </button>
          
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'reviews' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Reviews
          </button>
        </nav>
      </div>

      {/* Content for each tab */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Market Scout Activity</h2>
            
            {/* Recent activity summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-medium text-primary-700 mb-2">Latest Market Visit</h3>
                {visitedMarkets.length > 0 ? (
                  <div>
                    <p className="font-bold">{visitedMarkets[0].name}</p>
                    <p className="text-sm text-gray-600">{visitedMarkets[0].city}, {visitedMarkets[0].state}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No markets visited yet</p>
                )}
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-medium text-primary-700 mb-2">Upcoming Event</h3>
                {attendedEvents.length > 0 ? (
                  <div>
                    <p className="font-bold">{attendedEvents[0].title}</p>
                    <p className="text-sm text-gray-600">{attendedEvents[0].date} • {attendedEvents[0].time}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No upcoming events</p>
                )}
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-medium text-primary-700 mb-2">Latest Review</h3>
                {sortedReviews.length > 0 ? (
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < sortedReviews[0].rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2">{sortedReviews[0].comment}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(sortedReviews[0].date).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No reviews yet</p>
                )}
              </div>
            </div>
            
            {/* Favorite vendors section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Your Favorite Vendors</h3>
              
              {favoriteVendorsList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteVendorsList.map(vendor => (
                    <div key={vendor.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                      <div className="h-40 relative">
                        <Image
                          src={vendor.images[0]}
                          alt={vendor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium">{vendor.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{vendor.bio}</p>
                        <Link 
                          href={`/vendors/${vendor.id}`}
                          className="inline-block mt-3 text-sm text-primary-600 font-medium hover:text-primary-700"
                        >
                          View Products
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No favorite vendors yet</p>
              )}
            </div>
          </div>
        )}

        {/* Markets Tab */}
        {activeTab === 'markets' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Markets You&apos;ve Visited</h2>
              <Link 
                href="/markets" 
                className="text-sm text-primary-600 font-medium hover:text-primary-700"
              >
                Discover More Markets
              </Link>
            </div>
            
            {visitedMarkets.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {visitedMarkets.map(market => (
                  <div key={market.id} className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <Image
                        src={market.images[0]}
                        alt={market.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-2/3">
                      <h3 className="text-lg font-medium">{market.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {market.address}, {market.city}, {market.state} {market.zip}
                      </p>
                      <p className="text-sm text-gray-700 mb-4">{market.description}</p>
                      
                      <div className="mt-2">
                        <h4 className="text-sm font-medium mb-1">Market Hours:</h4>
                        <ul className="text-sm text-gray-600">
                          {market.hours.map((hour, index) => (
                            <li key={index}>{hour.day}: {hour.open} - {hour.close}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {market.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <Link 
                        href={`/markets/${market.id}`}
                        className="inline-block mt-4 text-sm text-primary-600 font-medium hover:text-primary-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven&apos;t visited any markets yet.</p>
                <Link 
                  href="/markets" 
                  className="inline-block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
                >
                  Explore Markets
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Events You&apos;ve Attended</h2>
              <Link 
                href="/events" 
                className="text-sm text-primary-600 font-medium hover:text-primary-700"
              >
                Discover More Events
              </Link>
            </div>
            
            {attendedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {attendedEvents.map(event => {
                  // Find the market this event belongs to
                  const eventMarket = markets.find(m => m.id === event.marketId);
                  
                  return (
                    <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                      <div className="h-48 relative">
                        <Image
                          src={event.image || '/fallback-image.png'}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium">{event.title}</h3>
                          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span>{eventMarket ? eventMarket.name : 'Unknown Market'}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>{event.time}</span>
                        </div>
                        
                        <Link 
                          href={`/events/${event.id}`}
                          className="inline-block mt-3 text-sm text-primary-600 font-medium hover:text-primary-700"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven&apos;t attended any events yet.</p>
                <Link 
                  href="/events" 
                  className="inline-block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
                >
                  Explore Events
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>
            
            {sortedReviews.length > 0 ? (
              <div className="space-y-6">
                {sortedReviews.map(review => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{review.marketName}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(review.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-gray-700">{review.comment}</p>
                    
                    <div className="mt-3 flex justify-end space-x-2">
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Edit
                      </button>
                      <button className="text-sm text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven&apos;t written any reviews yet.</p>
                <p className="text-sm text-gray-600">
                  Visit some markets and share your experiences with the community!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}