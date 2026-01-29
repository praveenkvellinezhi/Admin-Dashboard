import React, { useEffect, useState } from "react";
import { Upload, Eye, EyeOff } from "lucide-react";

export default function EmployeeBasicDetails({
  formData,
  onChange,
  onImageChange,
  backendErrors = {},
}) {
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    date_of_birth: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  /* =========================
     IMAGE PREVIEW
  ========================= */
  useEffect(() => {
    if (formData.profile_image) {
      const url = URL.createObjectURL(formData.profile_image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [formData.profile_image]);

  /* =========================
     VALIDATORS
  ========================= */
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  const validatePassword = (password) => /^\d{6}$/.test(password);
  const validateDOB = (dob) => dob && new Date(dob) < new Date();

  /* =========================
     BLUR VALIDATION
  ========================= */
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "email" && value && !validateEmail(value)
          ? "Invalid email"
          : name === "phone" && value && !validatePhone(value)
          ? "Invalid phone"
          : name === "password" && value && !validatePassword(value)
          ? "6 digits required"
          : name === "date_of_birth" && value && !validateDOB(value)
          ? "Future date not allowed"
          : "",
    }));
  };

  /* =========================
     CHANGE HANDLER
  ========================= */
  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length > 10) return;

      if (validatePhone(digits)) {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }

      onChange({
        target: { name, value: digits },
      });
      return;
    }

    if (
      (name === "email" && validateEmail(value)) ||
      (name === "password" && validatePassword(value)) ||
      (name === "date_of_birth" && validateDOB(value))
    ) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    onChange(e);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* HEADER */}
      <div className="px-4 py-2 border-b bg-gray-50 rounded-t-xl">
        <h3 className="text-xs font-semibold text-gray-700">
          Employee Basic Details
        </h3>
      </div>

      <div className="p-4">
        <div className="flex gap-6">
          {/* IMAGE */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={
                previewUrl ||
                formData.profile_image_url ||
                "https://i.pravatar.cc/150?img=3"
              }
              alt="Employee"
              className="w-20 h-20 rounded-full object-cover border"
            />

            <label className="flex items-center gap-1 text-[11px] text-white bg-red-500 px-3 py-1 rounded-full cursor-pointer">
              <Upload size={12} />
              Upload
              <input
                type="file"
                name="profile_image"
                accept="image/*"
                onChange={onImageChange}
                hidden
              />
            </label>

            {backendErrors?.profile_image && (
              <p className="text-[11px] text-red-500">
                {backendErrors.profile_image[0]}
              </p>
            )}
          </div>

          {/* FORM */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name || ""}
              error={backendErrors?.name?.[0]}
              onChange={handleLocalChange}
            />

            <InputField
              label="Address"
              name="address"
              value={formData.address || ""}
              error={backendErrors?.address?.[0]}
              onChange={handleLocalChange}
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email || ""}
              error={errors.email || backendErrors?.email?.[0]}
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />

            <InputField
              label="Phone"
              name="phone"
              value={formData.phone || ""}
              error={errors.phone || backendErrors?.phone?.[0]}
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />

            <InputField
              label="DOB"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth || ""}
              error={errors.date_of_birth || backendErrors?.date_of_birth?.[0]}
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />

            {/* PASSWORD */}
            <div>
              <label className="text-[11px] text-gray-600 block">
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
                  className={`w-full border rounded-md px-2 py-1.5 pr-8 text-xs ${
                    errors.password || backendErrors?.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {(errors.password || backendErrors?.password) && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.password || backendErrors.password[0]}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   INPUT FIELD
========================= */
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
      <label className="text-[11px] text-gray-600 block">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full border rounded-md px-2 py-1.5 text-xs ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="text-[11px] text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
}
