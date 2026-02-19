import React from 'react';
import {
  ChevronDown,
  Calendar,
  LogIn,
  LogOut,
  Clock,
  User,
} from 'lucide-react';

export default function AttendanceList({ rows }) {
  return (
    <div className=" px-4 py-8">
      <div className="space-y-4">
        {rows.map((item) => {
          const isLeave = !item.checkIn;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-6 flex items-center justify-between transition
                ${
                  isLeave
                    ? 'bg-red-50 border-red-200'
                    : 'bg-emerald-50 border-emerald-200'
                }`}
            >
              <div className="flex-1">
                {/* Name + ID */}
                <div className="flex items-center gap-3 mb-1">
                  <User className="w-4 h-4 text-gray-500" />
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">
                    {item.id}
                  </span>
                </div>

                {/* Role */}
                <p className="text-sm text-gray-600 mb-2">
                  {item.role || item.internRole || '—'}
                </p>

                {/* DATE + TIME INFO */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span>{item.date}</span>

                  {!isLeave && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-emerald-600">
                        <LogIn className="w-4 h-4" />
                        {item.checkIn}
                      </div>

                      <span>•</span>
                      <div className="flex items-center gap-1 text-blue-600">
                        <LogOut className="w-4 h-4" />
                        {item.checkOut}
                      </div>

                      <span>•</span>
                      <div className="flex items-center gap-1 text-orange-600">
                        <Clock className="w-4 h-4" />
                        {item.overtime || '0 hrs'}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isLeave ? (
                  <span className="bg-red-500 text-white text-sm px-4 py-1 rounded-full">
                    On Leave
                  </span>
                ) : (
                  <span className="bg-emerald-500 text-white text-sm px-4 py-1 rounded-full">
                    Present
                  </span>
                )}

                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
