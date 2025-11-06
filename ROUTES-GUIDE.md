# Flex Living - Routes & Features Guide

Quick reference for all available routes and their features.

---

## 🏠 Public Routes

### Home Page
```
http://localhost:3000/
```
**What you'll see:**
- Hero section with Flex Living branding
- 5 property cards
- Links to dashboard and properties
- Quick links section

**Features:**
- Click any property card to view details
- "Manager Dashboard" button in hero
- Responsive grid layout

---

### Property Detail Pages
```
http://localhost:3000/property/prop-001
http://localhost:3000/property/prop-002
http://localhost:3000/property/prop-003
http://localhost:3000/property/prop-004
http://localhost:3000/property/prop-005
```

**What you'll see:**
- Property images (placeholder gradients)
- Property name, location, stats
- Amenities list
- Pricing information
- **Guest Reviews section** (only selected reviews)
- Overall rating and category breakdown
- Sticky booking card (desktop)

**Features:**
- Read manager-approved reviews
- See category performance (cleanliness, location, etc.)
- View pricing details
- Back to home navigation

**Example Properties:**
- `prop-001`: Modern 2BR Shoreditch Heights
- `prop-002`: Kings Cross Station Apartment
- `prop-003`: Camden Market Loft
- `prop-004`: Penthouse with Rooftop Terrace ⭐ Premium
- `prop-005`: Charming Notting Hill Flat

---

## 👨‍💼 Manager Routes

### Dashboard
```
http://localhost:3000/dashboard
```

**What you'll see:**
- Stats cards (total reviews, avg rating, selected count)
- Filter panel (8 filter options)
- Rating trend chart (6-month view)
- Reviews table with selection checkboxes
- Review count and selected count

**Features:**

#### Filters Available:
1. **Property** - Select from 5 properties or "All Properties"
2. **Channel** - Airbnb, Booking.com, Direct, Vrbo, Expedia
3. **Review Type** - Guest-to-host, Host-to-guest
4. **Min Rating** - 0-10 scale
5. **Date From** - Start date
6. **Date To** - End date
7. **Sort By** - Date or Rating
8. **Order** - Ascending or Descending

#### Actions Available:
- ✅ Check boxes to select reviews for public display
- 🔍 Filter reviews by multiple criteria
- 📊 View rating trends over time
- 📈 See key metrics at a glance
- 👁️ Expand reviews to see category ratings
- 🔄 Clear all filters

**Try This:**
1. Set "Min Rating" to 9
2. Select "Property": "Penthouse with Rooftop Terrace"
3. Check 3-4 reviews
4. Visit property page to see them displayed

---

## 🔌 API Routes

### Get Reviews (Main Endpoint)
```
http://localhost:3000/api/reviews/hostaway
```

**Returns:** All 30 reviews in JSON format

**Query Examples:**

#### Filter by Property
```
/api/reviews/hostaway?propertyId=prop-001
```
Returns: Reviews for Shoreditch Heights only

#### Filter by Rating
```
/api/reviews/hostaway?minRating=9
```
Returns: Only reviews with rating ≥ 9

#### Filter by Channel
```
/api/reviews/hostaway?channel=Airbnb
```
Returns: Only Airbnb reviews

#### Filter by Date
```
/api/reviews/hostaway?dateFrom=2024-09-01&dateTo=2024-10-31
```
Returns: Reviews from Sept-Oct 2024

#### Combined Filters
```
/api/reviews/hostaway?propertyId=prop-004&minRating=9&sortBy=rating&sortOrder=desc
```
Returns: High-rated Penthouse reviews, sorted by rating

#### All Parameters:
| Parameter | Example | Description |
|-----------|---------|-------------|
| `propertyId` | `prop-001` | Filter by property |
| `channel` | `Airbnb` | Filter by booking channel |
| `dateFrom` | `2024-09-01` | Start date (ISO format) |
| `dateTo` | `2024-10-31` | End date (ISO format) |
| `minRating` | `8` | Minimum rating (0-10) |
| `maxRating` | `10` | Maximum rating (0-10) |
| `reviewType` | `guest-to-host` | Review type |
| `sortBy` | `rating` | Sort field (date/rating) |
| `sortOrder` | `desc` | Sort direction (asc/desc) |

---

### Get Selected Reviews
```
http://localhost:3000/api/reviews/selections
```

**Returns:**
```json
{
  "status": "success",
  "selectedIds": [1001, 1002, 1005],
  "result": {
    "selections": [...],
    "lastUpdated": "2024-11-06T..."
  }
}
```

---

### Toggle Review Selection
```
POST http://localhost:3000/api/reviews/selections
Content-Type: application/json

{"reviewId": 1001}
```

**Returns:**
```json
{
  "status": "success",
  "reviewId": 1001,
  "selected": true,
  "message": "Review selected for public display"
}
```

---

## 🎨 UI Components Available

