import { Mail, Phone, LayoutGrid, List, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function EmployeeList({ employees }) {
  const [view, setView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;
  const navigate = useNavigate();

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentEmployees = employees.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Employee Management
        </h2>

                <div className="flex gap-2 bg-white border rounded-lg p-1">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-md transition ${
              view === "grid"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid size={18} />
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-md transition ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

            {view === "list" && (
        <div className="space-y-4">
          {currentEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            >
                            <div className="flex items-center gap-4 min-w-[240px]">
                <img
                  src={emp.profile_image_url || "https://i.pravatar.cc/150"}
                  alt={emp.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 capitalize">
                    {emp.name}
                  </p>
                  <p className="text-sm text-gray-500">ID: {emp.employee_id}</p>
                </div>
              </div>

                            <div className="min-w-[120px] text-left">
                <span className="px-4 py-1 text-sm rounded-full bg-purple-100 text-purple-600 capitalize">
                  {emp.department}
                </span>
              </div>

                            <div className="min-w-[150px]">
                <p className="text-xs text-gray-400 mb-1">Joined Date</p>
                <p className="text-sm font-medium text-gray-700">
                  {emp.joining_date}
                </p>
              </div>

                            <div className="min-w-[240px] flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <span>{emp.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="truncate max-w-[180px]">{emp.email}</span>
                </div>
              </div>

                            <div className="text-right">
                <button
                  onClick={() => navigate(`/Employees/${emp.employee_id}`)}
                  className="inline-flex items-center gap-2 px-5 py-2 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                >
                  <Eye size={16} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

{view === "grid" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {currentEmployees.map((emp) => (
      <div
        key={emp.id}
        onClick={() => navigate(`/Employees/${emp.employee_id}`)}
        className="bg-white rounded-2xl shadow-md p-6 text-center relative 
                   cursor-pointer hover:shadow-lg transition"
      >
                <div className="absolute top-4 right-4 text-gray-400">
          <Eye size={18} />
        </div>

                <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-gray-300 flex items-center justify-center">
            <img
              src={emp.profile_image_url  || "https://i.pravatar.cc/150"}
              alt={emp.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900 capitalize">
          {emp.name}
        </h3>

                <p className="mt-2 mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
          {emp.department} Developer
        </p>

                <div className="mt-4 space-y-2 text-xs text-gray-500 text-left">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-gray-400" />
            <span>{emp.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={14} className="text-gray-400" />
            <span className="truncate">{emp.email}</span>
          </div>

          <div className="flex justify-between pt-2 border-t text-gray-400">
            <span>Joined</span>
            <span className="font-medium text-gray-600">
              {emp.joining_date}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
)}





            {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
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
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
