import React from 'react';
import { Search, CalendarDays } from 'lucide-react';

export default function AttendanceHeader({
  activeTab,
  setActiveTab,
  setSearch,
  setDate,
}) {
  return (
    <div
      className="
        w-full bg-white rounded-xl shadow-sm 
        p-4 sm:p-5 
        flex flex-col lg:flex-row 
        items-start lg:items-center 
        justify-between gap-6
      "
    >
      <div className="flex flex-col gap-4 w-full">
        <h1
          className="
            text-[32px] sm:text-[30px] lg:text-[40px]
            font-poppins font-bold leading-none
            bg-black
            bg-clip-text text-transparent
          "
        >
          Attendance
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full">
          <div
            className="
              flex items-center 
              w-full sm:w-64 
              bg-gray-100 px-3 py-2 rounded-lg
            "
          >
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search here..."
              className="ml-2 bg-transparent outline-none w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div
            className="
              flex items-center 
              w-full sm:w-auto 
              bg-gray-100 px-3 py-2 rounded-lg
            "
          >
            <input
              type="date"
              className="bg-transparent outline-none w-full"
              onChange={(e) => setDate(e.target.value)}
            />
            <CalendarDays className="w-4 h-4 text-gray-500 ml-2 sm:ml-3" />
          </div>
        </div>
      </div>

      <div
        className="
          flex w-full lg:w-auto 
          justify-between sm:justify-start 
          bg-gray-100 rounded p-1
        "
      >
        <button
          onClick={() => setActiveTab('employees')}
          className={`
            flex-1 sm:flex-none 
            px-4 py-2 rounded transition-all duration-200
            ${
              activeTab === 'employees'
                ? 'bg-black text-white shadow-md'
                : 'text-gray-600'
            }
          `}
        >
          Employees
        </button>

        <button
          onClick={() => setActiveTab('interns')}
          className={`
            flex-1 sm:flex-none 
            px-4 py-2 rounded transition-all duration-200
            ${
              activeTab === 'interns'
                ? 'bg-black text-white shadow-md'
                : 'text-gray-600'
            }
          `}
        >
          Interns
        </button>
      </div>
    </div>
  );
}
