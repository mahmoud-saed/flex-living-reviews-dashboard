# Flex Living Reviews Dashboard - Technical Documentation

## Project Overview

This Reviews Dashboard enables Flex Living property managers to aggregate, analyze, and curate guest reviews from multiple booking channels. The system provides a centralized interface for review management and displays approved reviews on public-facing property pages.

## Tech Stack

### Frontend & Backend
- **Next.js 14** (App Router with TypeScript)
  - Rationale: Full-stack React framework enabling both client and server components, API routes, and optimal performance with server-side rendering
  - App Router provides better developer experience and improved routing capabilities

### Styling
- **Tailwind CSS**
  - Rationale: Utility-first CSS framework enables rapid UI development with consistent design tokens
  - Excellent for responsive design and maintains small bundle sizes

### Data Visualization
- **Recharts**
  - Rationale: React-based charting library with declarative API
  - Lightweight and sufficient for displaying rating trends

### Utilities
- **date-fns**: Date formatting and manipulation
- **lucide-react**: Modern icon library

### Data Storage
- **JSON File Storage**
  - Rationale: Simple, transparent, and suitable for demo/assessment purposes
  - Easy to inspect and debug without database setup
  - Review selections persist between server restarts
  - Future migration path to database is straightforward

## Architecture & Key Design Decisions

### 1. API Design

#### `/api/reviews/hostaway` (GET)
This is the core API endpoint that fetches and normalizes review data.

**Query Parameters:**
- `propertyId`: Filter by specific property
- `channel`: Filter by booking channel (Airbnb, Booking.com, etc.)
- `dateFrom`, `dateTo`: Date range filtering
- `minRating`, `maxRating`: Rating range (0-10 scale)
- `reviewType`: Filter by guest-to-host or host-to-guest
- `sortBy`: Sort by date or rating
- `sortOrder`: asc or desc

**Response Format:**
```json
{
  "status": "success",
  "result": [
    {
      "id": 1001,
      "type": "guest-to-host",
      "rating": 9,
      "averageRating": 9.2,
      "publicReview": "Amazing apartment...",
      "reviewCategory": [
        {"category": "cleanliness", "rating": 10},
        {"category": "communication", "rating": 9}
      ],
      "submittedAt": "2024-10-15T14:30:00Z",
      "submittedDate": "2024-10-15T14:30:00.000Z",
      "guestName": "Sarah Mitchell",
      "listingName": "Modern 2BR Shoreditch Heights",
      "listingId": "prop-001",
      "channel": "Airbnb"
    }
  ],
  "count": 25,
  "filters": {...}
}
```

**Key Normalization Logic:**
- Calculate `averageRating` from category ratings when overall rating is null
- Parse dates into ISO 8601 format
- Maintain consistent 0-10 rating scale across all channels
- Map channel names consistently (handle variations like "Airbnb.com" → "Airbnb")

#### `/api/reviews/selections` (GET/POST)
Manages which reviews are approved for public display.

**GET Response:**
```json
{
  "status": "success",
  "selectedIds": [1001, 1002, 1005],
  "result": {
    "selections": [
      {"reviewId": 1001, "selectedAt": "2024-11-06T..."}
    ]
  }
}
```

**POST Body:**
```json
// Single toggle
{"reviewId": 1001}

// Bulk update
{"reviewIds": [1001, 1002, 1003], "selected": true}
```

### 2. Data Flow

```
Mock Data (JSON) → API Route → Filtering/Normalization → Client State → UI Display
                                      ↓
                              Review Selections (JSON File)
                                      ↓
                              Public Property Pages
```

1. Manager accesses dashboard
2. Dashboard fetches reviews from `/api/reviews/hostaway` with filters
3. Reviews are displayed in table with selection checkboxes
4. Manager toggles review selection → POST to `/api/reviews/selections`
5. Selection persists to `review-selections.json`
6. Public property pages read selections and display only approved reviews

### 3. Review Selection Logic

**Philosophy: Opt-in Approach**
- Default: No reviews are publicly visible
- Managers explicitly approve each review
- Only guest-to-host reviews (with ratings) are shown on property pages
- Host-to-guest reviews are visible in dashboard but not on public pages

**Why This Approach:**
- Gives managers full control over public reputation
- Prevents negative reviews from automatically appearing
- Enables quality curation of guest feedback

### 4. Dashboard UX Decisions

**Filter Design:**
- All filters are immediately visible (no hidden/collapsed sections)
- Filters update results in real-time via API calls
- "Clear all" button resets to default view
- Filter state is maintained in component state (not URL params) for simplicity

**Review Table:**
- Expandable rows reveal full review text and category ratings
- Visual indicators: colored badges for channels, star ratings
- Selection checkboxes in first column for easy scanning
- Responsive: stacks on mobile, horizontal scroll if needed

**Analytics:**
- Single chart showing 6-month rating trend
- Grouped by month with average rating and review count
- Empty state handling when no data matches filters
- Stats cards provide at-a-glance metrics

### 5. Property Page Design

**Inspiration: Airbnb/Modern Vacation Rentals**
- Hero section with image placeholders (gradient backgrounds)
- Property details with icons for amenities
- Sticky booking card (desktop only)
- Reviews section only appears if reviews are selected
- Category performance bars show strengths

**Review Display:**
- Avatar generated from guest initials
- Relative dates ("2 months ago")
- Channel badges for transparency
- Clean, readable typography

## Google Reviews Integration - Research Findings

