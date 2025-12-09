import { Search, Filter,UserRoundPlus } from "lucide-react";
import CommonHeader from "../../../Components/Shared/CommonHeader";



export default function InternsHeader({search,setSearch,role,setRole}) {
 const roles = [
  "All",
  "React Intern",
  "Backend Intern",
  "UI/UX Intern",
  "Flutter Intern",
  "Data Entry Intern",
  "Marketing Intern",
  "Testing Intern"
];

  return (
    <div>
      <CommonHeader
      title="Interns"
      search={search}
      setSearch={setSearch}
      filterValue={role}
      setFilterValue={setRole}
      filterOptions={roles}
      buttonText="Add Intern"
      navigatePath="/Intern-add"/>

    </div>



//     <div className="bg-white p-1 rounded-2xl mt-3">
//         <div className="flex justify-between items-center mx-5">
//             <h1 className="text-[40px] font-bold font-poppins pt-1">Interns</h1>

//         </div>

//       {/* SEARCH + FILTER + ADD Intern IN SAME ROW */}
//       <div className="flex justify-between items-center gap-4 mx-5 mt-6">

//        {/*  SEARCH BAR */}
//       <div className="relative w-1/2 mb-3">
//       <Search  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
//       <input
//        type="text"
//        placeholder="Search Interns here...."
//        value={search}
//        onChange={(e)=>setSearch(e.target.value)} 
//        className="w-full pl-10 h-12 rounded-xl border border-gray-300 bg-gray-100 placeholder:text-lg placeholder:font-medium placeholder:text-gray-500"/>
         


//       </div>
      
//         {/* FILTER + ADD Intern */}

//         <div className="flex items-center gap-4 mb-4">

//           {/* FILTER BUTTON */}

//           <div className="relative
//           ">
//             <button onClick={()=>setOpen(!open)}
//                 className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100"><Filter size={18} />{role}</button>

//                 {open && (
//                     <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 w-40 z-50">
//                         {roles.map((r)=>(
//                             <button key={r}
//                             onClick={()=>{
//                                 setRole(r);
//                                 setOpen(false);
//                             }} className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${r===role ? 'font-semibold text-gray-800' :" "}`}>
//                                 {r}
                             
                                

//                             </button>
//                         ))}



//                     </div>
//                 ) }



//           </div>
//           {/* ADD EMPLOYEE */}
//            <button onClick={()=>{
//             navigate("/Intern-Add")
//            }} className="px-5 py-2 bg-green-200 text-green-900 font-semibold rounded-xl hover:bg-green-300 flex items-center">
//             <UserRoundPlus className="me-2"/>
//             Add Intern
//           </button>

// </div>


//         </div>

      
//     </div>
  )
}
