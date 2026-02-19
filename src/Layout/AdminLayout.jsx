import React, { useState } from "react";
import Sidebar from "../Components/Shared/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="flex h-screen bg-[#F3F3F3] ">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`
          flex-1 transition-all duration-300
          ${isOpen ? "ml-64" : "ml-20"}
        `}
      >
   

        <main className=" p-5 overflow-y-auto bg-[#F3F3F3]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
