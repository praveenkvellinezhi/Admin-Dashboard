import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatCard from "../Components/StatCard";
import OngoingProjects from "../Components/OngoingProjects";
import AttendenceGraph from "../Components/AttendenceGraph";
import ProjectStatus from "../Components/ProjectStatus";
import DashboardLoader from "../Components/DashboardLoader";

import {
  fetchStats,
  fetchProjectStatus,
  selectStatsStatus,
  selectProjectStatusStatus,
} from "../../../Redux/Slices/statsSlice";

import {
  fetchOngoingProjects,
  getOngoingProjectsStatus,
} from "../../../Redux/Slices/ongoingProjectSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const statsStatus = useSelector(selectStatsStatus);
  const projectStatusStatus = useSelector(selectProjectStatusStatus);
  const projectsStatus = useSelector(getOngoingProjectsStatus);

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchProjectStatus());
    dispatch(fetchOngoingProjects());
  }, [dispatch]);

// loader
  const isDashboardLoading =
    statsStatus === "loading" ||
    projectStatusStatus === "loading" ||
    projectsStatus === "loading";

  if (isDashboardLoading) {
    return <DashboardLoader />;
  }

  return (
    <div className="w-full p-3 sm:p-4 lg:p-6 space-y-6">
      <StatCard />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        <OngoingProjects />

        <div className="flex flex-col gap-4 lg:gap-6 w-full">
          <AttendenceGraph month="Month" />
          <ProjectStatus />
        </div>
      </div>
    </div>
  );
}
