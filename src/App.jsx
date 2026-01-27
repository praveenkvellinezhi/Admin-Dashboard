import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./Layout/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute";

/* AUTH */
import Login from "./Features/Login/LoginPage";

/* DASHBOARD */
import Dashboard from "./Features/Dashboard/Pages/Dashboard";

/* ATTENDENCE */
import AttendencePage from "./Features/Attendence/Pages/AttendencePage";

/* EMPLOYEES */
import EmployeePage from "./Features/Employees/Pages/EmployeePage";
import EmployeePageDetails from "./Features/Employees/Pages/EmployeeDetails";

/* INTERNS */
import InternsPage from "./Features/Interns/Pages/InternsPage";
import InternDetailsPage from "./Features/Interns/Pages/InternDetailsPage";

/* PROJECTS */
import ProjectsPage from "./Features/Projects/Pages/ProjectsPage";
import ProjectDetails from "./Features/Projects/Pages/ProjectDetails";
import ProjectAdd from "./Features/Projects/Pages/ProjectsAddingForm";
import ProjectEdit from "./Features/Projects/Pages/ProjectEditPage";

/* FORMS */
import AddingForm from "./Features/Form/Pages/AddingForm";
import EditForm from "./Features/Form/Pages/EditForm";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          
          {/* DASHBOARD */}
          <Route index element={<Dashboard />} />

          {/* PROJECTS */}
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/add" element={<ProjectAdd />} />
          <Route path="projects/edit/:id" element={<ProjectEdit />} />
          <Route path="projects/:id" element={<ProjectDetails />} />

          {/* ATTENDENCE */}
          <Route path="attendence" element={<AttendencePage />} />

          {/* EMPLOYEES */}
          <Route path="employees" element={<EmployeePage />} />
          <Route path="employees/edit/:id" element={<EditForm />} />
          <Route path="employees/:id" element={<EmployeePageDetails />} />

          {/* INTERNS */}
          <Route path="interns" element={<InternsPage />} />
          <Route path="interns/edit/:id" element={<EditForm />} />
          <Route path="interns/:id" element={<InternDetailsPage />} />

          {/* COMMON */}
          <Route path="addingform" element={<AddingForm />} />

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
