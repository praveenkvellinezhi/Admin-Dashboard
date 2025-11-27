import React from "react";
import OngoingProjects from "../Components/OngoingProjects";
import StatCard from "../Components/StatCard";

export default function Dashboard() {
  return (
    
      <div className="space-y-6">
        <StatCard /> 

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
           <OngoingProjects />
          

        </div>
     
    </div>
  );
}
