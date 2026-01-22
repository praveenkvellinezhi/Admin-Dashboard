import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute";

/* Pages */
import Login from "./Features/Login/LoginPage";
import Dashboard from "./Features/Dashboard/Pages/Dashboard";
import AttendencePage from "./Features/Attendence/Pages/AttendencePage";
import EmployeePage from "./Features/Employees/Pages/EmployeePage";
import InternsPage from "./Features/Interns/Pages/InternsPage";
import ProjectsPage from "./Features/Projects/Pages/ProjectsPage";
import ProjectDetails from "./Features/Projects/Pages/ProjectDetails";
import InternDetailsPage from "./Features/Interns/Pages/InternDetailsPage";
import EmployeePageDetails from "./Features/Employees/Pages/EmployeeDetails";
import ProjectsAddingForm from "./Features/Projects/Pages/ProjectsAddingForm";
import AddingForm from "./Features/AddForm/Pages/AddingForm";
import InternPageDetails from "./Features/Interns/Pages/InternDetailsPage";
import ProjectAdd from "./Features/Projects/Pages/ProjectsAddingForm";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/Projects" element={<ProjectsPage />} />
          <Route
            path="/Projects/:id"
            element={<ProjectDetails  />}
          />
          <Route path="/Project-Add" element={<ProjectAdd />} />

          <Route path="/Attendence" element={<AttendencePage />} />

          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/Employees/:id" element={<EmployeePageDetails />} />

          <Route path="/Interns" element={<InternsPage />} />
          <Route path="/Interns/:id" element={<InternPageDetails />} />
          <Route path="/AddingForm" element={<AddingForm />} />

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
