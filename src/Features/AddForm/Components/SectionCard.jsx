export default function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        {icon}
        <h3 className="text-sm font-semibold text-gray-800">
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
