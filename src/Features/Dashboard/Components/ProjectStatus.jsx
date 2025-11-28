import React from "react";

export default function ProjectStatus({ completed = 80 }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full">
      <h3 className="font-semibold text-gray-800 mb-4">Project Status</h3>

      <div className="flex items-center justify-between">

        {/* Donut Chart */}
        <div className="relative w-28 h-28">
          {/* Background Circle */}
          <svg className="w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="#e5e7eb"
              strokeWidth="20"
              fill="transparent"
            />
          </svg>

          {/* Green Progress */}
          <svg className="w-full h-full absolute top-0 left-0 rotate-[-90deg]">
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="green"
              strokeWidth="20"
              fill="transparent"
              strokeDasharray="251"
              strokeDashoffset={251 - (251 * completed) / 100}
              strokeLinecap="round"
            />
          </svg>

          {/* Inner Text */}
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-black">
            {completed}%
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-5 h-4 bg-green-600 rounded"></span>
            <span className="text-sm font-medium">Completed</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-5 h-4 bg-red-600 rounded"></span>
            <span className="text-sm font-medium">Non-Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
