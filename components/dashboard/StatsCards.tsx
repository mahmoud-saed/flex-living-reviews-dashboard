'use client';

import React from 'react';
import { NormalizedReview } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Star, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';

interface StatsCardsProps {
  reviews: NormalizedReview[];
  selectedCount: number;
}

export function StatsCards({ reviews, selectedCount }: StatsCardsProps) {
  const guestReviews = reviews.filter((r) => r.type === 'guest-to-host');
  const avgRating =
    guestReviews.length > 0
      ? guestReviews.reduce((sum, r) => sum + r.averageRating, 0) /
        guestReviews.length
      : 0;

  const stats = [
    {
      label: 'Total Reviews',
      value: reviews.length,
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Average Rating',
      value: avgRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: 'Guest Reviews',
      value: guestReviews.length,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Selected for Display',
      value: selectedCount,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

