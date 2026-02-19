import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Baseurl";
import { fetchProjectById } from "./projectSlice";


const initialState = {
  phases: [],

  status: "idle",
  addStatus: "idle",
  editStatus: "idle",
  deleteStatus: "idle",

  error: null,
};

export const addPhase = createAsyncThunk(
  "phases/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/project/phases/create/`,
        payload
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const editPhase = createAsyncThunk(
  "phases/edit",
  async ({ phaseId, payload }, { rejectWithValue }) => {
    try {
      await axios.patch(
        `${BASE_URL}/project/phases/edit/${phaseId}/`,
        payload
      );

      return { id: phaseId, ...payload };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const deletePhase = createAsyncThunk(
  "phases/delete",
  async (phaseId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/project/phases/edit/${phaseId}/`
      );
      return phaseId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const phaseSlice = createSlice({
  name: "phases",
  initialState,
  reducers: {
    clearPhases: (state) => {
      state.phases = [];
      state.status = "idle";
      state.addStatus = "idle";
      state.editStatus = "idle";
      state.deleteStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder


      .addCase(fetchProjectById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.phases = action.payload?.phases || [];
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addPhase.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addPhase.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.phases.push({
          ...action.payload,
          tasks: action.payload.tasks || [],
        });
      })
      .addCase(addPhase.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.payload;
      })


      .addCase(editPhase.fulfilled, (state, action) => {
        state.editStatus = "succeeded";

        const idx = state.phases.findIndex(
          (p) => p.id === action.payload.id
        );

        if (idx !== -1) {
          state.phases[idx] = {
            ...state.phases[idx],
            ...action.payload,
          };
        }
      })


      .addCase(deletePhase.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.phases = state.phases.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export const { clearPhases } = phaseSlice.actions;
export default phaseSlice.reducer;
export const selectAllPhases = (state) => state.phases.phases;
export const getPhaseStatus = (state) => state.phases.status;
export const getPhaseAddStatus = (state) => state.phases.addStatus;
export const getPhaseEditStatus = (state) => state.phases.editStatus;
export const getPhaseDeleteStatus = (state) => state.phases.deleteStatus;
export const getPhaseError = (state) => state.phases.error;