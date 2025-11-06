'use client';

import React, { useState } from 'react';
import { NormalizedReview } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReviewsTableProps {
  reviews: NormalizedReview[];
  selectedReviewIds: Set<number>;
  onToggleSelection: (reviewId: number) => void;
}

export function ReviewsTable({
  reviews,
  selectedReviewIds,
  onToggleSelection,
}: ReviewsTableProps) {
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">
          No reviews found matching your filters.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Try adjusting your filter criteria to see more results.
        </p>
      </div>
    );
  }

  const toggleExpand = (reviewId: number) => {
    setExpandedReviewId(expandedReviewId === reviewId ? null : reviewId);
  };

  const getChannelVariant = (channel: string) => {
    switch (channel) {
      case 'Airbnb':
        return 'error';
      case 'Booking.com':
        return 'info';
      case 'Direct':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guest
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Channel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
              <React.Fragment key={review.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedReviewIds.has(review.id)}
                      onChange={() => onToggleSelection(review.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {review.guestName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {review.listingName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {review.type === 'guest-to-host' ? (
                      <StarRating
                        rating={review.averageRating}
                        size="sm"
                        showNumber
                      />
                    ) : (
                      <span className="text-sm text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getChannelVariant(review.channel)}>
                      {review.channel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(review.submittedAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-gray-500">
                      {review.type === 'guest-to-host' ? 'Guest→Host' : 'Host→Guest'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleExpand(review.id)}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {expandedReviewId === review.id ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          <span className="text-sm">Hide</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          <span className="text-sm">View</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
                {expandedReviewId === review.id && (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            Review:
                          </h4>
                          <p className="text-sm text-gray-700">
                            {review.publicReview}
                          </p>
                        </div>
                        {review.reviewCategory.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                              Category Ratings:
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                              {review.reviewCategory.map((cat) => (
                                <div
                                  key={cat.category}
                                  className="flex items-center justify-between bg-white px-3 py-2 rounded"
                                >
                                  <span className="text-xs text-gray-600 capitalize">
                                    {cat.category.replace(/_/g, ' ')}
                                  </span>
                                  <span className="text-sm font-semibold text-gray-900">
                                    {cat.rating}/10
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

