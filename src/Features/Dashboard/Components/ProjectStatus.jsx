import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProjectStatus({ completed = 80 }) {
  const [percentage, setPercentage] = useState(0);

  // Animate number fill-up
  useEffect(() => {
    const timer = setTimeout(() => {
      if (percentage < completed) {
        setPercentage(percentage + 1);
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [percentage, completed]);

  return (
    <div className="bg-[#EFFFEB] rounded-3xl shadow-lg p-4 sm:p-6 w-full">
      <h3 className="font-semibold text-gray-800 mb-4 text-lg sm:text-xl">
        Project Status
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">

        {/* 🟢 Circular Progress Component */}
        <div style={{ width: "110px" }}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={12}
            styles={buildStyles({
              pathColor: "#16a34a",    // green
              trailColor: "#dc2626",   // red
              textColor: "#000",
              textSize: "18px",
            })}
          />
        </div>

        {/* Legend */}
        <div className="flex sm:flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-green-600 rounded"></span>
            <span className="text-sm font-medium">Completed</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-red-600 rounded"></span>
            <span className="text-sm font-medium">Non-Completed</span>
          </div>
        </div>

      </div>
    </div>
  );
}
