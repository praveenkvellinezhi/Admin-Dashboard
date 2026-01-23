import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Baseurl";

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  projects: [],
  projectStatus: "idle",

  addStatus: "idle",
  editStatus: "idle",
  deleteStatus: "idle",

  phases: [],
  phaseAddStatus: "idle",

  taskAddStatus: "idle",
  taskFetchStatus: "idle",

  progress: 0,

  selectedProject: null,
  singleStatus: "idle",

  error: null,
};

/* =========================
   FETCH PROJECT LIST
========================= */
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/project/projects/list/`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* =========================
   FETCH SINGLE PROJECT
========================= */
export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/project/projects/full/${id}/`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* =========================
   ADD PROJECT
========================= */
export const addProject = createAsyncThunk(
  "projects/addProject",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/project/projects/create/`,
        formData
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   EDIT PROJECT
========================= */
export const editProject = createAsyncThunk(
  "projects/editProject",
  async ({ projectId, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/project/projects/edit/${projectId}/`,
        formData
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   DELETE PROJECT
========================= */
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/project/projects/edit/${projectId}/`
      );
      return projectId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   ADD PHASE
========================= */
export const addPhase = createAsyncThunk(
  "projects/addPhase",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/project/phases/create/`,
        payload
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   FETCH TASKS
========================= */
export const fetchTasks = createAsyncThunk(
  "projects/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/project/tasks/list/`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   ADD TASK
========================= */
export const addTask = createAsyncThunk(
  "projects/addTask",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/project/tasks/create/`,
        payload
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   SLICE
========================= */
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ===== FETCH PROJECTS ===== */
      .addCase(fetchProjects.pending, (state) => {
        state.projectStatus = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projectStatus = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.projectStatus = "failed";
        state.error = action.payload;
      })

      /* ===== ADD PROJECT ===== */
      .addCase(addProject.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.projects.unshift(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.payload;
      })

      /* ===== EDIT PROJECT ===== */
      .addCase(editProject.pending, (state) => {
        state.editStatus = "loading";
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.editStatus = "succeeded";

        const updated = action.payload;

        const index = state.projects.findIndex(
          (p) =>
            p.id === updated.id ||
            p.project_id === updated.project_id
        );

        if (index !== -1) {
          state.projects[index] = updated;
        }

        if (
          state.selectedProject &&
          (state.selectedProject.id === updated.id ||
            state.selectedProject.project_id ===
              updated.project_id)
        ) {
          state.selectedProject = updated;
        }
      })
      .addCase(editProject.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.payload;
      })

      /* ===== DELETE PROJECT ===== */
      .addCase(deleteProject.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";

        state.projects = state.projects.filter(
          (p) =>
            p.id !== action.payload &&
            p.project_id !== action.payload
        );

        if (
          state.selectedProject &&
          (state.selectedProject.id === action.payload ||
            state.selectedProject.project_id === action.payload)
        ) {
          state.selectedProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      })

      /* ===== FETCH SINGLE PROJECT ===== */
      .addCase(fetchProjectById.pending, (state) => {
        state.singleStatus = "loading";
        state.selectedProject = null;
        state.phases = [];
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.selectedProject = action.payload.project;
        state.phases = action.payload.phases || [];
        state.progress =
          action.payload.progress_percent || 0;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.error = action.payload;
      })

      /* ===== ADD PHASE ===== */
      .addCase(addPhase.pending, (state) => {
        state.phaseAddStatus = "loading";
      })
      .addCase(addPhase.fulfilled, (state, action) => {
        state.phaseAddStatus = "succeeded";
        state.phases.push({
          ...action.payload,
          tasks: action.payload.tasks || [],
        });
      })
      .addCase(addPhase.rejected, (state, action) => {
        state.phaseAddStatus = "failed";
        state.error = action.payload;
      })

      /* ===== FETCH TASKS ===== */
      .addCase(fetchTasks.pending, (state) => {
        state.taskFetchStatus = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.taskFetchStatus = "succeeded";

        state.phases.forEach((p) => (p.tasks = []));

        action.payload.forEach((task) => {
          const phase = state.phases.find(
            (p) => p.id === task.phase
          );
          if (phase) phase.tasks.push(task);
        });
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.taskFetchStatus = "failed";
        state.error = action.payload;
      })

      /* ===== ADD TASK ===== */
      .addCase(addTask.pending, (state) => {
        state.taskAddStatus = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.taskAddStatus = "succeeded";

        const task = action.payload;
        const phase = state.phases.find(
          (p) => p.id === task.phase
        );

        if (phase) phase.tasks.push(task);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.taskAddStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;

/* =========================
   SELECTORS
========================= */
export const selectAllprojects = (state) =>
  state.projects.projects;

export const getProjectStatus = (state) =>
  state.projects.projectStatus;

export const getProjectError = (state) =>
  state.projects.error;

export const getAddProjectStatus = (state) =>
  state.projects.addStatus;

export const getEditProjectStatus = (state) =>
  state.projects.editStatus;

export const getDeleteProjectStatus = (state) =>
  state.projects.deleteStatus;

export const getPhaseAddStatus = (state) =>
  state.projects.phaseAddStatus;

export const getTaskAddStatus = (state) =>
  state.projects.taskAddStatus;

export const getTaskFetchStatus = (state) =>
  state.projects.taskFetchStatus;

export const getSingleprojectStatus = (state) =>
  state.projects.singleStatus;

export const selectedProject = (state) =>
  state.projects.selectedProject;

export const selectProjectPhases = (state) =>
  state.projects.phases;

export const selectProjectProgress = (state) =>
  state.projects.progress;
