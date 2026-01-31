import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProjectsHeader from "../Components/ProjectsHeader";
import ProjectList from "../Components/ProjectList";

import {
  fetchProjects,
  selectAllProjects,
  getProjectListStatus,
  getProjectError,
} from "../../../Redux/Slices/projectSlice";
import Loader from "../../../Components/Shared/Loader";

export default function ProjectsPage() {
  const dispatch = useDispatch();

  const projects = useSelector(selectAllProjects);
  const status = useSelector(getProjectListStatus);
  const error = useSelector(getProjectError);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = projects.filter((proj) => {
    const title = proj?.project_name?.toLowerCase() || "";
    const type = proj?.project_type?.toLowerCase() || "";

    return (
      (role === "All" || type === role.toLowerCase()) &&
      title.includes(search.toLowerCase())
    );
  });

  /* =========================
     STATES
  ========================= */
  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return (
      <p className="text-center mt-10 text-red-500">
        {error || "Failed to load projects"}
      </p>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <div>
      <ProjectsHeader
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
      />

      {filteredProjects.length === 0 ? (
        <p className="text-center mt-16 text-gray-500 text-lg">
          No Projects found
        </p>
      ) : (
        <ProjectList projects={filteredProjects} />
      )}
    </div>
  );
}
