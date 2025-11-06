import React from 'react';
import { Property } from '@/lib/types';
import { MapPin, Users, Bed, Bath } from 'lucide-react';
import { StarRating } from '@/components/ui/StarRating';

interface PropertyHeaderProps {
  property: Property;
  averageRating: number;
  reviewCount: number;
}

export function PropertyHeader({
  property,
  averageRating,
  reviewCount,
}: PropertyHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {property.name}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-gray-600">
        <div className="flex items-center gap-2">
          <StarRating rating={averageRating} showNumber />
          <span className="text-sm">({reviewCount} reviews)</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Bed className="w-5 h-5" />
          <span>{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <Bath className="w-5 h-5" />
          <span>{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span>Up to {property.maxGuests} guests</span>
        </div>
      </div>
    </div>
  );
}

