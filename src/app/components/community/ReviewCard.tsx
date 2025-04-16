// src/app/components/community/ReviewCard.tsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Review } from '../../lib/types';

interface ReviewCardProps {
  review: Review;
  marketName: string;
  marketId: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, marketName, marketId }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-primary-100 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated shine effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/30 to-transparent -translate-x-full ${isHovered ? 'animate-shine' : ''} pointer-events-none`}></div>
      
      <div className="p-6">
        {/* Header with name and rating */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-bold text-lg">{review.userName}</h3>
            <Link 
              href={`/markets/${marketId}`}
              className="text-sm text-primary-600 hover:text-primary-800 hover:underline inline-flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {marketName}
            </Link>
          </div>
          <div className="flex items-center bg-primary-50 px-2 py-1 rounded-full">
            <span className="mr-1 font-bold text-primary-700">{review.rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill={i < review.rating ? "currentColor" : "none"} 
                  stroke="currentColor"
                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        
        {/* Review content */}
        <div className="mb-4">
          {/* Quotation mark */}
          <svg className="h-8 w-8 text-primary-200 mb-1" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          
          <p className="text-gray-700 relative z-10">
            {review.comment}
          </p>
        </div>
        
        {/* Footer with date and helpful button */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
          
          <button className="text-primary-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            This was helpful
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;