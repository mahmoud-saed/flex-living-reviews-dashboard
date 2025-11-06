'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0-10 scale
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export function StarRating({
  rating,
  maxRating = 10,
  size = 'md',
  showNumber = false,
}: StarRatingProps) {
  // Convert to 5-star scale
  const stars = 5;
  const normalizedRating = (rating / maxRating) * stars;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: stars }).map((_, index) => {
        const isFilled = index < fullStars;
        const isHalf = index === fullStars && hasHalfStar;

        return (
          <div key={index} className="relative">
            <Star
              className={`${sizeClasses[size]} ${
                isFilled || isHalf
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
            {isHalf && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star
                  className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`}
                />
              </div>
            )}
          </div>
        );
      })}
      {showNumber && (
        <span className="ml-1 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

