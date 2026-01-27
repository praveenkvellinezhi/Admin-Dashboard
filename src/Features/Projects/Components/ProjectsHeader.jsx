import { Search, Filter, UserRoundPlus } from "lucide-react";
import CommonHeader from "../../../Components/Shared/CommonHeader";

export default function ProjectsHeader({ search, setSearch, role, setRole}) {

const Projects = [
  "All",
  "Static Website",
  "Mobile App",
  "Portfolio Website",
  "Dashboard System"
];


  return (




    <div>
      <CommonHeader
      title="Projects"
      search={search}
      setSearch={setSearch}
      filterValue={role}
      setFilterValue={setRole}
      filterOptions={Projects}
      buttonText="Add Projects"
      navigatePath="/projects/add" />


    </div>
    // <div className="w-full bg-white rounded-2xl shadow p-5">
      
    //   {/* TITLE */}
    //   <h1 className="text-[40px] font-bold font-poppins">Projects</h1>

    //   {/* MAIN ROW → SEARCH (LEFT) + BUTTONS (RIGHT) */}
    //   <div className="flex items-center justify-between mt-5 gap-4 w-full">

    //     {/* LEFT: SEARCH BAR (TAKES FULL AVAILABLE WIDTH) */}
    //     <div className="relative w-full max-w-[600px]">
    //       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    //       <input
    //         type="text"
    //         placeholder="Search projects here..."
    //         className="w-full pl-10 h-12 rounded-xl border border-gray-300 bg-gray-100 placeholder:text-lg placeholder:font-medium"
    //       />
    //     </div>

    //     {/* RIGHT: FILTER + ADD */}
    //     <div className="flex items-center gap-4">

    //       {/* FILTER BUTTON */}
    //       <div className="relative">
    //         <button
    //           onClick={() => setOpen(!open)}
    //           className="flex items-center gap-2 px-4 h-12 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100"
    //         >
    //           <Filter size={18} />
    //           {project}
    //         </button>

    //         {/* DROPDOWN */}
    //         {open && (
    //           <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 w-40 z-50">
    //             {Projects.map((proj) => (
    //               <button
    //                 key={proj}
    //                 onClick={() => {
    //                   setProject(proj);
    //                   setOpen(false);
    //                 }}
    //                 className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
    //                   project === proj ? "font-semibold text-gray-900" : ""
    //                 }`}
    //               >
    //                 {proj}
    //               </button>
    //             ))}
    //           </div>
    //         )}
    //       </div>

    //       {/* ADD EMPLOYEE BUTTON */}
    //       <button onClick={()=>{
    //         navigate("/Project-Add")
    //       }} className="flex items-center gap-2 px-5 h-12 bg-green-200 text-green-900 font-semibold rounded-xl hover:bg-green-300 whitespace-nowrap">
    //         <UserRoundPlus size={18} />
    //         Add Project
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
