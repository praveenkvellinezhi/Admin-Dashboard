import { Search, Filter } from "lucide-react";
import React, { useState } from "react";

export default function EmployeeHeader({ search, setSearch, role, setRole }) {
  const [open, setOpen] = useState(false);
 const roles = [
  "All",
  "MERN Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Flutter Developer",
  "Project Manager"
];


  return (
    <div className="bg-white p-1 rounded-2xl ">
      <div className="flex justify-between items-center mx-5">
        <h1 className="text-[40px] font-bold font-poppins pt-1">Employees</h1>
      </div>

      {/* SEARCH + FILTER + ADD EMPLOYEE IN SAME ROW */}
      <div className="flex justify-between items-center gap-4 mx-5 mt-6">

        {/*  SEARCH BAR */}
        <div className="relative w-1/2 mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search employees here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 h-12 rounded-xl border border-gray-300 bg-gray-100 placeholder:text-lg placeholder:font-medium placeholder:text-gray-500"
          />
        </div>

        {/* FILTER + ADD EMPLOYEE */}
        <div className="flex items-center gap-4 mb-3">

          {/* FILTER BUTTON */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100"
            >
              <Filter size={18} /> Filter
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 w-40 z-50">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      r === role ? "font-semibold text-gray-800" : ""
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ADD EMPLOYEE */}
          <button className="px-5 py-2 bg-green-200 text-green-900 font-semibold rounded-xl hover:bg-green-300">
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}
