import React from "react";
import AdminLayout from "./Layout/AdminLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Features/Dashboard/Pages/Dashboard";
import AttendencePage from "./Features/Attendence/Pages/AttendencePage";
import Employee from "./Features/Employees/Pages/EmployeePage";
import EmployeePage from "./Features/Employees/Pages/EmployeePage";
import InternsPage from "./Features/Interns/Pages/InternsPage";
import ProjectsPage from "./Features/Projects/Pages/ProjectsPage";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
       
       
        <Route path="/Projects" element={<ProjectsPage/>} />
         <Route path="/Attendence" element={<AttendencePage/>} />
         <Route path="/Employee" element={<EmployeePage/>} />
        <Route path="/Interns" element={<InternsPage/>} />





      </Route>
    </Routes>
  );
}

export default App;
