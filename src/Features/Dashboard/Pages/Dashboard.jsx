import React from "react";
import OngoingProjects from "../Components/OngoingProjects";
import StatCard from "../Components/StatCard";
import AttendenceGraph from "../Components/AttendenceGraph";
import ProjectStatus from "../Components/ProjectStatus";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      <StatCard />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

        {/* Left Column */}
        <OngoingProjects />

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <AttendenceGraph month="Month" />
          <ProjectStatus completed={80} />
        </div>

      </div>
    </div>
  );
}
