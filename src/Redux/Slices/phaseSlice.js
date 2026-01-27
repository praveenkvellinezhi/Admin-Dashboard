import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Baseurl";
import { fetchProjectById } from "./projectSlice";

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  phases: [],

  status: "idle",        // fetch phases
  addStatus: "idle",
  editStatus: "idle",
  deleteStatus: "idle",

  error: null,
};
export const fetchPhase = createAsyncThunk(
  "phases/fetchPhase",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/project/phases/list/`,
        
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
  "phases/add",
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
   EDIT PHASE
========================= */
export const editPhase = createAsyncThunk(
  "phases/edit",
  async ({ phaseId, payload }, { rejectWithValue }) => {
    try {
      await axios.patch(
        `${BASE_URL}/project/phases/edit/${phaseId}/`,
        payload
      );

      // ✅ manually return what Redux needs
      return {
        id: phaseId,
        ...payload,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);



/* =========================
   DELETE PHASE
========================= */
export const deletePhase = createAsyncThunk(
  "phases/delete",
  async (phaseId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/project/phases/edit/${phaseId}/`
      );
      return phaseId;
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
    .addCase(fetchPhase.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPhase.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.phases = action.payload;
      })
      .addCase(fetchPhase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })


    
      .addCase(fetchProjectById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.phases = action.payload?.phases || [];
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* =========================
         ADD PHASE
      ========================= */
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

      /* =========================
         EDIT PHASE
      ========================= */
      .addCase(editPhase.pending, (state) => {
        state.editStatus = "loading";
      })
 .addCase(editPhase.fulfilled, (state, action) => {
  state.editStatus = "succeeded";

  const index = state.phases.findIndex(
    (p) => p.id === action.payload.id
  );

  if (index !== -1) {
    state.phases[index] = {
      ...state.phases[index],   // ✅ keep title, tasks, assigned_to
      ...action.payload,        // ✅ update description & dates
    };
  }
})


      .addCase(editPhase.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.payload;
      })

      /* =========================
         DELETE PHASE
      ========================= */
      .addCase(deletePhase.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deletePhase.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.phases = state.phases.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(deletePhase.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearPhases } = phaseSlice.actions;
export default phaseSlice.reducer;

/* =========================
   SELECTORS
========================= */

export const selectAllPhases = (state) => state.phases.phases;

export const getPhaseStatus = (state) => state.phases.status;
export const getPhaseAddStatus = (state) => state.phases.addStatus;
export const getPhaseEditStatus = (state) => state.phases.editStatus;
export const getPhaseDeleteStatus = (state) => state.phases.deleteStatus;
export const getPhaseError = (state) => state.phases.error;
