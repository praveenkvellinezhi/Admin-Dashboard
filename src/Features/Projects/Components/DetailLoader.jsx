import React from "react";
import { Briefcase, Users, Calendar, ListChecks } from "lucide-react";

/**
 * ProjectDetailsLoader
 * 
 * A skeleton loader for the project details page that matches
 * the actual page structure with smooth animations and shimmer effects.
 */
export default function ProjectDetailsLoader() {
  return (
    <div className="bg-gray-50 min-h-screen p-6 space-y-6">
      {/* HEADER SKELETON */}
      <div className="bg-[#F3F6FF] px-6 py-4 rounded-md animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-300 rounded w-40"></div>
          <div className="flex items-center gap-3">
            <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-28"></div>
          </div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-64 mt-2"></div>
      </div>

      {/* CONTENT AREA */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT - OVERVIEW SKELETON */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
              
              {/* Header with animated pulse */}
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="h-7 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-2/3 animate-shimmer bg-[length:200%_100%]"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                </div>
              </div>

              {/* Info Grid with Icons */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[Briefcase, Users, Calendar, Calendar].map((Icon, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 border bg-gray-100 border-gray-200 rounded-xl p-4"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="text-gray-300 animate-pulse">
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Client Contact Skeleton */}
              <div className="bg-gray-100 border border-gray-200 rounded-2xl p-5 animate-pulse">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gray-300 rounded-lg w-8 h-8"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-200 rounded-full w-8 h-8"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-300 rounded w-40"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-200 rounded-full w-8 h-8"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members Skeleton */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="text-gray-300 animate-pulse">
                    <Users size={16} />
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gray-300 border border-gray-200 animate-pulse"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-28"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - METRICS SKELETON */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
                <div className="h-5 bg-gray-300 rounded w-40"></div>

                {/* Metric Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[ListChecks, ListChecks, ListChecks, ListChecks].map((Icon, idx) => (
                    <div 
                      key={idx}
                      className="border border-gray-200 rounded-xl p-4 text-center space-y-2 animate-pulse"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="mx-auto text-gray-300 flex justify-center">
                        <Icon size={20} />
                      </div>
                      <div className="h-8 bg-gray-300 rounded w-16 mx-auto"></div>
                      <div className="h-3 bg-gray-200 rounded w-20 mx-auto"></div>
                    </div>
                  ))}
                </div>

                {/* Budget Overview */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gray-400 to-gray-300 rounded-full w-0 animate-progress"></div>
                  </div>

                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex justify-between animate-pulse">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PHASES SKELETON */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-[280px] bg-white border border-gray-200 rounded-2xl p-5 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="h-5 bg-gray-300 rounded w-24"></div>
                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
              </div>

              <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>

              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-6"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>

              <div className="space-y-2 mb-5">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded flex-1"></div>
                  </div>
                ))}
              </div>

              <div className="flex -space-x-2 mb-4">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
                  ></div>
                ))}
              </div>

              <div className="flex justify-between mb-2">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-300 rounded w-12"></div>
              </div>

              <div className="w-full h-2 rounded-full bg-gray-200"></div>
            </div>
          ))}
        </div>
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

        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 0%;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}