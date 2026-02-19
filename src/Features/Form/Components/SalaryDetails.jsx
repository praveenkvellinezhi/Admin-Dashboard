import React from "react";
import { Wallet } from "lucide-react";

export default function SalaryEmploymentDetails({ formData, onChange }) {
  const isIntern = formData.employment_type === "intern";

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-300 rounded-t-xl">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <Wallet size={16} className="text-gray-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          Salary & Employment Details
        </h3>
      </div>

      <div className="p-6 space-y-6">
        <Field label="Employee Type *">
          <select
            name="employment_type"
            value={formData.employment_type || ""}
            onChange={onChange}
            className={inputClass}
          >
            <option value="">Select Employee Type</option>
            <option value="staff">Employee</option>
            <option value="intern">Intern</option>
          </select>
        </Field>

        {!isIntern && (
          <>
            <Field label="Salary Type">
              <select
                name="salary_type"
                value={formData.salary_type || ""}
                onChange={onChange}
                className={inputClass}
              >
                <option value="">Select Salary Type</option>
                <option value="monthly">Monthly</option>
                <option value="hourly">Hourly</option>
                <option value="contract">Contract</option>
              </select>
            </Field>

            <Field label="Salary Amount">
              <input
                type="number"
                name="salary"
                value={formData.salary || ""}
                onChange={onChange}
                placeholder="Enter salary amount"
                className={inputClass}
              />
            </Field>

            <Field label="Payment Method">
              <select
                name="payment_method"
                value={formData.payment_method || ""}
                onChange={onChange}
                className={inputClass}
              >
                <option value="">Select Payment Method</option>
                <option value="bank">Bank Transfer</option>
                <option value="upi">UPI</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
              </select>
            </Field>
          </>
        )}
      </div>
    </div>
  );
}


function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}


const inputClass =
  "w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-sm " +
  "focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10";
