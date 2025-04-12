// src/app/components/map/MarkerPopup.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Market } from '../../lib/types';

interface MarkerPopupProps {
  market: Market;
}

const MarkerPopup: React.FC<MarkerPopupProps> = ({ market }) => {
  // Function to get the current day's hours
  const getTodayHours = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    
    const todayHours = market.hours.find(h => h.day === today);
    
    if (!todayHours) return 'Closed today';
    if (todayHours.isClosed) return 'Closed today';
    
    return `Open today: ${todayHours.open} - ${todayHours.close}`;
  };

  return (
    <div className="market-popup w-64">
      <div className="relative h-28 w-full mb-2">
        <Image
          src={market.images[0] || '/images/markets/default.jpg'}
          alt={market.name}
          fill
          className="object-cover rounded-sm"
        />
      </div>
      <h3 className="font-display text-lg font-bold mb-1">{market.name}</h3>
      <p className="text-gray-500 text-xs mb-2">{market.address}, {market.city}, {market.state}</p>
      
      <p className="text-sm text-primary-600 font-medium mb-2">
        {getTodayHours()}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {market.features.slice(0, 2).map((feature, index) => (
          <span key={index} className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">
            {feature}
          </span>
        ))}
        {market.features.length > 2 && (
          <span className="text-gray-500 text-xs">
            +{market.features.length - 2} more
          </span>
        )}
      </div>
      
      <div className="mt-3">
        <Link 
          href={`/markets/${market.id}`} 
          className="text-sm text-earth-700 font-medium hover:text-primary-600 hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default MarkerPopup;