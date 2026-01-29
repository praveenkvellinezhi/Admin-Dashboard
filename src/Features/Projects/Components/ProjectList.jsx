import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";

export default function ProjectList({ projects }) {
  const ITEMS_PER_PAGE = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentProjects = projects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      {/* 🔄 View Toggle */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setView("grid")}
          className={`p-2 rounded border ${
            view === "grid"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          <LayoutGrid size={16} />
        </button>

        <button
          onClick={() => setView("list")}
          className={`p-2 rounded border ${
            view === "list"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          <List size={16} />
        </button>
      </div>

      {/* Projects */}
      <div
        className={
          view === "grid"
            ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "space-y-4"
        }
      >
        {currentProjects.map((project) => (
          <Link
            key={project.project_id} // ✅ FIXED
            to={`/Projects/${project.project_id}`}
            state={project}
            className={`bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition ${
              view === "list" ? "flex gap-6 items-center" : ""
            }`}
          >
            {/* Logo */}
            <img
              src={project.project_logo_url}
              alt={project.project_name}
              className={`object-cover rounded-full border-4 border-white shadow-md ${
                view === "list" ? "w-20 h-20" : "w-28 h-28 mx-auto"
              }`}
            />

            {/* Content */}
            <div className={view === "list" ? "flex-1" : "text-center"}>
              <h2 className="text-lg font-semibold text-gray-800">
                {project.project_name}
              </h2>

              <p className="text-gray-500 text-sm">
                {project.description || ""}
              </p>

              <p className="text-yellow-500 font-medium text-sm mt-1">
                {project.techStack || ""}
              </p>

              {/* Meta */}
              <div
                className={`mt-3 text-sm text-gray-600 ${
                  view === "grid"
                    ? "bg-[#F8F8F8] p-4 rounded-xl"
                    : ""
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs font-semibold">Start</p>
                    <p>{project.start_date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Due</p>
                    <p>{project.end_date}</p>
                  </div>
                </div>

                {/* Members */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex -space-x-3">
                    {project.team_members?.map((member) => (
                      <img
                        key={member.employee_id} // ✅ FIXED
                        src={member.profile_image_url}
                        alt={member.name}
                        title={member.name}
                        className="w-8 h-8 rounded-full border object-cover"
                      />
                    ))}
                  </div>

                  <span className="text-xs text-gray-500">
                    + {project.extraMembers || 0} members
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page} // ✅ OK (static pagination)
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm border rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
