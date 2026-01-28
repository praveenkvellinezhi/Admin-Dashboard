import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Baseurl";

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  tasks: [],

  status: "idle",
  addStatus: "idle",
  editStatus: "idle",
  deleteStatus: "idle",

  error: null,
};

/* =========================
   THUNKS
========================= */

/* FETCH TASKS BY PHASE ✅ */
export const fetchTasksByPhase = createAsyncThunk(
  "tasks/fetchByPhase",
  async (phaseId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/project/projects/phases/${phaseId}/tasks/`
      );
      return res.data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


/* ADD TASK */
export const addTask = createAsyncThunk(
  "tasks/add",
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

/* EDIT TASK */
export const editTask = createAsyncThunk(
  "tasks/edit",
  async ({ taskId, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/project/tasks/edit/${taskId}/`,
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

/* DELETE TASK */
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/project/tasks/edit/${taskId}/`
      );
      return taskId;
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
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
      state.status = "idle";
      state.addStatus = "idle";
      state.editStatus = "idle";
      state.deleteStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchTasksByPhase.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasksByPhase.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload ?? [];
      })
      .addCase(fetchTasksByPhase.rejected, (state, action) => {
        state.status = "failed";
        state.tasks = [];
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addTask.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.tasks = [...state.tasks, action.payload]; // ✅ SAFE
      })
      .addCase(addTask.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.payload;
      })

      /* EDIT */
      .addCase(editTask.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        const idx = state.tasks.findIndex(
          (t) => t.id === action.payload.id
        );
        if (idx !== -1) {
          state.tasks[idx] = action.payload;
        }
      })

      /* DELETE */
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.tasks = state.tasks.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;

/* =========================
   SELECTORS
========================= */

export const selectAllTasks = (state) => state.tasks.tasks;
export const getTaskStatus = (state) => state.tasks.status;
export const getTaskAddStatus = (state) => state.tasks.addStatus;
export const getTaskEditStatus = (state) => state.tasks.editStatus;
export const getTaskDeleteStatus = (state) => state.tasks.deleteStatus;
export const getTaskError = (state) => state.tasks.error;
