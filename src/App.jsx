import React from "react";
import AdminLayout from "./Layout/AdminLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Features/Dashboard/Pages/Dashboard";
import Attendence from "./Features/Employees/Pages/Attendence";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Attendence" element={<Attendence />} />


      </Route>
    </Routes>
  );
}

export default App;
