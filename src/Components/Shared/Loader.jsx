import React from "react";

export default function Loader() {
  return (
    <div className="animate-fadeIn">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]" />
          <div className="flex gap-3">
            <div className="h-10 w-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]" />
            <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]" />
          </div>
        </div>
      </div>

      {/* View Toggle Skeleton */}
      <div className="flex justify-end gap-2 mb-4">
        <div className="h-10 w-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded border animate-shimmer bg-[length:200%_100%]" />
        <div className="h-10 w-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded border animate-shimmer bg-[length:200%_100%]" />
      </div>

      {/* Project Cards Grid Skeleton */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Logo Skeleton */}
            <div className="w-28 h-28 mx-auto mb-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]" />

            {/* Title Skeleton */}
            <div className="space-y-3 text-center">
              <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%] mx-auto w-3/4" />
              
              {/* Description Skeleton */}
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%] mx-auto w-full" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%] mx-auto w-2/3" />
              
              {/* Tech Stack Skeleton */}
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%] mx-auto w-1/2" />
            </div>

            {/* Meta Section Skeleton */}
            <div className="mt-4 bg-[#F8F8F8] p-4 rounded-xl space-y-3">
              {/* Dates */}
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-12 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-shimmer bg-[length:200%_100%]" />
                  <div className="h-4 w-20 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-shimmer bg-[length:200%_100%]" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-12 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-shimmer bg-[length:200%_100%]" />
                  <div className="h-4 w-20 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-shimmer bg-[length:200%_100%]" />
                </div>
              </div>

              {/* Team Members */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full border-2 border-white animate-shimmer bg-[length:200%_100%]"
                      style={{ animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <div className="h-3 w-20 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-shimmer bg-[length:200%_100%]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}