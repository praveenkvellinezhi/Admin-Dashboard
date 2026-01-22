import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProjectStatus({ completed = 80 }) {
  const [percentage, setPercentage] = useState(0);

  /* =========================
     ANIMATE PROGRESS SAFELY
  ========================= */
  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setPercentage(current);

      if (current >= completed) {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [completed]);

  return (
    <div className="bg-[#EFFFEB] rounded-3xl shadow-lg p-4 sm:p-6 w-full">
      <h3 className="font-semibold text-gray-800 mb-4 text-lg sm:text-xl">
        Project Status
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
        {/* 🟢 Circular Progress */}
        <div className="w-[90px] sm:w-[110px]">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={12}
            styles={buildStyles({
              pathColor: "#16a34a",  // green
              trailColor: "#dc2626", // red
              textColor: "#000",
              textSize: "18px",
            })}
          />
        </div>

        {/* LEGEND */}
        <div className="flex flex-row sm:flex-col justify-center gap-3">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-green-600 rounded" />
            <span className="text-sm font-medium">Completed</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-red-600 rounded" />
            <span className="text-sm font-medium">Non-Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
