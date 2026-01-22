import { configureStore } from "@reduxjs/toolkit";
import adminauthReducer from "./Slices/adminauthSlice";
import employeereducer from "./Slices/employeeslice"
import internReducer from "./Slices/internSlice"
import projectReducer from "./Slices/projectSlice"
import statusReducer from "./Slices/statsSlice"
import ongoingReducer from "./Slices/ongoingProjectSlice" 

export const store = configureStore({
  reducer: {
    adminauth: adminauthReducer,
    employees:employeereducer,
    interns:internReducer,
    projects:projectReducer,
    stats:statusReducer,
    ongoingProjects:ongoingReducer,

  },
});