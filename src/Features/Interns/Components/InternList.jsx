import React from "react";
import { Mail, Phone, LayoutGrid, List, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function InternsList({ interns = [] }) {
  const [view, setView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;
  const navigate = useNavigate();

  const totalPages = Math.ceil(interns.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentInterns = interns.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToDetails = (employeeId) => {
    navigate(`/interns/${employeeId}`); 
  };

  return (
    <div className="mt-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Intern Management
        </h2>

        {/* VIEW TOGGLE */}
        <div className="flex gap-2 bg-white border rounded-lg p-1">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-md ${
              view === "grid"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid size={18} />
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-md ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* ================= LIST VIEW ================= */}
      {view === "list" && (
        <div className="space-y-4">
          {currentInterns.map((int) => (
            <div
              key={int.employee_id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition
                         px-6 py-4 flex flex-col lg:flex-row lg:items-center
                         lg:justify-between gap-6"
            >
              {/* INTERN */}
              <div className="flex items-center gap-4 min-w-[240px]">
                <img
                  src={int.profile_image_url || "https://i.pravatar.cc/150"}
                  alt={int.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 capitalize">
                    {int.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ID: {int.employee_id}
                  </p>
                </div>
              </div>

              {/* ROLE */}
              <div className="min-w-[120px]">
                <span className="px-4 py-1 text-sm rounded-full
                                 bg-blue-100 text-blue-600 capitalize">
                  Intern
                </span>
              </div>

              {/* JOIN DATE */}
              <div className="min-w-[150px]">
                <p className="text-xs text-gray-400 mb-1">Joined Date</p>
                <p className="text-sm font-medium text-gray-700">
                  {int.joining_date || "—"}
                </p>
              </div>

              {/* CONTACT */}
              <div className="min-w-[240px] flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <span>{int.phone || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="truncate max-w-[180px]">
                    {int.email || "—"}
                  </span>
                </div>
              </div>

              {/* ACTION */}
              <div className="text-right">
                <button
                  onClick={() => goToDetails(int.employee_id)}
                  className="inline-flex items-center gap-2 px-5 py-2
                             text-blue-600 bg-blue-50 rounded-xl
                             hover:bg-blue-100 transition"
                >
                  <Eye size={16} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= GRID VIEW ================= */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentInterns.map((int) => (
            <div
              key={int.employee_id}
              onClick={() => goToDetails(int.employee_id)}
              className="bg-white rounded-2xl shadow-md p-6 text-center
                         cursor-pointer hover:shadow-lg transition"
            >
              <div className="absolute top-4 right-4 text-gray-400">
                <Eye size={18} />
              </div>

              <div className="flex justify-center">
                <img
                  src={int.profile_image_url || "https://i.pravatar.cc/150"}
                  alt={int.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold capitalize">
                {int.name}
              </h3>

              <p className="mt-2 text-xs text-gray-500 uppercase">
                Intern
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
