import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Baseurl";

const initialState = {
  data: {
    active_employees: 0,
    active_interns: 0,
    project_count: 0,
    attendance_percent: 0,
  },

  projectStatus: {
    completed: 0,
    ongoing: 0,
    pending: 0,
  },

  status: "idle",                
  projectStatusStatus: "idle", 

  error: null,
};


export const fetchStats = createAsyncThunk(
  "stats/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/dashboard/summary/`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchProjectStatus = createAsyncThunk(
  "stats/fetchProjectStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/dashboard/project-status/`
      );
      return res.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(fetchProjectStatus.pending, (state) => {
        state.projectStatusStatus = "loading";
      })
      .addCase(fetchProjectStatus.fulfilled, (state, action) => {
        state.projectStatusStatus = "succeeded";
        state.projectStatus = action.payload;
      })
      .addCase(fetchProjectStatus.rejected, (state, action) => {
        state.projectStatusStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;

export const selectStats = (state) => state.stats.data;
export const selectStatsStatus = (state) => state.stats.status;

export const selectProjectStatus = (state) =>
  state.stats.projectStatus;

export const selectProjectStatusStatus = (state) =>
  state.stats.projectStatusStatus;

export const selectStatsError = (state) => state.stats.error;
