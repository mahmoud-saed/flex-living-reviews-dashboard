// Core Review Types
export interface ReviewCategory {
  category: string;
  rating: number; // 1-10 scale
}

export interface Review {
  id: number;
  type: 'host-to-guest' | 'guest-to-host';
  status: 'published' | 'pending' | 'archived';
  rating: number | null; // Overall rating if provided
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string; // ISO 8601 format
  guestName: string;
  listingName: string;
  listingId: string; // Added for property filtering
  channel: 'Airbnb' | 'Booking.com' | 'Direct' | 'Vrbo' | 'Expedia';
  privateReview?: string; // Optional private feedback
}

// Normalized Review Response
export interface NormalizedReview extends Review {
  averageRating: number; // Calculated from reviewCategory
  submittedDate: Date; // Parsed date object
}

// API Response Types
export interface HostawayAPIResponse {
  status: 'success' | 'error';
  result: Review[];
  message?: string;
}

// Property Information
export interface Property {
  id: string;
  name: string;
  location: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
}

// Review Selection Storage
export interface ReviewSelection {
  reviewId: number;
  selectedAt: string;
  selectedBy?: string; // Optional: manager identifier
}

export interface ReviewSelectionsData {
  selections: ReviewSelection[];
  lastUpdated: string;
}

// Filter Parameters
export interface ReviewFilters {
  propertyId?: string;
  channel?: string;
  dateFrom?: string;
  dateTo?: string;
  minRating?: number;
  maxRating?: number;
  reviewType?: 'host-to-guest' | 'guest-to-host';
  sortBy?: 'date' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

// Dashboard Statistics
export interface PropertyStats {
  propertyId: string;
  propertyName: string;
  averageRating: number;
  totalReviews: number;
  recentTrend: 'up' | 'down' | 'stable';
  channelBreakdown: {
    channel: string;
    count: number;
  }[];
}

// Chart Data Types
export interface RatingTrendData {
  date: string;
  averageRating: number;
  reviewCount: number;
}

export interface ChannelDistribution {
  channel: string;
  count: number;
  percentage: number;
}

export interface CategoryPerformance {
  category: string;
  averageRating: number;
  reviewCount: number;
}