### Shared Components (`/components/ui/`)
- **Button** - Primary, secondary, outline, ghost variants
- **Card** - Container with shadow
- **Badge** - Colored labels (success, error, info, etc.)
- **StarRating** - 5-star display with 0-10 input
- **Loading** - Spinner with message

### Dashboard Components (`/components/dashboard/`)
- **FilterPanel** - Multi-criteria filtering
- **ReviewsTable** - Expandable review list
- **RatingTrendChart** - 6-month line chart
- **StatsCards** - Key metrics display

### Property Components (`/components/property/`)
- **PropertyHeader** - Title, rating, location
- **PropertyImages** - Image gallery
- **PropertyDetails** - Description, amenities, pricing
- **ReviewsSection** - Selected reviews display

---

## 🎯 User Journeys

### Journey 1: Manager Selects Reviews

1. Start at **Home** (`/`)
2. Click "Manager Dashboard"
3. **Dashboard** loads with 30 reviews
4. Set filter: "Min Rating" = 9
5. Set filter: "Property" = "Penthouse"
6. See 5 high-rated reviews
7. Check 3 reviews
8. Selection count updates automatically
9. Click "Back to Home"
10. Click "Penthouse with Rooftop Terrace"
11. **Property Page** shows your 3 selected reviews ✓

### Journey 2: Guest Views Property

1. Start at **Home** (`/`)
2. Browse 5 property cards
3. Click "Kings Cross Station Apartment"
4. **Property Page** opens
5. Read property details
6. Scroll to "Guest Reviews"
7. See only manager-approved reviews
8. View overall rating and category breakdown
9. Read individual review cards
10. Click "Back to Home"

### Journey 3: Testing API

1. Open browser
2. Navigate to `/api/reviews/hostaway`
3. See all 30 reviews in JSON
4. Add query: `?propertyId=prop-001`
5. See filtered results
6. Try: `?minRating=9&sortBy=rating`
7. Verify sorting and filtering
8. Navigate to `/api/reviews/selections`
9. See empty or selected review IDs

---

## 🔍 Quick Tests

### Test 1: Filter Functionality
1. Go to `/dashboard`
2. Set "Channel" = "Airbnb"
3. Verify only Airbnb reviews shown
4. Click "Clear all"
5. Verify all reviews return

### Test 2: Review Selection
1. Go to `/dashboard`
2. Check any review checkbox
3. Refresh page
4. Verify checkbox still checked (persistence)

### Test 3: Property Display
1. Go to `/dashboard`
2. Filter: "Property" = "prop-001"
3. Check 2-3 reviews
4. Visit `/property/prop-001`
5. Verify only your selected reviews appear

### Test 4: Responsive Design
1. Open `/dashboard`
2. Resize browser to mobile width
3. Verify filters stack vertically
4. Verify table scrolls horizontally
5. Verify stats cards stack

### Test 5: API Filtering
1. Open `/api/reviews/hostaway?propertyId=prop-004&minRating=9`
2. Count results
3. Verify all are for prop-004
4. Verify all have rating ≥ 9
5. Check response structure

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
  - Single column layout
  - Stacked stats cards
  - Vertical filters
  - Horizontal table scroll

- **Tablet**: 768px - 1024px
  - 2-column grid
  - Side-by-side stats
  - Compact filters

- **Desktop**: > 1024px
  - Full multi-column
  - Sidebar layouts
  - Optimal spacing

---

## 🚀 Performance Tips

**Fast Loading:**
- Home page: < 100ms
- Dashboard: < 200ms (includes API call)
- Property pages: < 150ms
- API responses: < 50ms

**Optimization Features:**
- Server-side rendering
- Code splitting
- Lazy loading
- Minimal bundle size

---

## 🎓 For Developers

**File Locations:**
```
Routes:
- / → app/page.tsx
- /dashboard → app/dashboard/page.tsx
- /property/[id] → app/property/[id]/page.tsx
- /api/reviews/hostaway → app/api/reviews/hostaway/route.ts
- /api/reviews/selections → app/api/reviews/selections/route.ts

Components:
- Dashboard → components/dashboard/
- Property → components/property/
- Shared → components/ui/

Data:
- Reviews → data/mock-reviews.json (30 reviews)
- Properties → data/properties.json (5 properties)
- Selections → data/review-selections.json (your selections)

Logic:
- Filtering → lib/hostaway.ts
- Storage → lib/storage.ts
- Types → lib/types.ts
```

---

## 🎯 Quick Access Links

Once `npm run dev` is running:

**Public:**
- 🏠 [Home](http://localhost:3000/)
- 🏢 [Property 1](http://localhost:3000/property/prop-001)
- 🏢 [Property 4 (Penthouse)](http://localhost:3000/property/prop-004)

**Manager:**
- 📊 [Dashboard](http://localhost:3000/dashboard)

**API:**
- 📡 [All Reviews](http://localhost:3000/api/reviews/hostaway)
- 📡 [High-Rated](http://localhost:3000/api/reviews/hostaway?minRating=9)
- 📡 [Selections](http://localhost:3000/api/reviews/selections)

---

**Happy Testing! 🎉**

