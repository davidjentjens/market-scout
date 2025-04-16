// src/app/components/community/CommunityReviewsSection.tsx
import { Review } from '../../lib/types';
import ReviewCard from './ReviewCard';

interface CommunityReviewsSectionProps {
  reviews: Review[];
}

export default function CommunityReviewsSection({ reviews }: CommunityReviewsSectionProps) {
  return (
    <section id="reviews" className="scroll-reveal mb-16">
      <h2 className="font-display text-3xl font-bold text-primary-800 mb-8">Community Reviews</h2>
      
      {reviews.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">No reviews available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.slice(0, 6).map((review, index) => (
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
  );
}