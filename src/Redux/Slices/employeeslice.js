import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Baseurl";

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  employees: [],
  managers: [],
  selectedEmployee: null,

  employeeStatus: "idle",
  managerStatus: "idle",
  singleStatus: "idle",

  error: null,
  validationErrors: null,
};

/* =========================
   FETCH ALL EMPLOYEES
========================= */
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/employee/emp-list/`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* =========================
   FETCH SINGLE EMPLOYEE
========================= */
export const fetchEmployeesById = createAsyncThunk(
  "employees/fetchEmployeesById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/employee/employee/full/${id}`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* =========================
   FETCH MANAGERS
========================= */
export const fetchManagers = createAsyncThunk(
  "employees/fetchManagers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/employee/employees/managers/`
      );
      return res.data.managers ?? res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* =========================
   ADD EMPLOYEE
========================= */
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/employee/emp/`,
        formData
      );
      return res.data;
    } catch (error) {
      if (error.response?.status === 400) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ non_field_error: error.message });
    }
  }
);

/* =========================
   EDIT EMPLOYEE
========================= */
export const editEmployee = createAsyncThunk(
  "employees/editEmployee",
  async ({ employeeId, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}//employee/emp-edit/${employeeId}/`,
        formData
      );
      return res.data;
    } catch (error) {
      if (error.response?.status === 400) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ non_field_error: error.message });
    }
  }
);

/* =========================
   DELETE EMPLOYEE
========================= */
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (employeeId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/employee/emp-delete/${employeeId}/`
      );
      return employeeId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* =========================
   SLICE
========================= */
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearValidationErrors: (state) => {
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== FETCH EMPLOYEES ===== */
      .addCase(fetchEmployees.pending, (state) => {
        state.employeeStatus = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employeeStatus = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.employeeStatus = "failed";
        state.error = action.payload;
      })

      /* ===== FETCH MANAGERS ===== */
      .addCase(fetchManagers.pending, (state) => {
        state.managerStatus = "loading";
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.managerStatus = "succeeded";
        state.managers = action.payload;
      })
      .addCase(fetchManagers.rejected, (state, action) => {
        state.managerStatus = "failed";
        state.error = action.payload;
      })

      /* ===== ADD EMPLOYEE ===== */
      .addCase(addEmployee.pending, (state) => {
        state.employeeStatus = "loading";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employeeStatus = "succeeded";
        state.employees.unshift(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.employeeStatus = "failed";
        state.validationErrors = action.payload;
      })

      /* ===== EDIT EMPLOYEE ===== */
      .addCase(editEmployee.pending, (state) => {
        state.employeeStatus = "loading";
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.employeeStatus = "succeeded";

        const index = state.employees.findIndex(
          (e) =>
            e.employee_id === action.payload.employee_id ||
            e.id === action.payload.id
        );

        if (index !== -1) {
          state.employees[index] = action.payload;
        }

        if (
          state.selectedEmployee?.employee_id ===
          action.payload.employee_id
        ) {
          state.selectedEmployee = action.payload;
        }
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.employeeStatus = "failed";
        state.validationErrors = action.payload;
      })

      /* ===== DELETE EMPLOYEE ===== */
.addCase(deleteEmployee.fulfilled, (state, action) => {
  // Remove from list
  state.employees = state.employees.filter(
    (emp) => emp.employee_id !== action.payload
  );

  // Clear selected employee
  state.selectedEmployee = null;

  // 🔥 CRITICAL: reset status so list refetches
  state.employeeStatus = "idle";
})


      /* ===== FETCH SINGLE EMPLOYEE ===== */
      .addCase(fetchEmployeesById.pending, (state) => {
        state.singleStatus = "loading";
        state.selectedEmployee = null;
      })
      .addCase(fetchEmployeesById.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeesById.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.error = action.payload;
      });
  },
});

/* =========================
   EXPORTS
========================= */
export default employeeSlice.reducer;

export const { clearValidationErrors } = employeeSlice.actions;

/* =========================
   SELECTORS
========================= */
export const selectAllEmployees = (state) =>
  state.employees.employees;

export const selectAllManagers = (state) =>
  state.employees.managers;

export const selectSelectedEmployee = (state) =>
  state.employees.selectedEmployee;

export const getEmployeeStatus = (state) =>
  state.employees.employeeStatus;

export const getManagerStatus = (state) =>
  state.employees.managerStatus;

export const getSingleEmployeeStatus = (state) =>
  state.employees.singleStatus;

export const getEmployeeError = (state) =>
  state.employees.error;

export const getEmployeeValidationErrors = (state) =>
  state.employees.validationErrors;
