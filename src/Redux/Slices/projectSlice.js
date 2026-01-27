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
      return rejectWithValue(err.message);
    }
  },
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/project/projects/full/${id}/`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addProject = createAsyncThunk(
  "projects/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/project/projects/create/`,
        formData,
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const editProject = createAsyncThunk(
  "projects/edit",
  async ({ projectId, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/project/projects/edit/${projectId}/`,
        formData,
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (projectId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/project/projects/delete/${projectId}/`);
      return projectId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
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
      .addCase(fetchProjects.pending, (s) => {
        s.listStatus = "loading";
      })
      .addCase(fetchProjects.fulfilled, (s, a) => {
        s.listStatus = "succeeded";
        s.projects = a.payload;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.selectedProject = action.payload.project;
      })

      .addCase(addProject.fulfilled, (s, a) => {
        s.projects.unshift(a.payload);
      })
      .addCase(editProject.fulfilled, (s, a) => {
        const i = s.projects.findIndex((p) => p.id === a.payload.id);
        if (i !== -1) s.projects[i] = a.payload;
        if (s.selectedProject?.id === a.payload.id) {
          s.selectedProject = a.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (p) => p.project_id !== action.payload,
        );

        if (state.selectedProject?.project_id === action.payload) {
          state.selectedProject = null;
        }
      });
  },
});

export default projectSlice.reducer;
/* =========================
   SELECTORS
========================= */

// All projects list
export const selectAllProjects = (state) => state.projects.projects;

// Selected single project (details page)
export const selectSelectedProject = (state) => state.projects.selectedProject;

// Project list status
export const getProjectListStatus = (state) => state.projects.listStatus;

// Single project fetch status
export const getSingleProjectStatus = (state) => state.projects.singleStatus;

// Add project status
export const getAddProjectStatus = (state) => state.projects.addStatus;

// Edit project status
export const getEditProjectStatus = (state) => state.projects.editStatus;

// Delete project status
export const getDeleteProjectStatus = (state) => state.projects.deleteStatus;

export const getProjectError = (state) => state.projects.error;
