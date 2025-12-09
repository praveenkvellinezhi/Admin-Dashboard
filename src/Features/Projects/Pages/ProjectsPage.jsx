import React, { useState } from "react";
import ProjectsHeader from "../Components/ProjectsHeader";
import ProjectList from "../Components/ProjectList";
import { projects } from "../Projectdata";

export default function ProjectsPage() {

  // ✅ MAIN STATES
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  // ✅ FILTER LOGIC
  const filteredProjects = projects.filter((proj) => {
    return (
      (role === "All" || proj.subtitle === role) &&
      proj.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      {/* ✅ PASS STATE TO HEADER */}
      <ProjectsHeader
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
      />

      {/* ✅ PASS FILTERED DATA TO LIST */}
      <ProjectList projects={filteredProjects} />
    </div>
  );
}
