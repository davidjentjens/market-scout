// src/app/components/vendor/VendorCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Vendor } from '../../lib/types';

interface VendorCardProps {
  vendor: Vendor;
  className?: string;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor, className = '' }) => {
  return (
    <Link href={`/vendors/${vendor.id}`}>
      <article className={`card group h-full relative vendor-card-border-animation ${className}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={vendor.images[0] || '/images/vendors/default.jpg'}
            alt={vendor.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {vendor.featured && (
            <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-display text-xl font-bold mb-1">{vendor.name}</h3>
          
          <p className="text-gray-700 text-sm line-clamp-2 mb-3">
            {vendor.bio}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <span className="text-earth-700 font-medium text-sm">
              {vendor.products.length} products
            </span>
            <span className="text-primary-600 font-medium text-sm group-hover:underline">
              View Profile →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default VendorCard;