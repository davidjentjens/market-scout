// src/app/vendors/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { vendors } from '../data/vendors';
import { products } from '../data/products';
import VendorCard from '../components/vendor/VendorCard';
import Input from '../components/common/Input';
import { Vendor } from '../lib/types';

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);

  // Get unique product categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Format category name
  const formatCategoryName = (category: string) => {
    return category === 'all' 
      ? 'All Categories' 
      : category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Filter vendors based on search term and category
  useEffect(() => {
    let filtered = [...vendors];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(vendor => 
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      // Find vendors who have products in this category
      const vendorIdsWithCategory = products
        .filter(product => product.category === categoryFilter)
        .map(product => product.vendorId);
      
      filtered = filtered.filter(vendor => 
        vendorIdsWithCategory.includes(vendor.id)
      );
    }
    
    setFilteredVendors(filtered);
  }, [searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen bg-earth-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl font-bold text-primary-800 mb-8">Local Vendors</h1>
        
        {/* Search and filter section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search vendors by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                label="Search Vendors"
                noMargin
              />
            </div>
            <div className="md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {formatCategoryName(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Found {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        {/* Vendors grid */}
        {filteredVendors.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="font-display text-2xl font-bold mb-4">No vendors found</h2>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}
        
        {/* Information section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="font-display text-2xl font-bold mb-4">Meet Your Local Producers</h2>
          <p className="text-gray-700 mb-4">
            Connect directly with the passionate farmers, bakers, and artisans who bring fresh, 
            locally-grown products to your community. Supporting these vendors helps strengthen 
            the local economy and ensures you get the freshest seasonal foods.
          </p>
          <h3 className="font-display text-xl font-bold mb-2">Why Buy Directly from Vendors?</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Learn about how your food is grown and produced</li>
            <li>Discover unique varieties not found in stores</li>
            <li>Get expert advice on selection, storage, and preparation</li>
            <li>Build relationships with the people who grow your food</li>
            <li>Support sustainable farming practices and local food systems</li>
          </ul>
        </div>
      </div>
    </div>
  );
}