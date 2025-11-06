import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface PropertyImagesProps {
  propertyName: string;
}

export function PropertyImages({ propertyName }: PropertyImagesProps) {
  // Placeholder images with different gradients
  const gradients = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-green-400 to-green-600',
    'from-orange-400 to-orange-600',
  ];

  return (
    <div className="grid grid-cols-4 gap-2 mb-8 h-96">
      {/* Main large image */}
      <div className="col-span-4 md:col-span-2 md:row-span-2 rounded-lg overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <ImageIcon className="w-24 h-24 text-white opacity-50" />
      </div>

      {/* Smaller images */}
      {gradients.map((gradient, index) => (
        <div
          key={index}
          className="hidden md:block col-span-2 md:col-span-1 rounded-lg overflow-hidden bg-gradient-to-br flex items-center justify-center"
          style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <ImageIcon className="w-12 h-12 text-white opacity-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

