// src/app/components/vendor/VendorSpotlight.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Vendor } from "../../lib/types";

interface VendorSpotlightProps {
  vendors: Vendor[];
}

const VendorSpotlight: React.FC<VendorSpotlightProps> = ({ vendors }) => {
  // Get only featured vendors
  const featuredVendors = vendors.filter((vendor) => vendor.featured);

  if (featuredVendors.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-earth-50">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-center mb-12">
          Meet Our Vendors
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredVendors.slice(0, 3).map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group"
            >
              <div className="relative h-52">
                <Image
                  src={vendor.images[0] || "/images/vendors/default.jpg"}
                  alt={vendor.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="font-display text-xl font-bold text-white px-4 pb-4">
                    {vendor.name}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                  {vendor.bio}
                </p>
                <Link
                  href={`/vendors/${vendor.id}`}
                  className="inline-block text-primary-600 font-medium hover:text-primary-800 hover:underline"
                >
                  Meet the producer →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/vendors" className="btn btn-primary">
            View All Vendors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VendorSpotlight;
