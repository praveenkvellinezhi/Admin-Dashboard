import React from "react";


function Skeleton({ className = "", style = {} }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      style={style}
    />
  );
}

/* =========================
   STAT CARD SKELETON
========================= */
function StatCardSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}

/* =========================
   PROJECT CARD SKELETON
========================= */
function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
    </div>
  );
}

/* =========================
   ONGOING PROJECTS SKELETON
========================= */
function OngoingProjectsSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>

      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/* =========================
   GRAPH SKELETON
========================= */
function GraphSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      <div className="flex items-end justify-between gap-2 h-40 pt-4">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-2"
          >
            <Skeleton
              className="w-full rounded-t-md"
              style={{ height: `${Math.random() * 60 + 40}%` }}
            />
            <Skeleton className="h-3 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   PROJECT STATUS SKELETON
========================= */
function ProjectStatusSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 space-y-4 shadow-sm">
      <Skeleton className="h-5 w-28" />

      <div className="flex items-center justify-center py-4">
        <div className="relative">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="absolute inset-4 rounded-full bg-white" />
        </div>
      </div>

      <div className="flex justify-center gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   DASHBOARD LOADER
========================= */
export default function DashboardLoader() {
  return (
    <div className="w-full p-3 sm:p-4 lg:p-6 space-y-6 animate-fade-in">

      {/* Loading Indicator */}
      <div className="flex items-center gap-3 mb-2">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
        </div>
        <span className="text-sm text-gray-500">
          Loading dashboard...
        </span>
      </div>

      {/* Stats Skeleton */}
      <StatCardSkeleton />

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        <OngoingProjectsSkeleton />

        <div className="flex flex-col gap-4 lg:gap-6 w-full">
          <GraphSkeleton />
          <ProjectStatusSkeleton />
        </div>
      </div>
    </div>
  );
}
