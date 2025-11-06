import React from 'react';
import { notFound } from 'next/navigation';
import { PropertyHeader } from '@/components/property/PropertyHeader';
import { PropertyImages } from '@/components/property/PropertyImages';
import { PropertyDetails } from '@/components/property/PropertyDetails';
import { ReviewsSection } from '@/components/property/ReviewsSection';
import { Property, NormalizedReview } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function getProperty(id: string): Promise<Property | null> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'properties.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.properties.find((p: Property) => p.id === id) || null;
  } catch (error) {
    console.error('Error reading properties:', error);
    return null;
  }
}

async function getSelectedReviews(propertyId: string): Promise<NormalizedReview[]> {
  try {
    // Get selected review IDs
    const selectionsPath = path.join(process.cwd(), 'data', 'review-selections.json');
    const selectionsData = await fs.readFile(selectionsPath, 'utf-8');
    const selections = JSON.parse(selectionsData);
    const selectedIds = new Set(selections.selections.map((s: any) => s.reviewId));

    // Get all reviews
    const reviewsPath = path.join(process.cwd(), 'data', 'mock-reviews.json');
    const reviewsData = await fs.readFile(reviewsPath, 'utf-8');
    const allReviews = JSON.parse(reviewsData);

    // Filter: only selected reviews for this property, guest-to-host type
    const filteredReviews = allReviews.result
      .filter(
        (review: any) =>
          review.listingId === propertyId &&
          review.type === 'guest-to-host' &&
          selectedIds.has(review.id)
      )
      .map((review: any) => ({
        ...review,
        averageRating:
          review.rating ||
          review.reviewCategory.reduce((sum: number, cat: any) => sum + cat.rating, 0) /
            review.reviewCategory.length,
      }));

    return filteredReviews;
  } catch (error) {
    console.error('Error reading reviews:', error);
    return [];
  }
}

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
  }

  const reviews = await getSelectedReviews(params.id);
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.averageRating, 0) / reviews.length
      : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyImages propertyName={property.name} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyHeader
              property={property}
              averageRating={averageRating}
              reviewCount={reviews.length}
            />

            <PropertyDetails property={property} />

            <ReviewsSection reviews={reviews} averageRating={averageRating} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="border border-gray-300 rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <p className="text-2xl font-bold text-gray-900">
                    £{property.pricePerNight}
                    <span className="text-base font-normal text-gray-600">
                      {' '}
                      / night
                    </span>
                  </p>
                </div>

                <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all">
                  Check Availability
                </button>

                <p className="text-center text-sm text-gray-500 mt-3">
                  You won't be charged yet
                </p>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">
                      £{property.pricePerNight} × 5 nights
                    </span>
                    <span className="text-gray-900 font-medium">
                      £{property.pricePerNight * 5}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-900 font-medium">
                      £{Math.round(property.pricePerNight * 5 * 0.1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      £{Math.round(property.pricePerNight * 5 * 1.1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

