import { Eye } from "lucide-react";

export default function AttendanceList({ rows }) {

  

  return (
    <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse">

          {/* HEADER */}
          <thead>
            <tr className="text-white bg-black text-sm shadow-md">
              <th className="p-3 text-left font-semibold"> ID</th>
              <th className="p-3 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Date</th>
              <th className="p-3 text-left font-semibold">Check In</th>
              <th className="p-3 text-left font-semibold">Check Out</th>
              <th className="p-3 text-left font-semibold">Add Overtime</th>
              <th className="p-3 text-left font-semibold">Reason</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {rows.map((item) => {
              const isRed = !item.checkIn; // Leave if no check-in

              return (
                <tr
                  key={item.id}
                  className={`
                    border-b text-sm sm:text-base
                    ${isRed ? "bg-red-100 text-black" : "bg-white text-black"}
                    ${isRed ? "" : "hover:bg-gray-50 transition"}
                  `}
                >  
                  <td className="p-3 font-medium">{item.id}</td>


                  {/* Name + Role */}
                  <td className="p-3">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-black text-xs">
                      {item.role || item.internRole}
                    </div>
                  </td>
                  <td className="p-3 font-medium"> {item.date || "01/11/2020"}</td>


                  <td className="p-3 ">{item.checkIn || "Nill"}</td>
                  <td className="p-3 ">{item.checkOut || "Nill"}</td>
                  <td className="p-3">{item.overtime || (item.checkIn ? "2 Hrs" : "Nill")}</td>

                  {/* 👁 ICON REMOVED – this cell is now empty */}
                  <td className="p-3"></td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      {/* MODAL STILL EXISTS — but unreachable now because icon removed */}
   

    </div>
  );
}
