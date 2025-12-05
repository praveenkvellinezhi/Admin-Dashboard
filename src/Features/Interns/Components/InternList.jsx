import { Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router";

export default function InternsList({ interns }) {
  const navigate=useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {interns.map((int) => (
        <div
          key={int.id}
          onClick={()=>{navigate(`/Interns/${int.id}`)}}
          className="bg-white rounded-2xl shadow-md p-4 w-full mx-auto"
        >
          {/* Profile image */}
          <div className="flex justify-center mt-5">
            <img
              src={int.image || "https://i.pravatar.cc/300"}
              alt={int.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          {/* Name + Role */}
          <h3 className="text-center mt-3 font-semibold text-lg">{int.name}</h3>
          <p className="text-center text-gray-500">{int.role}</p>

          {/* Gray info card */}
          <div className="bg-[#F8F8F8] p-5 rounded-2xl mt-5">

            {/* Joined Date */}
            <div className="flex justify-between pb-2">
              <span className="text-gray-400 font-light">Joined Date</span>
              <span className="text-gray-400 font-light whitespace-nowrap">
                {int.joiningDate}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 mt-3 min-w-0">
              <Phone size={18} className="text-gray-400 flex-shrink-0" />
              <p className="text-gray-400 font-light truncate overflow-hidden text-ellipsis min-w-0">
                {int.phone}
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 mt-3 min-w-0">
              <Mail size={18} className="text-gray-400 flex-shrink-0" />

              <p className="text-gray-400 font-light truncate overflow-hidden text-ellipsis min-w-0">
                {int.email}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
