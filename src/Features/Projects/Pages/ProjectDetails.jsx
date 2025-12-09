import { useParams } from "react-router-dom";

export default function ProjectDetails({ projects = [] }) {
  const { id } = useParams();

  const project = projects.find((item) => item.id === Number(id));

  if (!project) {
    return <h2 className="text-center mt-10 text-red-500">Project Not Found</h2>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold text-center">{project.title}</h2>

      <p className="text-gray-600 text-center mt-2">
        {project.category}
      </p>

      <div className="mt-6 space-y-2">
        <p><strong>Client:</strong> {project.client}</p>
        <p><strong>Status:</strong> {project.status}</p>
        <p><strong>Tech Stack:</strong> {project.tech}</p>
        <p className="mt-4 text-gray-700">{project.description}</p>
      </div>
    </div>
  );
}
