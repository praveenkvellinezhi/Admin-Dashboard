import React, { useEffect, useState } from "react";
import ProjectsHeader from "../Components/ProjectsHeader";
import ProjectList from "../Components/ProjectList";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProjects,
  selectAllprojects,
  getProjectStatus,
  getProjecterror,
} from "../../../Redux/Slices/projectSlice";

export default function ProjectsPage() {
  const dispatch = useDispatch();

  const projects = useSelector(selectAllprojects);
  const status = useSelector(getProjectStatus);
  const error = useSelector(getProjecterror);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  /* =========================
     FETCH PROJECTS (ALWAYS)
  ========================= */
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  /* =========================
     FILTER LOGIC
  ========================= */
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
    return (
      <p className="text-center mt-10 text-lg">
        Loading Projects...
      </p>
    );
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
