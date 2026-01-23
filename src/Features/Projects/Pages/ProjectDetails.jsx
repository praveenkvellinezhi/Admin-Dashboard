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
  getSingleprojectStatus,
  getDeleteProjectStatus,
  selectedProject,
  selectProjectPhases,
} from "../../../Redux/Slices/projectSlice";

function ProjectDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const project = useSelector(selectedProject);
  const status = useSelector(getSingleprojectStatus);
  const deleteStatus = useSelector(getDeleteProjectStatus);
  const phases = useSelector(selectProjectPhases);

  const [showPhaseModal, setShowPhaseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* =========================
     FETCH PROJECT DETAILS
  ========================= */
  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id]);

  /* =========================
     DELETE HANDLER
  ========================= */
  const handleDelete = async () => {
    const projectId = project.project_id || project.id;

    const result = await dispatch(deleteProject(projectId));

    if (deleteProject.fulfilled.match(result)) {
      navigate("/projects");
    }
  };

  /* =========================
     STATES
  ========================= */
  if (status === "loading") {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading project details...
      </p>
    );
  }

  if (!project) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No project data found
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
          navigate(`/projects/edit/${project.project_id || project.id}`)
        }
        onDelete={() => setShowDeleteModal(true)}
        onAddPhase={() => setShowPhaseModal(true)}
      />

      {/* OVERVIEW + METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
        <ProjectOverview project={project} />
        <ProjectMetrics project={project} />
      </div>

      {/* PHASES */}
      <div className="w-full max-w-7xl mx-auto">
        <ProjectPhases project={project} phases={phases} />
      </div>

      {/* ADD PHASE MODAL */}
      {showPhaseModal && (
        <AddPhaseModal
          projectId={project.project_id || project.id}
          onClose={() => setShowPhaseModal(false)}
        />
      )}

      {/* DELETE CONFIRM MODAL */}
      <DeleteProjectModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleteStatus === "loading"}
      />
    </div>
  );
}

export default ProjectDetails;
