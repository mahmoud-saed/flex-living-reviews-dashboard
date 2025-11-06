'use client';

import React from 'react';
import { ReviewFilters } from '@/lib/types';

interface FilterPanelProps {
  filters: ReviewFilters;
  onFilterChange: (filters: ReviewFilters) => void;
  properties: { id: string; name: string }[];
}

export function FilterPanel({
  filters,
  onFilterChange,
  properties,
}: FilterPanelProps) {
  const channels = ['Airbnb', 'Booking.com', 'Direct', 'Vrbo', 'Expedia'];

  const handleChange = (key: keyof ReviewFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    onFilterChange({
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Property Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property
          </label>
          <select
            value={filters.propertyId || ''}
            onChange={(e) => handleChange('propertyId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Properties</option>
            {properties.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.name}
              </option>
            ))}
          </select>
        </div>

        {/* Channel Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channel
          </label>
          <select
            value={filters.channel || ''}
            onChange={(e) => handleChange('channel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Channels</option>
            {channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </div>

        {/* Review Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review Type
          </label>
          <select
            value={filters.reviewType || ''}
            onChange={(e) => handleChange('reviewType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="guest-to-host">Guest to Host</option>
            <option value="host-to-guest">Host to Guest</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Rating
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.5"
            value={filters.minRating || ''}
            onChange={(e) =>
              handleChange(
                'minRating',
                e.target.value ? parseFloat(e.target.value) : null
              )
            }
            placeholder="0-10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Date
          </label>
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => handleChange('dateFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Date
          </label>
          <input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => handleChange('dateTo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy || 'date'}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order
          </label>
          <select
            value={filters.sortOrder || 'desc'}
            onChange={(e) => handleChange('sortOrder', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
}

