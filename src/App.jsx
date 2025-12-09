import React from "react";
import AdminLayout from "./Layout/AdminLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Features/Dashboard/Pages/Dashboard";
import AttendencePage from "./Features/Attendence/Pages/AttendencePage";
import Employee from "./Features/Employees/Pages/EmployeePage";
import EmployeePage from "./Features/Employees/Pages/EmployeePage";
import InternsPage from "./Features/Interns/Pages/InternsPage";
import ProjectsPage from "./Features/Projects/Pages/ProjectsPage";
import ProjectDetails from "./Features/Projects/Pages/ProjectDetails";
import InternDetailsPage from "./Features/Interns/Pages/InternDetailsPage";
import EmployeePageDetails from "./Features/Employees/Pages/EmployeePageDetails";
import InternsAddingForm from "./Features/Interns/Pages/InternsAddingForm";
import EmployeeAddingForm from "./Features/Employees/Pages/EmployeeAddingForm";
import ProjectsAddingForm from "./Features/Projects/Pages/ProjectsAddingForm";
import { projects } from "./Features/Projects/Projectdata";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
       
       
        <Route path="/Projects" element={<ProjectsPage/>} />
            <Route path="/Projects/:id" element={<ProjectDetails projects={projects} />} />
            <Route path="/Project-Add" element={<ProjectsAddingForm/>} />


         <Route path="/Attendence" element={<AttendencePage/>} />
         <Route path="/Employee" element={<EmployeePage/>} />
            <Route path="/Employees/:id" element={<ProjectDetails />} />

            <Route path="/Employee-add" element={<EmployeeAddingForm />} />

        <Route path="/Interns" element={<InternsPage/>} />
            <Route path="/Interns/:id" element={<InternDetailsPage />} />
            <Route path="/Intern-Add" element={<InternsAddingForm />} />







      </Route>
    </Routes>
  );
}

export default App;
