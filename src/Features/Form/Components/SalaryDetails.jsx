import { Wallet, ChevronDown } from "lucide-react";

export default function SalaryEmploymentDetails({ formData, onChange }) {
  const isIntern = formData.employment_type === "intern";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Wallet size={16} className="text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-700">
            Salary & Employment Details
          </h3>
        </div>
        <ChevronDown size={16} className="text-gray-500" />
      </div>

            <div className="p-4 space-y-4">
                <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Employee Type
          </label>
          <select
            name="employment_type"
            value={formData.employment_type || ""}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Type</option>
            <option value="staff">Employee</option>
            <option value="intern">Intern</option>
          </select>
        </div>

                {!isIntern && (
          <>
                        <div>
              <label className="text-xs text-gray-600 mb-1 block">
                Salary Type
              </label>
              <select
                name="salary_type"
                value={formData.salary_type || ""}
                onChange={onChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Salary Type</option>
                <option value="monthly">Monthly</option>
                <option value="hourly">Hourly</option>
                <option value="contract">Contract</option>
              </select>
            </div>

                        <div>
              <label className="text-xs text-gray-600 mb-1 block">
                Salary Amount
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary || ""}
                onChange={onChange}
                placeholder="Enter salary amount"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

                        <div>
              <label className="text-xs text-gray-600 mb-1 block">
                Payment Method
              </label>
              <select
                name="payment_method"
                value={formData.payment_method || ""}
                onChange={onChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Payment Method</option>
                <option value="bank">Bank Transfer</option>
                <option value="upi">UPI</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>

                        <div>
           
            </div>
          </>
        )}
      </div>
    </div>
  );
}
