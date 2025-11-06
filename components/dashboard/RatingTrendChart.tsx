'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { NormalizedReview } from '@/lib/types';
import { format, startOfMonth, subMonths } from 'date-fns';

interface RatingTrendChartProps {
  reviews: NormalizedReview[];
}

export function RatingTrendChart({ reviews }: RatingTrendChartProps) {
  // Only include guest-to-host reviews with ratings
  const guestReviews = reviews.filter(
    (r) => r.type === 'guest-to-host' && r.averageRating > 0
  );

  // Group reviews by month and calculate average rating
  const monthlyData = new Map<string, { sum: number; count: number }>();

  // Get last 6 months
  const months: string[] = [];
  for (let i = 5; i >= 0; i--) {
    const month = startOfMonth(subMonths(new Date(), i));
    const monthKey = format(month, 'MMM yyyy');
    months.push(monthKey);
    monthlyData.set(monthKey, { sum: 0, count: 0 });
  }

  // Aggregate review data by month
  guestReviews.forEach((review) => {
    const monthKey = format(new Date(review.submittedAt), 'MMM yyyy');
    if (monthlyData.has(monthKey)) {
      const data = monthlyData.get(monthKey)!;
      data.sum += review.averageRating;
      data.count += 1;
    }
  });

  // Prepare chart data
  const chartData = months.map((month) => {
    const data = monthlyData.get(month)!;
    return {
      month,
      averageRating: data.count > 0 ? +(data.sum / data.count).toFixed(1) : 0,
      reviewCount: data.count,
    };
  });

  if (guestReviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Rating Trend (Last 6 Months)
        </h3>
        <div className="text-center py-12 text-gray-500">
          No rating data available for the selected filters.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Rating Trend (Last 6 Months)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 10]} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 shadow-lg rounded border border-gray-200">
                    <p className="text-sm font-semibold">
                      {payload[0].payload.month}
                    </p>
                    <p className="text-sm text-blue-600">
                      Avg Rating: {payload[0].value}
                    </p>
                    <p className="text-xs text-gray-500">
                      {payload[0].payload.reviewCount} reviews
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="averageRating"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

