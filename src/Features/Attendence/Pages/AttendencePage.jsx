import React, { useState } from "react";
import { employeeData, internData } from "../data";
import AttendanceHeader from "../Components/AttendanceHeader";
import AttendanceList from "../Components/AttendenceList";

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("employees");
  const [search, setSearch] = useState("");
  const [, setDate] = useState("");

  // Choose data based on active tab
  const rawData = activeTab === "employees" ? employeeData : internData;

  // Apply filtering
  const filteredData = rawData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="
        w-full 
        px-3 sm:px-5 lg:px-6 
        py-4 sm:py-6 
        space-y-4 sm:space-y-6
      "
    >
      <AttendanceHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSearch={setSearch}
        setDate={setDate}
      />

 
      <AttendanceList rows={filteredData} />
    </div>
  );
}

