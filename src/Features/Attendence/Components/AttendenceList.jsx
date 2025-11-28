import React from "react";

export default function AttendanceList({ rows }) {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">

      {/* RESPONSIVE WRAPPER */}
      <div className="w-full overflow-x-auto">
        
        <table className="w-full min-w-[900px] border-collapse">

          {/* HEADER */}
          <thead>
            <tr
              className="text-white text-sm 
              bg-gradient-to-r from-[#00AEEF] to-[#00223E]
              shadow-md"
            >
              <th className="p-3 text-left font-semibold">ID</th>
              <th className="p-3 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Role</th>
              <th className="p-3 text-left font-semibold">Check In</th>
              <th className="p-3 text-left font-semibold">Check Out</th>
              <th className="p-3 text-left font-semibold">Working Hours</th>
              <th className="p-3 text-left font-semibold">On Leave</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {rows.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition text-sm sm:text-base"
              >
                <td className="p-3 text-gray-700 font-medium">{item.id}</td>
                <td className="p-3 text-gray-800">{item.name}</td>
                <td className="p-3 text-gray-600">
                  {item.role || item.internRole}
                </td>
                <td className="p-3 text-gray-700">{item.checkIn || "-"}</td>
                <td className="p-3 text-gray-700">{item.checkOut || "-"}</td>
                <td className="p-3 text-gray-700">
                  {item.workingHours || "9 hrs"}
                </td>

                {/* Checkbox */}
                <td className="p-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={item.onLeave}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
