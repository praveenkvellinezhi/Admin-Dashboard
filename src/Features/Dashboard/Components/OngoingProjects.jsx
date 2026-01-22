import React, { useEffect } from "react";
import {
  RefreshCcw,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchOngoingProjects,
  selectOngoingProjects,
  getOngoingProjectsStatus,
} from "../../../Redux/Slices/ongoingProjectSlice";

/* =========================
   STATUS STYLES
========================= */
const getStatusStyles = () => {
  return {
    bar: "bg-blue-500",
    text: "text-blue-500",
  };
};

const OngoingProjects = () => {
  const dispatch = useDispatch();

  const projects = useSelector(selectOngoingProjects);
  const status = useSelector(getOngoingProjectsStatus);

  /* =========================
     FETCH DATA (SAFE)
  ========================= */
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOngoingProjects());
    }
  }, [dispatch, status]);

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-2xl border border-gray-50">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <RefreshCcw className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Ongoing Projects
          </h2>
        </div>

        <button className="px-5 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
          View All
        </button>
      </div>

      {/* LOADING */}
      {status === "loading" && (
        <p className="text-center text-sm text-gray-400">
          Loading projects...
        </p>
      )}

      {/* EMPTY STATE */}
      {status === "succeeded" && projects.length === 0 && (
        <p className="text-center text-sm text-gray-400">
          No ongoing projects found
        </p>
      )}

      {/* PROJECT LIST */}
      <div className="space-y-8">
        {status === "succeeded" &&
          Array.isArray(projects) &&
          projects.map((p, index) => {
            const styles = getStatusStyles();

            return (
              <div
                key={index}
                className="group flex flex-col md:flex-row md:items-center gap-6"
              >
                {/* PROJECT INFO */}
                <div className="flex items-center gap-4 min-w-[180px]">
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt="project"
                      className="w-12 h-12 rounded-xl object-cover ring-4 ring-gray-50"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold ring-4 ring-gray-50">
                      {p.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="font-extrabold text-slate-800 text-[15px]">
                      {p.name}
                    </h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase truncate max-w-[140px]">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="flex-1 space-y-2.5">
                  <div className="flex justify-between px-1">
                    <span
                      className={`text-[10px] font-black tracking-widest ${styles.text}`}
                    >
                      ONGOING
                    </span>
                    <span className="text-[11px] font-bold text-gray-400">
                      {p.progress}%
                    </span>
                  </div>

                  <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${styles.bar} rounded-full transition-all duration-700`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                {/* DATE & MEMBERS */}
                <div className="flex items-center gap-6 min-w-[150px] justify-between md:justify-end">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-bold whitespace-nowrap">
                      {p.due_date}
                    </span>
                  </div>

                  <div className="flex -space-x-2">
                    {p.members?.slice(0, 3).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="member"
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* MORE BUTTON */}
      <div className="mt-8 flex justify-end">
        <button className="p-3 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition text-gray-400">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default OngoingProjects;
