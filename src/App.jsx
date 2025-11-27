import React from "react";
import AdminLayout from "./Layout/AdminLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Features/Dashboard/Pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
