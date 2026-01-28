import React from "react";
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
      navigatePath="/addingform"/>

    </div>




  )
}
