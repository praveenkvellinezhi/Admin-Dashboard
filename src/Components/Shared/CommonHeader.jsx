import { Search, Filter, UserRoundPlus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommonHeader({
  title = "Page",
  search,
  setSearch,
  filterValue,
  setFilterValue,
  filterOptions = [],
  buttonText = "Add",
  navigatePath = "/",
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white p-1 rounded-2xl mt-3">
      <div className="flex justify-between items-center mx-5">
        <h1 className="text-[40px] font-bold font-poppins pt-1">
          {title}
        </h1>
      </div>

      {/* SEARCH + FILTER + BUTTON */}
      <div className="flex justify-between items-center gap-4 mx-5 mt-6">
        {/* SEARCH */}
        <div className="relative w-1/2 mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()} here...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 h-12 rounded-xl border border-gray-300 bg-gray-100"
          />
        </div>

        {/* FILTER + BUTTON */}
        <div className="flex items-center gap-4 mb-3">
          {filterOptions.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl"
              >
                <Filter size={18} />
                {filterValue}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border w-40 z-50">
                  {filterOptions.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setFilterValue(item);
                        setOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        item === filterValue
                          ? "font-semibold"
                          : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => navigate(navigatePath)}
            className="px-5 py-2 bg-green-200 rounded-xl flex items-center gap-2"
          >
            <UserRoundPlus />
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}