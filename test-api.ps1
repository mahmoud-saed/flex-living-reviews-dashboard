# Flex Living API Testing Script (PowerShell)
# Run this after starting the dev server (npm run dev)

Write-Host "🧪 Testing Flex Living Reviews API" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$BASE_URL = "http://localhost:3000/api/reviews"

Write-Host "1️⃣ Testing GET /api/reviews/hostaway (all reviews)" -ForegroundColor Yellow
Write-Host "---------------------------------------------------" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/hostaway" -Method Get
    Write-Host "✅ Status: $($response.status)" -ForegroundColor Green
    Write-Host "📊 Total reviews: $($response.count)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "2️⃣ Testing filter by property (prop-001)" -ForegroundColor Yellow
Write-Host "---------------------------------------------------" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/hostaway?propertyId=prop-001" -Method Get
    Write-Host "✅ Filtered count: $($response.count)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "3️⃣ Testing filter by min rating (9+)" -ForegroundColor Yellow
Write-Host "---------------------------------------------------" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/hostaway?minRating=9" -Method Get
    Write-Host "✅ High-rated reviews: $($response.count)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "4️⃣ Testing filter by channel (Airbnb)" -ForegroundColor Yellow
Write-Host "---------------------------------------------------" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/hostaway?channel=Airbnb" -Method Get
    Write-Host "✅ Airbnb reviews: $($response.count)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "5️⃣ Testing combined filters" -ForegroundColor Yellow
Write-Host "---------------------------------------------------" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/hostaway?propertyId=prop-004&minRating=9&sortBy=rating" -Method Get
    Write-Host "✅ Filtered result count: $($response.count)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "6️⃣ Testing GET /api/reviews/selections" -ForegroundColor Yellow
Write-Host "---------------------------------------------------" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/selections" -Method Get
    Write-Host "✅ Status: $($response.status)" -ForegroundColor Green
    Write-Host "📌 Selected reviews: $($response.selectedIds.Count)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "✅ All API tests completed!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "For detailed responses, open these URLs in your browser:" -ForegroundColor Yellow
Write-Host "• All reviews: $BASE_URL/hostaway" -ForegroundColor White
Write-Host "• Filtered: $BASE_URL/hostaway?propertyId=prop-001&minRating=9" -ForegroundColor White
Write-Host "• Selections: $BASE_URL/selections" -ForegroundColor White

