import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Baseurl";

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  projects: [],
  selectedProject: null,

  listStatus: "idle",
  singleStatus: "idle",
  addStatus: "idle",
  editStatus: "idle",
  deleteStatus: "idle",

  validationErrors: null, // 🔥 backend validation errors
  error: null,
};

/* =========================
   THUNKS
========================= */
export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/project/projects/list/`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/project/projects/full/${id}/`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/project/projects/create/`,
        formData
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const editProject = createAsyncThunk(
  "projects/edit",
  async ({ projectId, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/project/projects/edit/${projectId}/`,
        formData
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (projectId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/project/projects/delete/${projectId}/`
      );
      return projectId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
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
      /* ---------- FETCH PROJECTS ---------- */
      .addCase(fetchProjects.pending, (state) => {
        state.listStatus = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.payload;
      })

      /* ---------- FETCH SINGLE PROJECT ---------- */
      .addCase(fetchProjectById.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.selectedProject = action.payload.project;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.error = action.payload;
      })

      /* ---------- ADD PROJECT ---------- */
      .addCase(addProject.pending, (state) => {
        state.addStatus = "loading";
        state.validationErrors = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.projects.unshift(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.addStatus = "failed";
        state.validationErrors = action.payload;
      })

      /* ---------- EDIT PROJECT ---------- */
      .addCase(editProject.pending, (state) => {
        state.editStatus = "loading";
        state.validationErrors = null;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.editStatus = "succeeded";

        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }

        if (state.selectedProject?.id === action.payload.id) {
          state.selectedProject = action.payload;
        }
      })
      .addCase(editProject.rejected, (state, action) => {
        state.editStatus = "failed";
        state.validationErrors = action.payload;
      })

      /* ---------- DELETE PROJECT ---------- */
      .addCase(deleteProject.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.projects = state.projects.filter(
          (p) => p.project_id !== action.payload
        );

        if (state.selectedProject?.project_id === action.payload) {
          state.selectedProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;

/* =========================
   SELECTORS
========================= */
export const selectAllProjects = (state) =>
  state.projects.projects;

export const selectSelectedProject = (state) =>
  state.projects.selectedProject;

export const getProjectListStatus = (state) =>
  state.projects.listStatus;

export const getSingleProjectStatus = (state) =>
  state.projects.singleStatus;

export const getAddProjectStatus = (state) =>
  state.projects.addStatus;

export const getEditProjectStatus = (state) =>
  state.projects.editStatus;

export const getDeleteProjectStatus = (state) =>
  state.projects.deleteStatus;

export const getProjectValidationErrors = (state) =>
  state.projects.validationErrors;

export const getProjectError = (state) =>
  state.projects.error;
