import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Baseurl";



const initialState = {
  interns: [],
  selectedIntern: null,

  internStatus: "idle", 
  singleStatus: "idle",

  error: null,
  validationErrors: null,
};



export const fetchInterns = createAsyncThunk(
  "interns/fetchInterns",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/employee/interns-list/`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);



const internSlice = createSlice({
  name: "interns",
  initialState,
  reducers: {
    clearValidationErrors: (state) => {
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterns.pending, (state) => {
        state.internStatus = "loading";
      })
      .addCase(fetchInterns.fulfilled, (state, action) => {
        state.internStatus = "succeeded";
        state.interns = action.payload;
      })
      .addCase(fetchInterns.rejected, (state, action) => {
        state.internStatus = "failed";
        state.error = action.payload;
      });
  },
});



export default internSlice.reducer;

export const selectAllInterns = (state) => state.interns.interns;
export const getInternStatus = (state) => state.interns.internStatus;
export const getInternError = (state) => state.interns.error;
