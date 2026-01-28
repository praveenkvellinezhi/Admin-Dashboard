import React from "react";

export default function AttendanceList({ rows }) {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse">

                    <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3 text-left font-semibold">ID</th>
              <th className="p-3 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Date</th>
              <th className="p-3 text-left font-semibold">Check In</th>
              <th className="p-3 text-left font-semibold">Check Out</th>
              <th className="p-3 text-left font-semibold">Add Overtime</th>
              <th className="p-3 text-left font-semibold">Reason</th>
            </tr>
          </thead>

                    <tbody>
            {rows.map((item) => {
              const isLeave = !item.checkIn;

              return (
                <tr
                  key={item.id}
                  className={`
                    border-b text-sm
                    ${isLeave ? "bg-red-100" : "bg-white"}
                    hover:bg-gray-50 transition
                  `}
                >
                                    <td className="p-3 font-medium">{item.id}</td>

                                    <td className="p-3">
                    <div className="font-semibold text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.role || item.internRole || "—"}
                    </div>
                  </td>

                                    <td className="p-3">
                    {item.date || "—"}
                  </td>

                                    <td className="p-3">
                    {item.checkIn || "—"}
                  </td>

                                    <td className="p-3">
                    {item.checkOut || "—"}
                  </td>

                                    <td className="p-3 font-medium">
                    {item.overtime || "0 hrs"}
                  </td>

                                    <td className="p-3">
                    {isLeave ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500 text-white">
                        On leave
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        {item.reason || "—"}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}
