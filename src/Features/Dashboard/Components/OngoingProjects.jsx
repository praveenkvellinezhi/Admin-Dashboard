import React from "react";
import { BASE_URL } from "../../../Redux/Baseurl";
import { Calendar, ArrowUpRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  selectOngoingProjects,
  getOngoingProjectsStatus,
} from "../../../Redux/Slices/ongoingProjectSlice";

/* HELPERS */
const capitalizeFirst = (text = "") =>
  text.charAt(0).toUpperCase() + text.slice(1);

const OngoingProjects = () => {
  const projects = useSelector(selectOngoingProjects);
  const status = useSelector(getOngoingProjectsStatus);
  const navigate = useNavigate()

  if (status === "loading") {
    return (
      <p className="text-center text-sm text-gray-400">
        Loading projects...
      </p>
    );
  }

  if (status === "succeeded" && projects.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400">
        No ongoing projects found
      </p>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
            ≡
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Ongoing Projects
            </h2>
            <p className="text-xs text-gray-400">
              {projects.length} active projects
            </p>
          </div>
        </div>

        <button
        onClick={()=>navigate("/projects")}
         className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          View All <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* LIST */}
      <div className="divide-y  divide-gray-300">
        {projects.map((p, index) => (
          <div
            key={index}
            className="flex items-center gap-6 px-6 py-5"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4 min-w-[260px]">
              {p.logo ? (
                <img
                  src={`${BASE_URL}${p.logo}`}
                  alt="project"
                  className="w-12 h-12 rounded-xl object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {capitalizeFirst(p.name).slice(0, 2)}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {capitalizeFirst(p.name)}
                  </h3>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium
                      ${
                        p.progress >= 80
                          ? "bg-green-100 text-green-700"
                          : p.progress >= 50
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {p.progress >= 80
                      ? "On Track"
                      : p.progress >= 50
                      ? "In Progress"
                      : "Starting"}
                  </span>
                </div>

                <p className="text-xs text-gray-400 max-w-[220px] truncate">
                  {capitalizeFirst(p.description)}
                </p>
              </div>
            </div>

            {/* PROGRESS */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">PROGRESS</span>
                <span className="text-sm font-semibold text-gray-800">
                  {p.progress}%
                </span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    p.progress >= 80
                      ? "bg-green-500"
                      : p.progress >= 50
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }`}
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            {/* DATE */}
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-gray-600 text-sm">
              <Calendar className="w-4 h-4" />
              {p.due_date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingProjects;
