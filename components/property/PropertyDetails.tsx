import React from 'react';
import { Property } from '@/lib/types';
import { Wifi, Tv, Coffee, Waves, Monitor, Wind } from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
}

const amenityIcons: Record<string, any> = {
  Wifi: Wifi,
  TV: Tv,
  'Coffee maker': Coffee,
  Washer: Waves,
  'Dedicated workspace': Monitor,
  Dryer: Wind,
};

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="mb-12">
      <div className="border-t border-b border-gray-200 py-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          About this place
        </h2>
        <p className="text-gray-700 leading-relaxed">{property.description}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          What this place offers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {property.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity] || Wifi;
            return (
              <div key={amenity} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">
              £{property.pricePerNight}
              <span className="text-lg font-normal text-gray-600"> / night</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