### Overview
Google Reviews can be integrated via the **Google Places API**, which provides access to business ratings and user reviews submitted through Google Maps and Search.

### Technical Requirements

1. **Google Cloud Project Setup**
   - Create project in Google Cloud Console
   - Enable Places API (New)
   - Generate API key with Places API permissions
   - Set up billing account (API is not free)

2. **Place ID Requirement**
   - Each property needs a Google Place ID
   - Obtain via Places Autocomplete or Place Search
   - Place ID must correspond to a verified Google Business Profile
   - Properties need to be registered as businesses on Google

3. **API Endpoint**
   ```
   GET https://places.googleapis.com/v1/places/{PLACE_ID}
   ?fields=reviews,rating,userRatingCount
   &key=YOUR_API_KEY
   ```

### Pricing (as of 2024)

- **Places Details**: $0.017 per request (reviews included in details)
- **Monthly Free Tier**: $200 credit (~11,765 requests)
- **Cost Estimate for Flex Living**:
  - 5 properties × 10 review refreshes/day = 50 requests/day
  - ~1,500 requests/month = ~$25.50/month
  - Well within free tier if cached properly

### API Capabilities

**What You Get:**
- Up to 5 most recent reviews per location
- Review text, rating (1-5 stars), author name
- Review timestamp (relative, e.g., "2 months ago")
- Author profile photo URL

**Limitations:**
- Maximum 5 reviews per place (no pagination)
- Cannot retrieve reviews older than Google's default cutoff
- Review text may be truncated
- No filtering by date range or rating
- Rate limits: 10 requests/second

### Integration Feasibility: ✅ FEASIBLE

**Pros:**
- Straightforward REST API
- Official Google support and documentation
- Adds credibility (Google reviews are trusted)
- Relatively affordable with caching

**Cons:**
- Requires Google Business Profile for each property
- Limited to 5 reviews per property
- Additional complexity in data normalization
- Ongoing API costs
- Different rating scale (1-5 vs 0-10)

### Recommended Implementation Approach

If proceeding with integration:

1. **Create `/api/reviews/google` endpoint**
   ```typescript
   GET /api/reviews/google?propertyId=prop-001
   ```

2. **Normalize Google reviews to match schema**
   ```typescript
   {
     id: generateId(googleReview),
     type: 'guest-to-host',
     rating: googleReview.rating * 2, // Convert 5-star to 10-point
     publicReview: googleReview.text,
     submittedAt: parseRelativeDate(googleReview.relativeTime),
     guestName: googleReview.authorName,
     channel: 'Google',
     reviewCategory: [
       { category: 'overall', rating: googleReview.rating * 2 }
     ]
   }
   ```

3. **Merge with Hostaway data in dashboard**
   - Fetch both sources in parallel
   - Combine arrays with channel indicator
   - Apply same filtering/sorting logic

4. **Implement caching**
   - Cache Google reviews for 24 hours
   - Reduce API costs and improve performance
   - Use Next.js data caching or Redis

### Alternative: Google My Business API

- More comprehensive business management
- Allows responding to reviews
- More complex authentication (OAuth 2.0)
- Higher implementation cost

### Recommendation

**For Production:** Implement Google Places API integration with proper caching
**For MVP/Demo:** Document findings (as done here) and implement when business need is validated

The integration is technically feasible and adds value, but should be prioritized based on:
- Whether properties have Google Business Profiles
- Importance of Google reviews to target guests
- Budget for API costs

## Future Enhancements

### Short Term
- User authentication for dashboard
- Email notifications for new reviews
- Review response functionality
- Export reviews to CSV/PDF

### Medium Term
- PostgreSQL database migration
- Real Hostaway API integration
- Google Reviews live integration
- Multi-language review support
- Sentiment analysis on review text

### Long Term
- Automated review response suggestions (AI)
- Competitor benchmarking
- Review request automation
- Integration with other OTA platforms (Expedia, Vrbo)
- Mobile app for managers

## Development Notes

### File Structure
```
/app
  /api/reviews/hostaway/route.ts  - Main API endpoint
  /api/reviews/selections/route.ts - Selection management
  /dashboard/page.tsx              - Manager interface
  /property/[id]/page.tsx          - Public property page
/lib
  /hostaway.ts                     - Review fetching/filtering
  /storage.ts                      - JSON file operations
  /types.ts                        - TypeScript definitions
/data
  /mock-reviews.json               - 30 mock reviews
  /review-selections.json          - Selected review IDs
  /properties.json                 - Property metadata
```

### Testing Considerations

**Manual Testing Checklist:**
- [ ] API returns valid JSON with correct structure
- [ ] All filters work independently and in combination
- [ ] Review selection persists after server restart
- [ ] Property pages show only selected reviews
- [ ] Mobile responsive on all pages
- [ ] Empty states display correctly
- [ ] Loading states appear during API calls

### Performance Optimizations

- Next.js automatic code splitting
- Server-side rendering for property pages (SEO benefit)
- Client-side state management for dashboard interactivity
- Lazy loading of chart library
- Optimized bundle size with tree-shaking

## Conclusion

This implementation demonstrates:
- ✅ Real-world data normalization across channels
- ✅ Clean API design with comprehensive filtering
- ✅ Intuitive manager dashboard with practical UX decisions
- ✅ Professional public-facing property pages
- ✅ Scalable architecture with clear upgrade paths
- ✅ Thorough research on external API integration

The system is production-ready for demo purposes and provides a solid foundation for scaling with a real database, authentication, and live API integrations.

