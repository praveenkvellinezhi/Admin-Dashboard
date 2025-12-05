import React, { useState } from "react";
import Sidebar from "../Components/Shared/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="flex h-screen bg-[#F3F3F3] ">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content (moves based on sidebar width) */}
      <div
        className={`
          flex-1 transition-all duration-300
          ${isOpen ? "ml-64" : "ml-20"}
        `}
      >
        {/* HEADER */}
        {/* <div
          className={`
            fixed top-0 right-0 h-16 bg-white shadow z-40 transition-all duration-300
            ${isOpen ? "left-64" : "left-20"}
          `}
        >
          <Header />
        </div> */}

        {/* PAGE CONTENT */}
        <main className=" p-5 overflow-y-auto bg-[#F3F3F3]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
