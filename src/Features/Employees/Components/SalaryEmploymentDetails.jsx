export default function SalaryEmploymentDetails({ employee }) {
  const capitalizeFirst = (value) => {
    if (!value) return "—";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  // ✅ SAFE FALLBACK
  const emp = employee?.employee ?? {};

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <h3 className="px-4 py-3 border-b font-semibold text-sm">
        Salary & Employment Details
      </h3>

      <div className="p-4 space-y-3 text-sm">
        <Row
          label="Salary Type"
          value={capitalizeFirst(emp.salary_type)}
        />
        <Row
          label="Payment Method"
          value={capitalizeFirst(emp.payment_method)}
        />
        <Row
          label="Contract Start Date"
          value={emp.joining_date || "—"}
        />
      </div>
    </div>
  );
}

const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
