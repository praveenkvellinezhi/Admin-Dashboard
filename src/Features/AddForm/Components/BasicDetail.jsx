import { Upload, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function EmployeeBasicDetails({
  formData,
  onChange,
  onImageChange,
}) {
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    date_of_birth: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  /* ================= VALIDATORS ================= */

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  // ✅ EXACTLY 6 DIGITS
  const validatePassword = (password) => /^\d{6}$/.test(password);

  const validateDOB = (dob) => {
    if (!dob) return false;
    return new Date(dob) < new Date();
  };

  /* ================= BLUR VALIDATION ================= */

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "email" && value && !validateEmail(value)
          ? "Enter a valid email address"
          : name === "phone" && value && !validatePhone(value)
            ? "Enter a valid 10-digit phone number"
            : name === "password" && value && !validatePassword(value)
              ? "Password must be exactly 6 digits"
              : name === "date_of_birth" && value && !validateDOB(value)
                ? "DOB cannot be a future date"
                : "",
    }));
  };

  /* ================= CHANGE HANDLER ================= */

  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    // Clear error immediately when valid
    if (
      (name === "email" && validateEmail(value)) ||
      (name === "phone" && validatePhone(value)) ||
      (name === "password" && validatePassword(value)) ||
      (name === "date_of_birth" && validateDOB(value))
    ) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    onChange(e);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="px-6 py-3 border-b bg-gray-50 rounded-t-2xl">
        <h3 className="text-sm font-semibold text-gray-700">
          Employee Basic Details
        </h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex gap-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={
                formData.profile_image_url || "https://i.pravatar.cc/150?img=3"
              }
              alt="Employee"
              className="w-24 h-24 rounded-full object-cover border"
            />

            <label className="flex items-center gap-2 text-xs text-white bg-red-500 px-4 py-1.5 rounded-full cursor-pointer">
              <Upload size={14} />
              Upload
              <input
                type="file"
                name="profile_image"
                accept="image/*"
                onChange={onImageChange}
                hidden
              />
            </label>
          </div>

          {/* Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <InputField
              label="Full Name"
              name="name"
              value={formData.name || ""}
              onChange={handleLocalChange}
            />

            {/* Address */}
            <InputField
              label="Address"
              name="address"
              value={formData.address || ""}
              onChange={handleLocalChange}
            />

            {/* Email */}
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email || ""}
              error={errors.email}
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />

            {/* Phone */}
            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone || ""}
              error={errors.phone}
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />

            {/* Date of Birth */}
            <InputField
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth || ""}
              error={errors.date_of_birth}
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />

            {/* Password */}
            <div>
              <label className="text-xs text-gray-600 block">
                Password (6 digits)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password || ""}
                  onChange={handleLocalChange}
                  onBlur={handleBlur}
                  maxLength={6}
                  inputMode="numeric"
                  className={`w-full border  border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */

function InputField({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
  onBlur,
}) {
  return (
    <div>
      <label className="text-xs text-gray-600 block">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full border  border-gray-300 rounded-lg px-3 py-2 text-sm ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
