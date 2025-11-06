'use client';

import Link from 'next/link';
import { Home, Building2 } from 'lucide-react';

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Building2 className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Property Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the property you're looking for. It may have been removed or the URL might be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            View All Properties
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

