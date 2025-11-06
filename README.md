# Flex Living - Reviews Dashboard

A comprehensive review management system for property managers to aggregate, analyze, and curate guest reviews from multiple booking channels.

## Features

### 🎯 Manager Dashboard
- **Multi-Channel Reviews**: View reviews from Airbnb, Booking.com, Direct bookings, Vrbo, and Expedia
- **Advanced Filtering**: Filter by property, channel, rating, date range, and review type
- **Real-Time Analytics**: Visual rating trends over time with interactive charts
- **Review Curation**: Select which reviews to display on public property pages
- **Detailed Insights**: Expandable review cards showing category-level ratings

### 🏠 Public Property Pages
- **Modern Design**: Airbnb-inspired layout with responsive design
- **Selected Reviews Only**: Display only manager-approved guest reviews
- **Rating Breakdown**: Overall ratings and category performance metrics
- **Booking Integration Ready**: Pricing and availability UI components

### 🔌 API Endpoints
- **`GET /api/reviews/hostaway`**: Fetch and filter normalized review data
- **`GET/POST /api/reviews/selections`**: Manage review selections for public display

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Data Storage**: JSON files (for demo purposes)

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or extract the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Access the dashboard at [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── reviews/
│   │       ├── hostaway/route.ts      # Main review API
│   │       └── selections/route.ts    # Selection management
│   ├── dashboard/page.tsx             # Manager dashboard
│   ├── property/[id]/page.tsx         # Property detail pages
│   └── page.tsx                       # Home page
├── components/
│   ├── dashboard/                     # Dashboard components
│   ├── property/                      # Property page components
│   └── ui/                            # Shared UI components
├── lib/
│   ├── hostaway.ts                    # Review data handling
│   ├── storage.ts                     # JSON file operations
│   └── types.ts                       # TypeScript definitions
└── data/
    ├── mock-reviews.json              # 30 sample reviews
    ├── review-selections.json         # Selected reviews
    └── properties.json                # Property information
```

## Usage Guide

### For Managers

1. **Access the Dashboard**
   - Navigate to `/dashboard`
   - View all reviews across properties

2. **Filter Reviews**
   - Use filter panel to narrow down reviews by:
     - Property name
     - Booking channel
     - Rating range
     - Date range
     - Review type

3. **Select Reviews for Public Display**
   - Check the box next to reviews you want to display publicly
   - Selection persists automatically
   - View count of selected reviews in stats

4. **Analyze Performance**
   - Review rating trends over 6 months
   - Check stats cards for key metrics
   - Expand reviews to see detailed category ratings

### For Guests (Public View)

1. **Browse Properties**
   - Home page lists all available properties
   - Click any property card to view details

2. **View Property Details**
   - See property description, amenities, pricing
   - Read manager-approved guest reviews
   - Check overall ratings and category breakdowns

## API Documentation

### GET `/api/reviews/hostaway`

Fetch and filter reviews with normalization.

**Query Parameters:**
- `propertyId` (string): Filter by property ID
- `channel` (string): Filter by channel (Airbnb, Booking.com, etc.)
- `dateFrom` (ISO date): Start date for range filter
- `dateTo` (ISO date): End date for range filter
- `minRating` (number): Minimum rating (0-10)
- `maxRating` (number): Maximum rating (0-10)
- `reviewType` (string): 'guest-to-host' or 'host-to-guest'
- `sortBy` (string): 'date' or 'rating'
- `sortOrder` (string): 'asc' or 'desc'

**Example Request:**
```bash
GET /api/reviews/hostaway?propertyId=prop-001&minRating=8&sortBy=date&sortOrder=desc
```

**Example Response:**
```json
{
  "status": "success",
  "result": [
    {
      "id": 1001,
      "type": "guest-to-host",
      "rating": 9,
      "averageRating": 9.2,
      "publicReview": "Amazing apartment in the heart of Shoreditch!",
      "reviewCategory": [
        {"category": "cleanliness", "rating": 10},
        {"category": "communication", "rating": 9}
      ],
      "submittedAt": "2024-10-15T14:30:00Z",
      "guestName": "Sarah Mitchell",
      "listingName": "Modern 2BR Shoreditch Heights",
      "listingId": "prop-001",
      "channel": "Airbnb"
    }
  ],
  "count": 25
}
```

### POST `/api/reviews/selections`

Toggle or bulk update review selections.

**Single Selection Toggle:**
```json
{
  "reviewId": 1001
}
```

**Bulk Update:**
```json
{
  "reviewIds": [1001, 1002, 1003],
  "selected": true
}
```

**Response:**
```json
{
  "status": "success",
  "reviewId": 1001,
  "selected": true,
  "message": "Review selected for public display"
}
```

## Data Normalization

The system normalizes reviews from different channels to a consistent format:

1. **Rating Conversion**: All ratings normalized to 0-10 scale
2. **Date Standardization**: ISO 8601 format for all timestamps
3. **Channel Mapping**: Consistent channel names across sources
4. **Average Calculation**: Computed from category ratings when overall rating unavailable
5. **Type Classification**: Clear distinction between guest-to-host and host-to-guest reviews

## Mock Data

The project includes 30 realistic mock reviews across 5 properties:
- **Modern 2BR Shoreditch Heights** (prop-001)
- **Kings Cross Station Apartment** (prop-002)
- **Camden Market Loft** (prop-003)
- **Penthouse with Rooftop Terrace** (prop-004)
- **Charming Notting Hill Flat** (prop-005)

Reviews span multiple channels and date ranges (last 5 months) with varying ratings to demonstrate filtering capabilities.

## Google Reviews Integration

See `DOCUMENTATION.md` for detailed research findings on integrating Google Places API reviews, including:
- Technical requirements
- Pricing structure
- API capabilities and limitations
- Implementation recommendations

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Setup

No environment variables required for basic functionality. All data is stored locally in JSON files.

For production deployment with external APIs:
```env
HOSTAWAY_API_KEY=your_api_key
GOOGLE_PLACES_API_KEY=your_api_key
```

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- User authentication for managers
- Real Hostaway API integration
- Google Reviews live integration
- Email notifications for new reviews
- Review response functionality
- Export to CSV/PDF
- Multi-language support

## Assessment Deliverables

✅ **Source Code**: Complete Next.js application with TypeScript
✅ **Running Version**: Local development setup with npm commands
✅ **Documentation**: 
   - This README for setup and usage
   - DOCUMENTATION.md for technical decisions and architecture
✅ **API Implementation**: `/api/reviews/hostaway` with filtering and normalization
✅ **Manager Dashboard**: Full-featured review management interface
✅ **Public Property Pages**: Display selected reviews with modern design
✅ **Google Reviews Research**: Comprehensive findings in documentation

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/flex-living-reviews-dashboard)

**Quick Deploy:**
1. Push to GitHub
2. Import to Vercel
3. Deploy (auto-detected Next.js config)

**Note:** Review selections use local file storage. For production persistence, integrate a database (see `DEPLOYMENT.md` for details).

For complete deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**

## Support

For questions or issues:
1. Check `DOCUMENTATION.md` for technical details
2. Review mock data in `/data` folder
3. Inspect API responses in browser dev tools
4. See `DEPLOYMENT.md` for Vercel deployment

## License

This project was created as a developer assessment for Flex Living.

---

**Built with ❤️ for Flex Living**
