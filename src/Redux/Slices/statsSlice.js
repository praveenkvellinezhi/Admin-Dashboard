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
  status: "idle",
  error: null,
};

export const fetchStats = createAsyncThunk(
  "stats/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/dashboard/summary/`
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
        state.data = {
          active_employees: action.payload.active_employees,
          active_interns: action.payload.active_interns,
          project_count: action.payload.project_count,
          attendance_percent: action.payload.attendance_percent,
        };
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
