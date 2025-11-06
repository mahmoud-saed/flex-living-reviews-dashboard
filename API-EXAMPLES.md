# API Usage Examples

This document provides practical examples for testing the Flex Living Reviews API endpoints.

## Base URL
```
http://localhost:3000/api/reviews
```

## 1. Hostaway Reviews API

### Endpoint
```
GET /api/reviews/hostaway
```

### Example 1: Get All Reviews
```bash
curl http://localhost:3000/api/reviews/hostaway
```

**Response:**
```json
{
  "status": "success",
  "result": [...],
  "count": 30,
  "filters": {}
}
```

### Example 2: Filter by Property
```bash
curl "http://localhost:3000/api/reviews/hostaway?propertyId=prop-001"
```

**Expected**: Returns only reviews for "Modern 2BR Shoreditch Heights"

### Example 3: Filter by Channel
```bash
curl "http://localhost:3000/api/reviews/hostaway?channel=Airbnb"
```

**Expected**: Returns only Airbnb reviews

### Example 4: Filter by Rating Range
```bash
curl "http://localhost:3000/api/reviews/hostaway?minRating=9"
```

**Expected**: Returns only reviews with rating ≥ 9

### Example 5: Filter by Date Range
```bash
curl "http://localhost:3000/api/reviews/hostaway?dateFrom=2024-09-01&dateTo=2024-10-31"
```

**Expected**: Returns reviews from September-October 2024

### Example 6: Multiple Filters Combined
```bash
curl "http://localhost:3000/api/reviews/hostaway?propertyId=prop-004&minRating=9&channel=Direct&sortBy=rating&sortOrder=desc"
```

**Expected**: Penthouse reviews from Direct channel with rating ≥ 9, sorted by rating (highest first)

### Example 7: Guest Reviews Only
```bash
curl "http://localhost:3000/api/reviews/hostaway?reviewType=guest-to-host"
```

**Expected**: Only guest-to-host reviews (excludes host-to-guest)

### Example 8: Sort by Date
```bash
curl "http://localhost:3000/api/reviews/hostaway?sortBy=date&sortOrder=asc"
```

**Expected**: Reviews sorted by date, oldest first

## 2. Review Selections API

### Endpoint
```
GET/POST /api/reviews/selections
```

### Example 1: Get Current Selections
```bash
curl http://localhost:3000/api/reviews/selections
```

**Response:**
```json
{
  "status": "success",
  "result": {
    "selections": [
      {
        "reviewId": 1001,
        "selectedAt": "2024-11-06T..."
      }
    ],
    "lastUpdated": "2024-11-06T..."
  },
  "selectedIds": [1001, 1002, 1005]
}
```

### Example 2: Toggle Single Review Selection
```bash
curl -X POST http://localhost:3000/api/reviews/selections \
  -H "Content-Type: application/json" \
  -d '{"reviewId": 1001}'
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

### Example 3: Bulk Select Multiple Reviews
```bash
curl -X POST http://localhost:3000/api/reviews/selections \
  -H "Content-Type: application/json" \
  -d '{
    "reviewIds": [1001, 1002, 1003, 1005, 1007],
    "selected": true
  }'
```

**Response:**
```json
{
  "status": "success",
  "count": 5,
  "selected": true,
  "message": "5 reviews updated"
}
```

### Example 4: Bulk Deselect Reviews
```bash
curl -X POST http://localhost:3000/api/reviews/selections \
  -H "Content-Type: application/json" \
  -d '{
    "reviewIds": [1001, 1002],
    "selected": false
  }'
```

**Response:**
```json
{
  "status": "success",
  "count": 2,
  "selected": false,
  "message": "2 reviews updated"
}
```

## Testing Workflow

### Scenario: Manager Selects Best Reviews for Property

1. **Get all reviews for a property with high ratings:**
```bash
curl "http://localhost:3000/api/reviews/hostaway?propertyId=prop-001&minRating=9&reviewType=guest-to-host"
```

2. **Note the review IDs from the response** (e.g., 1001, 1007, 1028)

3. **Select those reviews for public display:**
```bash
curl -X POST http://localhost:3000/api/reviews/selections \
  -H "Content-Type: application/json" \
  -d '{
    "reviewIds": [1001, 1007, 1028],
    "selected": true
  }'
```

4. **Verify selections:**
```bash
curl http://localhost:3000/api/reviews/selections
```

5. **View on public page:**
```
http://localhost:3000/property/prop-001
```

## Data Normalization Examples

### Input (Hostaway Format):
```json
{
  "id": 1001,
  "type": "guest-to-host",
  "rating": null,
  "publicReview": "Amazing apartment!",
  "reviewCategory": [
    {"category": "cleanliness", "rating": 10},
    {"category": "communication", "rating": 9},
    {"category": "location", "rating": 10}
  ],
  "submittedAt": "2024-10-15T14:30:00Z"
}
```

### Output (Normalized):
```json
{
  "id": 1001,
  "type": "guest-to-host",
  "rating": null,
  "averageRating": 9.7,
  "publicReview": "Amazing apartment!",
  "reviewCategory": [
    {"category": "cleanliness", "rating": 10},
    {"category": "communication", "rating": 9},
    {"category": "location", "rating": 10}
  ],
  "submittedAt": "2024-10-15T14:30:00Z",
  "submittedDate": "2024-10-15T14:30:00.000Z"
}
```

**Key Changes:**
- ✅ `averageRating` calculated: (10 + 9 + 10) / 3 = 9.7
- ✅ `submittedDate` added as Date object
- ✅ All fields preserved from original

## Error Handling

### Invalid Property ID
```bash
curl "http://localhost:3000/api/reviews/hostaway?propertyId=invalid"
```

**Response:** Returns empty result array (not an error)

### Invalid Review ID for Selection
```bash
curl -X POST http://localhost:3000/api/reviews/selections \
  -H "Content-Type: application/json" \
  -d '{"reviewId": 99999}'
```

**Response:** Request succeeds (idempotent), but review won't appear on public pages

### Missing Request Body
```bash
curl -X POST http://localhost:3000/api/reviews/selections \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Response:**
```json
{
  "status": "error",
  "message": "Invalid request body. Provide reviewId or reviewIds."
}
```

## Performance Notes

- Average response time: < 50ms
- No database queries (reads from JSON files)
- All filtering done in memory
- Suitable for demo/prototype purposes

## Browser Testing

Open these URLs directly in your browser:

- All reviews: http://localhost:3000/api/reviews/hostaway
- Filtered: http://localhost:3000/api/reviews/hostaway?propertyId=prop-001&minRating=8
- Selections: http://localhost:3000/api/reviews/selections

## Next.js Dev Tools

When running `npm run dev`, you can also test APIs through the Next.js development interface.

---

**Note:** Make sure the development server is running (`npm run dev`) before testing these endpoints.

