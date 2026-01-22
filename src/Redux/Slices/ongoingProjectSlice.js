
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Baseurl";

const initialState = {
  projects: [],
  status: "idle",
  error: null,
};


export const fetchOngoingProjects = createAsyncThunk(
  "ongoingProjects/fetchOngoingProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/dashboard/ongoing-projects/`
      );
      return res.data.data; // IMPORTANT
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const ongoingProjectsSlice = createSlice({
  name: "ongoingProjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOngoingProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOngoingProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchOngoingProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

/* =========================
   SELECTORS
========================= */
export const selectOngoingProjects = (state) =>
  state.ongoingProjects.projects;

export const getOngoingProjectsStatus = (state) =>
  state.ongoingProjects.status;

export default ongoingProjectsSlice.reducer;
