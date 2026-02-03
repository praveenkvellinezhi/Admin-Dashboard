import React from "react";
import { useSelector } from "react-redux";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { selectProjectStatus } from "../../../Redux/Slices/statsSlice";

export default function ProjectStatus() {
  const { completed, ongoing, pending } = useSelector(
    selectProjectStatus
  );

  return (
    <div className="bg-white rounded-3xl shadow-md p-5 w-full">
      <h3 className="font-semibold text-gray-800 mb-5 text-lg">
        Project Status
      </h3>

      {/* TOP CIRCLES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatusCard
          label="Completed"
          value={completed}
          color="#22c55e"
        />
        <StatusCard
          label="Ongoing"
          value={ongoing}
          color="#facc15"
        />
        <StatusCard
          label="Pending"
          value={pending}
          color="#6366f1"
        />
      </div>

      {/* OVERALL PROGRESS */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Progress</span>
          <span>{completed}% Complete</span>
        </div>

        <div className="flex h-3 w-full rounded-full overflow-hidden bg-gray-200">
          <div
            style={{ width: `${completed}%` }}
            className="bg-green-500"
          />
          <div
            style={{ width: `${ongoing}%` }}
            className="bg-yellow-400"
          />
          <div
            style={{ width: `${pending}%` }}
            className="bg-indigo-500"
          />
        </div>

        {/* LEGEND */}
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
          <Legend color="bg-green-500" label="Completed" />
          <Legend color="bg-yellow-400" label="Ongoing" />
          <Legend color="bg-indigo-500" label="Pending" />
        </div>
      </div>
    </div>
  );
}

/* =========================
   SUB COMPONENTS
========================= */

function StatusCard({ value, label, color }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 flex flex-col items-center gap-3">
      <div className="w-[90px]">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: color,
            trailColor: "#e5e7eb",
            textColor: "#111827",
            textSize: "18px",
          })}
        />
      </div>
      <span className="text-sm font-medium text-gray-700">
        {label}
      </span>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}
