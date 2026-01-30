import React, { useEffect, useState } from "react";
import { Upload, Eye, EyeOff, User, PersonStanding } from "lucide-react";

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
          ? "Invalid phone number"
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

      onChange({ target: { name, value: digits } });
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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* HEADER */}
      <div className="flex items-center gap-3 px-5 py-4 border-b rounded-t-xl">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <User size={16} className="text-gray-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          Employee Basic Details
        </h3>
      </div>

      {/* BODY */}
      <div className="p-6">
        <div className="grid grid-cols-12 gap-8">
          {/* PROFILE IMAGE */}
          <div className="col-span-12 md:col-span-3">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-32 h-32 rounded-xl border bg-gray-100 flex items-center justify-center overflow-hidden">
                {previewUrl || formData.profile_image_url ? (
                  <img
                    src={previewUrl || formData.profile_image_url}
                    alt="Employee"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PersonStanding size={48} className="text-gray-300" />
                )}

                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition cursor-pointer">
                  <Upload size={20} className="text-white" />
                  <input
                    type="file"
                    name="profile_image"
                    accept="image/*"
                    onChange={onImageChange}
                    hidden
                    required
                  />
                </label>
              </div>

              <p className="text-xs text-gray-500">
                Upload profile photo <span className="text-red-500">*</span>
              </p>

              {backendErrors?.profile_image && (
                <p className="text-[11px] text-red-500">
                  {backendErrors.profile_image[0]}
                </p>
              )}
            </div>
          </div>

          {/* FORM */}
          <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name || ""}
              error={backendErrors?.name?.[0]}
              onChange={handleLocalChange}
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email || ""}
              error={errors.email || backendErrors?.email?.[0]}
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />

            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone || ""}
              error={errors.phone || backendErrors?.phone?.[0]}
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />

            <InputField
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth || ""}
              error={errors.date_of_birth || backendErrors?.date_of_birth?.[0]}
              onChange={handleLocalChange}
              onBlur={handleBlur}
            />

            {/* GENDER */}
            <div>
              <label className="text-xs text-gray-600 mb-2 block">
                Gender <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-3">
                {["male", "female", "other"].map((g) => (
                  <label
                    key={g}
                    className={`px-4 py-2 border rounded-full cursor-pointer text-sm
                      ${
                        formData.gender === g
                          ? "bg-black text-white border-black"
                          : "border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleLocalChange}
                      className="hidden"
                      required
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs text-gray-600 mb-1 block">
                Password (6 digits) <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password || ""}
                  onChange={handleLocalChange}
                  onBlur={handleBlur}
                  maxLength={6}
                  required
                  className={`w-full border rounded-lg px-3 py-2 pr-10 text-sm ${
                    errors.password || backendErrors?.password
                      ? "border-red-500"
                      : "border-gray-300"
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

              {(errors.password || backendErrors?.password) && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password || backendErrors.password[0]}
                </p>
              )}
            </div>

            {/* ADDRESS (OPTIONAL) */}
            <InputField
              label="Address"
              name="address"
              value={formData.address || ""}
              onChange={handleLocalChange}
              required={false}
              full
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   INPUT FIELD (REQUIRED BY DEFAULT)
========================= */
function InputField({ label, full, required = true, error, ...props }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-xs text-gray-600 mb-1 block">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input
        {...props}
        required={required}
        className={`w-full border rounded-lg px-3 py-2 text-sm ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
