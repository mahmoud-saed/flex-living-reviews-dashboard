#!/bin/bash

# Flex Living API Testing Script
# Run this after starting the dev server (npm run dev)

echo "🧪 Testing Flex Living Reviews API"
echo "=================================="
echo ""

BASE_URL="http://localhost:3000/api/reviews"

echo "1️⃣ Testing GET /api/reviews/hostaway (all reviews)"
echo "---------------------------------------------------"
curl -s "${BASE_URL}/hostaway" | head -c 500
echo "..."
echo ""
echo ""

echo "2️⃣ Testing filter by property (prop-001)"
echo "---------------------------------------------------"
curl -s "${BASE_URL}/hostaway?propertyId=prop-001" | grep -o '"count":[0-9]*'
echo ""
echo ""

echo "3️⃣ Testing filter by min rating (9+)"
echo "---------------------------------------------------"
curl -s "${BASE_URL}/hostaway?minRating=9" | grep -o '"count":[0-9]*'
echo ""
echo ""

echo "4️⃣ Testing filter by channel (Airbnb)"
echo "---------------------------------------------------"
curl -s "${BASE_URL}/hostaway?channel=Airbnb" | grep -o '"count":[0-9]*'
echo ""
echo ""

echo "5️⃣ Testing combined filters"
echo "---------------------------------------------------"
curl -s "${BASE_URL}/hostaway?propertyId=prop-004&minRating=9&sortBy=rating" | grep -o '"count":[0-9]*'
echo ""
echo ""

echo "6️⃣ Testing GET /api/reviews/selections"
echo "---------------------------------------------------"
curl -s "${BASE_URL}/selections"
echo ""
echo ""

echo "✅ All API tests completed!"
echo "=================================="
echo ""
echo "For detailed responses, open these URLs in your browser:"
echo "• All reviews: ${BASE_URL}/hostaway"
echo "• Filtered: ${BASE_URL}/hostaway?propertyId=prop-001&minRating=9"
echo "• Selections: ${BASE_URL}/selections"

