# Quick Start Guide

Get the Flex Living Reviews Dashboard up and running in under 2 minutes!

## Prerequisites

- Node.js 18 or higher installed
- Terminal/Command prompt access

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```
*This will take 30-60 seconds*

### 2. Start Development Server
```bash
npm run dev
```
*Server starts at http://localhost:3000*

### 3. Open in Browser

**Home Page:**
```
http://localhost:3000
```

**Manager Dashboard:**
```
http://localhost:3000/dashboard
```

**Property Pages (examples):**
```
http://localhost:3000/property/prop-001
http://localhost:3000/property/prop-002
http://localhost:3000/property/prop-004
```

## First Steps

### For Managers

1. Go to http://localhost:3000/dashboard
2. Use the filter panel to narrow down reviews
3. Check the boxes next to reviews you want to display publicly
4. Selections save automatically!

### For Testing the API

1. Open http://localhost:3000/api/reviews/hostaway in your browser
2. See all reviews in JSON format
3. Try adding filters:
   - `?propertyId=prop-001`
   - `?minRating=9`
   - `?channel=Airbnb`

## Quick Demo Scenario

Want to see the full workflow? Follow these steps:

1. **View all properties**
   - Go to http://localhost:3000
   - Note the 5 properties listed

2. **Open the dashboard**
   - Click "Manager Dashboard" button
   - See 30 reviews loaded

3. **Filter for great reviews**
   - Set "Min Rating" to 9
   - Select "Property": "Penthouse with Rooftop Terrace"
   - See only high-rated reviews for that property

4. **Select reviews for display**
   - Check 3-4 reviews you want to show publicly
   - Notice the "Selected for Display" count updates

5. **View on public page**
   - Click "Back to Home" or go to http://localhost:3000
   - Click "Penthouse with Rooftop Terrace" property card
   - Scroll down to "Guest Reviews" section
   - See ONLY the reviews you selected!

## Common Tasks

### Reset Review Selections
Delete or edit `data/review-selections.json` and restart the server.

### Add More Mock Reviews
Edit `data/mock-reviews.json` - follow the existing format.

### View API Response
```bash
curl http://localhost:3000/api/reviews/hostaway
```

### Build for Production
```bash
npm run build
npm start
```

## Troubleshooting

**Port 3000 already in use?**
```bash
# Kill the process using port 3000, or use a different port:
PORT=3001 npm run dev
```

**Dependencies won't install?**
```bash
# Clear cache and reinstall:
rm -rf node_modules package-lock.json
npm install
```

**Changes not showing up?**
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check the terminal for any errors

## Need More Help?

- **Full documentation**: See `DOCUMENTATION.md`
- **API examples**: See `API-EXAMPLES.md`
- **Testing checklist**: See `TESTING.md`
- **Setup instructions**: See `README.md`

## Project Structure at a Glance

```
📁 app/
  📁 api/reviews/          ← API endpoints
  📁 dashboard/            ← Manager interface
  📁 property/[id]/        ← Property pages
  📄 page.tsx              ← Home page

📁 data/
  📄 mock-reviews.json     ← 30 sample reviews
  📄 review-selections.json ← Your selections

📁 components/
  📁 dashboard/            ← Dashboard UI
  📁 property/             ← Property page UI
  📁 ui/                   ← Shared components
```

## What to Explore

✨ **Manager Experience:**
- Filter reviews by multiple criteria
- View rating trends over time
- Select reviews for public display
- See stats at a glance

✨ **Guest Experience:**
- Browse properties
- Read curated reviews
- See detailed ratings by category

✨ **Developer Experience:**
- Clean, typed API responses
- Real-time filtering
- Responsive design
- Modern React patterns

---

**You're all set! 🎉**

Start by opening http://localhost:3000/dashboard and exploring the reviews.

