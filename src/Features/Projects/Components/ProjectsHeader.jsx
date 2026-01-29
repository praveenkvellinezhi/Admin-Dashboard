import React from "react";
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
   
  );
}
