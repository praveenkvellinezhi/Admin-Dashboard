import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatCard from "../Components/StatCard";
import OngoingProjects from "../Components/OngoingProjects";
import AttendenceGraph from "../Components/AttendenceGraph";
import ProjectStatus from "../Components/ProjectStatus";
import DashboardLoader from "../Components/DashboardLoader";

import { fetchStats, selectStatsStatus } from "../../../Redux/Slices/statsSlice";
import {
  fetchOngoingProjects,
  getOngoingProjectsStatus,
} from "../../../Redux/Slices/ongoingProjectSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const statsStatus = useSelector(selectStatsStatus);
  const projectsStatus = useSelector(getOngoingProjectsStatus);

  // ✅ FETCH DATA ONCE (PAGE RESPONSIBILITY)
  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchOngoingProjects());
  }, [dispatch]);

  // ✅ GLOBAL LOADER (NO `idle`)
  const isDashboardLoading =
    statsStatus === "loading" || projectsStatus === "loading";

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
          <ProjectStatus completed={80} />
        </div>
      </div>
    </div>
  );
}
