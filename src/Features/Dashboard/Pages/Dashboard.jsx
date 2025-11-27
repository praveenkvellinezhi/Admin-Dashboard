import React from "react";
import OngoingProjects from "../Components/OngoingProjects";
import StatCard from "../Components/StatCard";

export default function Dashboard() {
  return (
    
      <div className="space-y-6">
        <StatCard />
      <OngoingProjects />
    </div>
  );
}
