import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute";

/* Pages */
import Login from "./Features/Login/LoginPage";
import Dashboard from "./Features/Dashboard/Pages/Dashboard";
import AttendencePage from "./Features/Attendence/Pages/AttendencePage";
import EmployeePage from "./Features/Employees/Pages/EmployeePage";
import EmployeePageDetails from "./Features/Employees/Pages/EmployeeDetails";
import InternsPage from "./Features/Interns/Pages/InternsPage";
import InternDetailsPage from "./Features/Interns/Pages/InternDetailsPage";
import ProjectsPage from "./Features/Projects/Pages/ProjectsPage";
import ProjectDetails from "./Features/Projects/Pages/ProjectDetails";
import ProjectAdd from "./Features/Projects/Pages/ProjectsAddingForm";
import ProjectEdit from "./Features/Projects/Pages/ProjectEditPage";
import AddingForm from "./Features/AddForm/Pages/AddingForm";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />

          {/* PROJECTS */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/add" element={<ProjectAdd />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects/edit/:id" element={<ProjectEdit />} />

          {/* ATTENDENCE */}
          <Route path="/attendence" element={<AttendencePage />} />

          {/* EMPLOYEES */}
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/employees/:id" element={<EmployeePageDetails />} />

          {/* INTERNS */}
          <Route path="/interns" element={<InternsPage />} />
          <Route path="/interns/:id" element={<InternDetailsPage />} />

          {/* COMMON */}
          <Route path="/addingform" element={<AddingForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
