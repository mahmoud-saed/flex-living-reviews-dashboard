import Link from 'next/link';
import { Building2, LayoutDashboard } from 'lucide-react';

export default function HomePage() {
  const properties = [
    { id: 'prop-001', name: 'Modern 2BR Shoreditch Heights', location: 'Shoreditch' },
    { id: 'prop-002', name: 'Kings Cross Station Apartment', location: 'Kings Cross' },
    { id: 'prop-003', name: 'Camden Market Loft', location: 'Camden' },
    { id: 'prop-004', name: 'Penthouse with Rooftop Terrace', location: 'Mayfair' },
    { id: 'prop-005', name: 'Charming Notting Hill Flat', location: 'Notting Hill' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Flex Living
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Premium Short-Term Rentals in London
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              Manager Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Our Properties
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/property/${property.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <Building2 className="w-16 h-16 text-white opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {property.name}
                </h3>
                <p className="text-gray-600">{property.location}, London</p>
                <div className="mt-4 text-blue-600 font-medium">
                  View Details →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              For Managers
            </h3>
            <p className="text-gray-600 mb-6">
              Access the dashboard to manage reviews, select which feedback to display publicly, and monitor property performance.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Go to Dashboard →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              For Guests
            </h3>
            <p className="text-gray-600 mb-6">
              Browse our properties, read verified guest reviews, and find the perfect place for your London stay.
            </p>
            <div className="text-gray-500">
              Select a property above to view details
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Flex Living. Developer Assessment Project.
          </p>
        </div>
      </footer>
    </div>
  );
}
