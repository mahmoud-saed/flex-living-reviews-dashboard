'use client';

import React, { useState, useEffect } from 'react';
import { ReviewFilters, NormalizedReview } from '@/lib/types';
import { FilterPanel } from '@/components/dashboard/FilterPanel';
import { ReviewsTable } from '@/components/dashboard/ReviewsTable';
import { RatingTrendChart } from '@/components/dashboard/RatingTrendChart';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { Loading } from '@/components/ui/Loading';

export default function DashboardPage() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [selectedReviewIds, setSelectedReviewIds] = useState<Set<number>>(
    new Set()
  );
  const [filters, setFilters] = useState<ReviewFilters>({
    sortBy: 'date',
    sortOrder: 'desc',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews based on filters
  useEffect(() => {
    fetchReviews();
  }, [filters]);

  // Fetch selected review IDs on mount
  useEffect(() => {
    fetchSelections();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });

      const response = await fetch(`/api/reviews/hostaway?${params}`);
      const data = await response.json();

      if (data.status === 'success') {
        setReviews(data.result);
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch reviews');
      }
    } catch (err) {
      setError('An error occurred while fetching reviews');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelections = async () => {
    try {
      const response = await fetch('/api/reviews/selections');
      const data = await response.json();

      if (data.status === 'success') {
        setSelectedReviewIds(new Set(data.selectedIds));
      }
    } catch (err) {
      console.error('Failed to fetch selections:', err);
    }
  };

  const handleToggleSelection = async (reviewId: number) => {
    try {
      const response = await fetch('/api/reviews/selections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const newSelectedIds = new Set(selectedReviewIds);
        if (data.selected) {
          newSelectedIds.add(reviewId);
        } else {
          newSelectedIds.delete(reviewId);
        }
        setSelectedReviewIds(newSelectedIds);
      }
    } catch (err) {
      console.error('Failed to toggle selection:', err);
      alert('Failed to update review selection');
    }
  };

  const properties = [
    { id: 'prop-001', name: 'Modern 2BR Shoreditch Heights' },
    { id: 'prop-002', name: 'Kings Cross Station Apartment' },
    { id: 'prop-003', name: 'Camden Market Loft' },
    { id: 'prop-004', name: 'Penthouse with Rooftop Terrace' },
    { id: 'prop-005', name: 'Charming Notting Hill Flat' },
  ];

  if (loading && reviews.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Loading message="Loading reviews..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Flex Living - Reviews Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and review guest feedback across all properties
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <StatsCards reviews={reviews} selectedCount={selectedReviewIds.size} />

        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          properties={properties}
        />

        <RatingTrendChart reviews={reviews} />

        <div className="mt-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Reviews ({reviews.length})
            </h2>
            <div className="text-sm text-gray-600">
              {selectedReviewIds.size} selected for public display
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-12">
              <Loading message="Updating..." />
            </div>
          ) : (
            <ReviewsTable
              reviews={reviews}
              selectedReviewIds={selectedReviewIds}
              onToggleSelection={handleToggleSelection}
            />
          )}
        </div>
      </div>
    </div>
  );
}

