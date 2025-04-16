// src/app/components/market/MarketCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Market } from '../../lib/types';

interface MarketCardProps {
  market: Market;
  className?: string;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, className = '' }) => {
  return (
    <Link href={`/markets/${market.id}`}>
      <article className={`card group h-full relative market-card-border-animation ${className}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={market.images[0] || '/images/markets/default.jpg'}
            alt={market.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-display text-xl font-bold mb-1">{market.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{market.city}, {market.state}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {market.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
            {market.features.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{market.features.length - 3} more
              </span>
            )}
          </div>
          
          <p className="text-gray-700 text-sm line-clamp-2 mb-3">
            {market.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-earth-700 font-medium">
              {market.vendorIds.length} vendors
            </span>
            <span className="text-primary-600 font-medium group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MarketCard;