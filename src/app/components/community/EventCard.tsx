// src/app/components/community/EventCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event, Market } from '../../lib/types';

interface EventCardProps {
  event: Event;
  market: Market;
  onAddToCalendar: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, market, onAddToCalendar }) => {
  // Format date for events
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    });
  };

  // Check if event is upcoming or past
  const isUpcoming = new Date(event.date) >= new Date();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
      <div className="relative">
        <div className="h-48 relative overflow-hidden">
          <Image
            src={event.image || '/images/events/default.jpg'}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Status badge */}
        <div className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold ${
          isUpcoming 
            ? 'bg-primary-500 text-white' 
            : 'bg-gray-200 text-gray-700'
        }`}>
          {isUpcoming ? 'Upcoming' : 'Past Event'}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-gray-600">{formatEventDate(event.date)}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-600">{event.time}</span>
        </div>
        
        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">{event.title}</h3>
        
        <p className="text-gray-700 mb-4 flex-grow">{event.description}</p>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-earth-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <Link href={`/markets/${market.id}`} className="hover:text-primary-600 hover:underline">
            {market.name}
          </Link>
        </div>
        
        <div className="pt-3 border-t border-gray-100 flex justify-between items-center mt-auto">
          <Link 
            href={`/markets/${market.id}`}
            className="text-primary-600 font-medium hover:text-primary-800 hover:underline text-sm"
          >
            View Market
          </Link>
          
          <button 
            onClick={onAddToCalendar}
            className="text-earth-600 font-medium hover:text-earth-800 hover:underline text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;