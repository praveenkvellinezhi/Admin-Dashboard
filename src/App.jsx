import React from "react";
import AdminLayout from "./Layout/AdminLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Features/Dashboard/Pages/Dashboard";
import AttendencePage from "./Features/Attendence/Pages/AttendencePage";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Attendence" element={<AttendencePage/>} />


      </Route>
    </Routes>
  );
}

export default App;
