import { promises as fs } from 'fs';
import path from 'path';
import { Review, NormalizedReview, ReviewFilters } from './types';

const MOCK_DATA_PATH = path.join(process.cwd(), 'data', 'mock-reviews.json');

/**
 * Fetch all reviews from mock data
 */
export async function fetchHostawayReviews(): Promise<Review[]> {
  try {
    const data = await fs.readFile(MOCK_DATA_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.result as Review[];
  } catch (error) {
    console.error('Error reading mock reviews:', error);
    return [];
  }
}

/**
 * Calculate average rating from review categories
 */
function calculateAverageRating(reviewCategories: { rating: number }[]): number {
  if (reviewCategories.length === 0) return 0;
  const sum = reviewCategories.reduce((acc, cat) => acc + cat.rating, 0);
  return Math.round((sum / reviewCategories.length) * 10) / 10;
}

/**
 * Normalize a review with calculated fields
 */
function normalizeReview(review: Review): NormalizedReview {
  return {
    ...review,
    averageRating: review.rating || calculateAverageRating(review.reviewCategory),
    submittedDate: new Date(review.submittedAt),
  };
}

/**
 * Filter reviews based on criteria
 */
export function filterReviews(
  reviews: Review[],
  filters: ReviewFilters
): Review[] {
  let filtered = [...reviews];

  // Filter by property
  if (filters.propertyId) {
    filtered = filtered.filter((r) => r.listingId === filters.propertyId);
  }

  // Filter by channel
  if (filters.channel) {
    filtered = filtered.filter((r) => r.channel === filters.channel);
  }

  // Filter by review type
  if (filters.reviewType) {
    filtered = filtered.filter((r) => r.type === filters.reviewType);
  }

  // Filter by date range
  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom);
    filtered = filtered.filter((r) => new Date(r.submittedAt) >= fromDate);
  }

  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo);
    filtered = filtered.filter((r) => new Date(r.submittedAt) <= toDate);
  }

  // Filter by rating
  if (filters.minRating !== undefined) {
    filtered = filtered.filter((r) => {
      const avgRating = r.rating || calculateAverageRating(r.reviewCategory);
      return avgRating >= filters.minRating!;
    });
  }

  if (filters.maxRating !== undefined) {
    filtered = filtered.filter((r) => {
      const avgRating = r.rating || calculateAverageRating(r.reviewCategory);
      return avgRating <= filters.maxRating!;
    });
  }

  return filtered;
}

/**
 * Sort reviews
 */
export function sortReviews(
  reviews: Review[],
  sortBy: 'date' | 'rating' = 'date',
  sortOrder: 'asc' | 'desc' = 'desc'
): Review[] {
  const sorted = [...reviews];

  sorted.sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'date') {
      comparison = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
    } else if (sortBy === 'rating') {
      const ratingA = a.rating || calculateAverageRating(a.reviewCategory);
      const ratingB = b.rating || calculateAverageRating(b.reviewCategory);
      comparison = ratingA - ratingB;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Get reviews with all filters and sorting applied
 */
export async function getFilteredAndSortedReviews(
  filters: ReviewFilters
): Promise<NormalizedReview[]> {
  const allReviews = await fetchHostawayReviews();
  const filtered = filterReviews(allReviews, filters);
  const sorted = sortReviews(
    filtered,
    filters.sortBy || 'date',
    filters.sortOrder || 'desc'
  );
  return sorted.map(normalizeReview);
}

/**
 * Get reviews by property ID
 */
export async function getReviewsByProperty(
  propertyId: string
): Promise<NormalizedReview[]> {
  const allReviews = await fetchHostawayReviews();
  const filtered = allReviews.filter((r) => r.listingId === propertyId);
  return filtered.map(normalizeReview);
}

/**
 * Get review by ID
 */
export async function getReviewById(
  reviewId: number
): Promise<NormalizedReview | null> {
  const allReviews = await fetchHostawayReviews();
  const review = allReviews.find((r) => r.id === reviewId);
  return review ? normalizeReview(review) : null;
}

