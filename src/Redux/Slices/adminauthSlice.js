import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../Baseurl";
import axios from "axios";

export const adminLogin = createAsyncThunk(
  "admin/auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
         const formData = new FormData();
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      const response = await axios.post(`${BASE_URL}/myapp1/login/`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data ||"Login failed");
    }
  }
);

const adminauthSlice = createSlice({
  name: "adminauth",
  initialState: {
    user:null,
    token:localStorage.getItem("adminToken") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => { 
    builder
      .addCase(adminLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
 .addCase(adminLogin.fulfilled, (state, action) => {
  state.status = "succeeded";

  if (!action.payload.success) {
    state.error = action.payload.message;
    return;
  }

  const { access, refresh, user } = action.payload.data;

  state.user = user;
  state.token = access;

  localStorage.setItem("adminUser", JSON.stringify(user));
  localStorage.setItem("adminToken", access);
  localStorage.setItem("adminRefreshToken", refresh);
})


      .addCase(adminLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    },  
});
export const { logout } = adminauthSlice.actions;
export default adminauthSlice.reducer;