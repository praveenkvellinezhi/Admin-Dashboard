import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProjectDetailsHeader from "../Components/ProjectDetailheader";
import ProjectOverview from "../Components/ProjectOverview";
import ProjectMetrics from "../Components/ProjectMatrix";
import ProjectPhases from "../Components/ProjectPhases";
import AddPhaseModal from "../Components/AddPhasemodal";
import DeleteProjectModal from "../Components/DeleteModal";

import {
  fetchProjectById,
  deleteProject,
  selectSelectedProject,
  getSingleProjectStatus,
  getDeleteProjectStatus,
} from "../../../Redux/Slices/projectSlice";

import { selectAllPhases } from "../../../Redux/Slices/phaseSlice";
import ProjectDetailsLoader from "../Components/DetailLoader";

function ProjectDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  /* =========================
     REDUX STATE
  ========================= */
  const project = useSelector(selectSelectedProject);
  const phases = useSelector(selectAllPhases);

  const status = useSelector(getSingleProjectStatus);
  const deleteStatus = useSelector(getDeleteProjectStatus);

  /* =========================
     LOCAL STATE
  ========================= */
  const [showPhaseModal, setShowPhaseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* =========================
     FETCH PROJECT (PHASES LOAD VIA phaseSlice)
  ========================= */
  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id]);

  /* =========================
     DELETE PROJECT
  ========================= */
  const handleDelete = async () => {
  await dispatch(deleteProject(project.project_id));
  navigate("/projects");
};

  /* =========================
     LOADING / EMPTY STATES
  ========================= */
 /* =========================
   LOADING / ERROR / EMPTY
========================= */
if (status === "loading" || status === "idle") {
  return <ProjectDetailsLoader />;
}

if (status === "failed") {
  return (
    <p className="text-center mt-10 text-red-500">
      Failed to load project
    </p>
  );
}

if (status === "succeeded" && !project) {
  return (
    <p className="text-center mt-10 text-gray-500">
      Project not found
    </p>
  );
}


  /* =========================
     UI
  ========================= */
  return (

  <div className="bg-gray-50 min-h-screen p-6 space-y-6">
    {/* HEADER */}
    <ProjectDetailsHeader
      onEdit={() =>
        navigate(`/projects/edit/${project.project_id}`)
      }
      onDelete={() => setShowDeleteModal(true)}
      onAddPhase={() => setShowPhaseModal(true)}
    />

    {/* OVERVIEW (BIG) + METRICS (SMALL) */}
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT — OVERVIEW (2/3 WIDTH) */}
        <div className="lg:col-span-2">
          <ProjectOverview project={project} />
        </div>

        {/* RIGHT — METRICS (1/3 WIDTH) */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <ProjectMetrics project={project}
            phases={phases} />
          </div>
        </div>

      </div>
    </div>

    {/* PHASES — FULL WIDTH BELOW */}
    <div className="w-full max-w-7xl mx-auto">
      <ProjectPhases
        project={project}
        phases={phases}
      />
    </div>

    {/* ADD PHASE MODAL */}
    {showPhaseModal && (
      <AddPhaseModal
        projectId={project.id}
        onClose={() => setShowPhaseModal(false)}
      />
    )}

    {/* DELETE CONFIRM MODAL */}
    {showDeleteModal && (
      <DeleteProjectModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleteStatus === "loading"}
      />
    )}
  </div>
);

  
}

export default ProjectDetails;
