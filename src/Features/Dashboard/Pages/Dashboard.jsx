import React from "react";
import OngoingProjects from "../Components/OngoingProjects";
import StatCard from "../Components/StatCard";
import AttendenceGraph from "../Components/AttendenceGraph";
import ProjectStatus from "../Components/ProjectStatus";

export default function Dashboard() {
  return (
    <div className="w-full p-3 sm:p-4 lg:p-6 space-y-6">

      {/* Stats Section */}
      <StatCard />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">

        {/* LEFT COLUMN — Projects */}
        <OngoingProjects />

        {/* RIGHT COLUMN — Graph + Status */}
        <div className="flex flex-col gap-4 lg:gap-6 w-full">
          <AttendenceGraph month="Month" />
          <ProjectStatus completed={80} />
        </div>

      </div>
    </div>
  );
}
