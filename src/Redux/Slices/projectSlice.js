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

  phases: [],
  phaseAddStatus: "idle",
  taskAddStatus: "idle",

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
      return res.data; // backend returns array
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
   ADD TASK (PHASE)
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
        state.progress = action.payload.progress_percent || 0;
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

        if (phase) {
          phase.tasks = phase.tasks || [];
          phase.tasks.push(task);
        }
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

export const getAddProjectStatus = (state) =>
  state.projects.addStatus;

export const getPhaseAddStatus = (state) =>
  state.projects.phaseAddStatus;

export const getTaskAddStatus = (state) =>
  state.projects.taskAddStatus;

export const getProjecterror = (state) =>
  state.projects.error;

export const getSingleprojectStatus = (state) =>
  state.projects.singleStatus;

export const selectedProject = (state) =>
  state.projects.selectedProject;

export const selectProjectPhases = (state) =>
  state.projects.phases;

export const selectProjectProgress = (state) =>
  state.projects.progress;
