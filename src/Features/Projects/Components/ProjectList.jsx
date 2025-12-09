import React from "react";
import { Link } from "react-router-dom";

export default function ProjectList({ projects }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/Projects/${project.id}`}   // ✅ MATCHES YOUR ROUTE
          state={project}                  // ✅ SEND DATA TO DETAILS PAGE
          className="bg-white rounded-2xl shadow-md p-4 w-full mx-auto hover:shadow-lg transition"
        >
          {/* ✅ Logo */}
          <div className="flex justify-center mb-4 mt-3">
            <img
              src={project.logo}
              alt={project.title}
              className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>

          {/* ✅ Title */}
          <h2 className="text-center text-xl font-semibold text-gray-800">
            {project.title}
          </h2>

          {/* ✅ Subtitle */}
          <p className="text-center text-gray-500 text-sm">
            {project.subtitle}
          </p>

          {/* ✅ Tech Stack */}
          <p className="text-center text-yellow-500 font-medium mt-1 text-sm">
            {project.techStack}
          </p>

          {/* ✅ Info Section */}
          <div className="bg-[#F8F8F8] p-5 rounded-2xl mt-3">
            {/* ✅ Dates */}
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

            {/* ✅ Members (SAFE MAP — NO CRASH) */}
            <div className="flex items-center gap-2 mt-4 pt-3">
       <div className="flex  mt-2 -space-x-4">
  {project.members.map((member, index) => (
    <img
      key={index}
      src={member.image}
      alt={member.name}
      title={member.name}
      className="w-10 h-10 rounded-full border object-cover "
    />
  ))}
</div>

              <p className="text-gray-600 text-sm">
                + {project.extraMembers} members
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
