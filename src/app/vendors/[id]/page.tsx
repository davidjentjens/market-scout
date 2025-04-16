// src/app/vendors/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { vendors } from '../../data/vendors';
import { products } from '../../data/products';
import { markets } from '../../data/markets';
import { Vendor, Product, Market } from '../../lib/types';

export default function VendorDetailPage() {
  const params = useParams();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);
  const [vendorMarkets, setVendorMarkets] = useState<Market[]>([]);
  
  useEffect(() => {
    // Find the vendor by ID
    const vendorId = params.id as string;
    const foundVendor = vendors.find(v => v.id === vendorId) || null;
    setVendor(foundVendor);
    
    if (foundVendor) {
      // Get vendor's products
      const vendorProds = products.filter(p => p.vendorId === foundVendor.id);
      setVendorProducts(vendorProds);
      
      // Get markets this vendor sells at
      const vendorMkts = markets.filter(m => foundVendor.marketIds.includes(m.id));
      setVendorMarkets(vendorMkts);
    }
  }, [params.id]);
  
  if (!vendor) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="font-display text-3xl font-bold text-center">Vendor not found</h2>
            <p className="text-center mt-4">
              <Link href="/vendors" className="text-primary-600 hover:text-primary-800">
                View all vendors
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-earth-50 py-12 px-4">
      <div className="container mx-auto">
        {/* Vendor Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
                <Image
                  src={vendor.images[0] || '/images/vendors/default.jpg'}
                  alt={vendor.name}
                  className="object-cover"
                  fill
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h1 className="font-display text-3xl font-bold mb-2">{vendor.name}</h1>
              {vendor.featured && (
                <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full mb-4 inline-block">
                  Featured Vendor
                </span>
              )}
              <p className="text-gray-700 my-4">{vendor.bio}</p>
              
              {/* Contact Information */}
              {vendor.contact && (
                <div className="my-4">
                  <h3 className="font-display text-xl font-bold mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    {vendor.contact.phone && (
                      <p className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        {vendor.contact.phone}
                      </p>
                    )}
                    {vendor.contact.email && (
                      <p className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        {vendor.contact.email}
                      </p>
                    )}
                    {vendor.contact.website && (
                      <p className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        <a
                          href={`https://${vendor.contact.website.replace('https://', '').replace('http://', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-800"
                        >
                          {vendor.contact.website}
                        </a>
                      </p>
                    )}
                    {vendor.contact.instagram && (
                      <p className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75Z" fill="currentColor"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M6.77 3.082C10.581 2.865 13.419 2.865 17.23 3.082C19.215 3.199 20.801 4.785 20.918 6.77C21.135 10.581 21.135 13.419 20.918 17.23C20.801 19.215 19.215 20.801 17.23 20.918C13.419 21.135 10.581 21.135 6.77 20.918C4.785 20.801 3.199 19.215 3.082 17.23C2.865 13.419 2.865 10.581 3.082 6.77C3.199 4.785 4.785 3.199 6.77 3.082ZM17 6C16.4477 6 16 6.44772 16 7C16 7.55228 16.4477 8 17 8C17.5523 8 18 7.55228 18 7C18 6.44772 17.5523 6 17 6ZM7.25 12C7.25 9.37665 9.37665 7.25 12 7.25C14.6234 7.25 16.75 9.37665 16.75 12C16.75 14.6234 14.6234 16.75 12 16.75C9.37665 16.75 7.25 14.6234 7.25 12Z" fill="currentColor"/>
                        </svg>
                        <a
                          href={`https://instagram.com/${vendor.contact.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-800"
                        >
                          {vendor.contact.instagram}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Products Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">Products</h2>
          {vendorProducts.length === 0 ? (
            <p className="text-gray-600">This vendor doesn&apos;t have any products listed yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendorProducts.map(product => (
                <div 
                  key={product.id}
                  className="border border-earth-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={product.image || '/images/products/default.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.organic && (
                      <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                        Organic
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary-700 font-medium">{product.price}</span>
                      <span className="text-xs bg-earth-100 text-earth-700 px-2 py-1 rounded-full capitalize">
                        {product.category}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <h4 className="text-sm font-medium mb-1">In Season:</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.seasonality.map((month, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-700"
                          >
                            {month.substring(0, 3)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Markets Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="font-display text-2xl font-bold mb-6">Find at These Markets</h2>
          {vendorMarkets.length === 0 ? (
            <p className="text-gray-600">This vendor doesn&apos;t have any markets listed yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendorMarkets.map(market => (
                <Link 
                  href={`/markets/${market.id}`}
                  key={market.id}
                  className="border border-earth-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-40">
                    <Image
                      src={market.images[0] || '/images/markets/default.jpg'}
                      alt={market.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold mb-1 group-hover:text-primary-600 transition-colors">{market.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{market.city}, {market.state}</p>
                    
                    <div className="text-sm">
                      <h4 className="font-medium mb-1">Market Hours:</h4>
                      <ul className="space-y-1">
                        {market.hours.map((hour, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{hour.day}:</span>
                            <span>{hour.open} - {hour.close}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}