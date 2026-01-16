"use client";

export default function ContactUs() {
  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">
          Online Booking Unavailable
        </h3>

        <p className="text-gray-600 mb-6">
          Our program cycles are starting soon, and online booking is no longer
          available. However, we may still have spaces available!
        </p>

        <div className="bg-white rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-2">Contact us directly at:</p>
          <a
            href="mailto:bookings@nextgemscamp.com"
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            bookings@nextgemscamp.com
          </a>
          <p className="text-sm text-gray-500 mt-3 mb-1">Or call us at:</p>
          <a
            href="tel:+441234567890"
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            +44 1234 567890
          </a>
        </div>

        <div className="space-y-2 text-left text-sm text-gray-600">
          <p className="font-medium text-gray-700">Why contact us directly?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check real-time availability</li>
            <li>Discuss payment options</li>
            <li>Get answers to your questions</li>
            <li>Secure your spot with personalized assistance</li>
          </ul>
        </div>

        <div className="mt-6 pt-6 border-t border-amber-200">
          <a
            href="/"
            className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}
