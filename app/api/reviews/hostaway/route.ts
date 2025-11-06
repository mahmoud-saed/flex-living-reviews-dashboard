import { NextRequest, NextResponse } from 'next/server';
import { getFilteredAndSortedReviews } from '@/lib/hostaway';
import { ReviewFilters } from '@/lib/types';

/**
 * GET /api/reviews/hostaway
 * Fetches and normalizes Hostaway reviews with filtering and sorting
 * 
 * Query Parameters:
 * - propertyId: Filter by property ID
 * - channel: Filter by channel (Airbnb, Booking.com, etc.)
 * - dateFrom: Filter by start date (ISO 8601)
 * - dateTo: Filter by end date (ISO 8601)
 * - minRating: Minimum rating (0-10)
 * - maxRating: Maximum rating (0-10)
 * - reviewType: Filter by type (guest-to-host, host-to-guest)
 * - sortBy: Sort by field (date, rating)
 * - sortOrder: Sort order (asc, desc)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters into filters
    const filters: ReviewFilters = {
      propertyId: searchParams.get('propertyId') || undefined,
      channel: searchParams.get('channel') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      minRating: searchParams.get('minRating')
        ? parseFloat(searchParams.get('minRating')!)
        : undefined,
      maxRating: searchParams.get('maxRating')
        ? parseFloat(searchParams.get('maxRating')!)
        : undefined,
      reviewType: (searchParams.get('reviewType') as any) || undefined,
      sortBy: (searchParams.get('sortBy') as 'date' | 'rating') || 'date',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    };

    // Fetch filtered and sorted reviews
    const reviews = await getFilteredAndSortedReviews(filters);

    // Return successful response with normalized data
    return NextResponse.json({
      status: 'success',
      result: reviews,
      count: reviews.length,
      filters: filters,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to fetch reviews',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

