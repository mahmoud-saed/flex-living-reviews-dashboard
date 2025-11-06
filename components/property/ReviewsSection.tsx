import React from 'react';
import { NormalizedReview } from '@/lib/types';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { formatDistanceToNow } from 'date-fns';

interface ReviewsSectionProps {
  reviews: NormalizedReview[];
  averageRating: number;
}

export function ReviewsSection({
  reviews,
  averageRating,
}: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return null;
  }

  // Calculate category averages
  const categoryAverages = new Map<string, { sum: number; count: number }>();

  reviews.forEach((review) => {
    review.reviewCategory.forEach((cat) => {
      if (!categoryAverages.has(cat.category)) {
        categoryAverages.set(cat.category, { sum: 0, count: 0 });
      }
      const data = categoryAverages.get(cat.category)!;
      data.sum += cat.rating;
      data.count += 1;
    });
  });

  const topCategories = Array.from(categoryAverages.entries())
    .map(([category, data]) => ({
      category: category.replace(/_/g, ' '),
      average: data.sum / data.count,
    }))
    .sort((a, b) => b.average - a.average)
    .slice(0, 6);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Guest Reviews
      </h2>

      {/* Overall Rating */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <StarRating rating={averageRating} size="lg" />
          <span className="text-2xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-gray-600">· {reviews.length} reviews</span>
        </div>

        {/* Category Ratings */}
        {topCategories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCategories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {cat.category}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {cat.average.toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(cat.average / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-6 last:border-b-0"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {getInitials(review.guestName)}
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.guestName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(review.submittedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{review.channel}</Badge>
                    {review.type === 'guest-to-host' && (
                      <StarRating rating={review.averageRating} size="sm" />
                    )}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mt-3">
                  {review.publicReview}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

