import React from "react";
import { DollarSign, CreditCard, Calendar, ChevronRight } from "lucide-react";

export default function SalaryEmploymentDetails({ employee }) {
  const capitalizeFirst = (value) => {
    if (!value) return "—";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  // ✅ SAFE FALLBACK (UNCHANGED)
  const emp = employee?.employee ?? {};

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
            <DollarSign size={18} className="text-blue-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800">
            Salary & Employment
          </h3>
        </div>

      </div>

      {/* ROWS */}
      <div className="divide-y divide-gray-200">
        <InfoRow
          icon={<DollarSign size={18} />}
          label="Salary Type"
          value={capitalizeFirst(emp.salary_type)}
        />

        <InfoRow
          icon={<CreditCard size={18} />}
          label="Payment Method"
          value={capitalizeFirst(emp.payment_method)}
        />

        <InfoRow
          icon={<Calendar size={18} />}
          label="Contract Start Date"
          value={emp.joining_date || "—"}
        />
      </div>
    </div>
  );
}

/* =========================
   REUSABLE ROW
========================= */
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3 text-gray-600 text-sm">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
        <span>{label}</span>
      </div>

      <span className="text-sm font-semibold text-gray-900">
        {value}
      </span>
    </div>
  );
}
