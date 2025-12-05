import React from "react";
import { projects } from "../Projectdata";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {

    const navigate=useNavigate();
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={()=>{
          
            
            
            navigate(`/Projects/${project.id}`)}}
          className="bg-white rounded-2xl shadow-md p-4 w-full mx-auto"
        >
          {/* Logo */}
          <div className="flex justify-center mb-4 mt-3">
            <img
              src={project.logo}
              alt="Logo"
              className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>

          {/* Title */}
          <h2 className="text-center text-xl font-semibold text-gray-800">
            {project.title}
          </h2>

          {/* Subtitle */}
          <p className="text-center text-gray-500 text-sm">
            {project.subtitle}
          </p>

          {/* Tech Stack */}
          <p className="text-center text-yellow-500 font-medium mt-1 text-sm">
            {project.techStack}
          </p>

          {/* Grayy info
           */}
          <div className="bg-[#F8F8F8] p-5 rounded-2xl mt-3">

            
          {/* Dates */}
          <div className="flex justify-between mt-6 text-gray-600 text-sm">
            <div>
              <p className="font-semibold text-xs">Start date</p>
              <p>{project.startDate}</p>
            </div>
            <div>
              <p className="font-semibold text-xs">Due date</p>
              <p>{project.dueDate}</p>
            </div>
          </div>

          {/* Members */}
          <div className="flex items-center gap-2 mt-4 pt-3 ">
            <div className="flex -space-x-2">
              {project.members.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="member"
                />
              ))}
            </div>

            <p className="text-gray-600 text-sm">
              + {project.extraMembers} members
            </p>
          </div>
          </div>

        </div>
      ))}
    </div>
  );
}
