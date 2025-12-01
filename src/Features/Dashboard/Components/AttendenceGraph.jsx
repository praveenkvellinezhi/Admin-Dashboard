import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  YAxis,
} from "recharts";
import { ChevronDown, BarChart3 } from "lucide-react";

const months = ["Month", "Week", "Year"];

const monthData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 60 },
  { name: "Mar", value: 70 },
  { name: "Apr", value: 95 },
  { name: "May", value: 55 },
  { name: "Jun", value: 35 },
  { name: "Jul", value: 65 },
];

const weekData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 50 },
  { name: "Thu", value: 30 },
  { name: "Fri", value: 70 },
  { name: "Sat", value: 40 },
  { name: "Sun", value: 55 },
];

const yearData = [
  { name: "2021", value: 300 },
  { name: "2022", value: 400 },
  { name: "2023", value: 500 },
  { name: "2024", value: 450 },
];

export default function AttendanceGraph({ month = "Month" }) {
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(month);

  const chartData =
    selectedMonth === "Month"
      ? monthData
      : selectedMonth === "Week"
      ? weekData
      : yearData;

  return (
    <div className="w-full bg-[#FFFDEB] rounded-3xl shadow-lg p-4 sm:p-6 h-[320px] sm:h-[380px]">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>

          <h3 className="font-semibold text-lg sm:text-xl text-gray-800">
            Attendance Graph
          </h3>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 border px-3 py-1 rounded-full bg-white shadow-sm text-sm sm:text-base"
            onClick={() => setOpen(!open)}
          >
            {selectedMonth}
            <ChevronDown className="w-4 h-4" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-lg border z-50">
              {months.map((m, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setSelectedMonth(m);
                    setOpen(false);
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[180px] sm:h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barCategoryGap="20%"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
            <YAxis domain={[0, "dataMax"]} hide />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            <Bar
              dataKey="value"
              fill="url(#blueGradient)"
              radius={[12, 12, 12, 12]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mt-3">
        <span>
          {selectedMonth === "Month"
            ? "Jan — Jul"
            : selectedMonth === "Week"
            ? "Mon — Sun"
            : "2021 — 2024"}
        </span>
        <span>Highest: Apr</span>
      </div>
    </div>
  );
}
