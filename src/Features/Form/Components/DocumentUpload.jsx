import React, { useEffect, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";

/* =========================
   UPLOAD BOX (UI IMPROVED)
========================= */
function UploadBox({ label, name, file, onChange, disabled = false }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const isImage = file && file.type?.startsWith("image/");

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [file]);

  return (
    <div className={disabled ? "opacity-60 pointer-events-none" : ""}>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>

      <label
        className={`
          relative flex items-center justify-center
          h-36 rounded-xl border-2 border-dashed
          transition-all duration-200 bg-white
          ${
            disabled
              ? "border-gray-200 bg-gray-50"
              : "border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
          }
        `}
      >
        {!file && (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="p-3 rounded-full bg-gray-100">
              <UploadCloud className="text-gray-500" size={22} />
            </div>
            <p className="text-sm text-gray-600">
              Drop file here or{" "}
              <span className="text-blue-600 font-semibold">browse</span>
            </p>
          </div>
        )}

        {file && (
          <div className="flex items-center gap-4 px-4">
            {isImage ? (
              <img
                src={previewUrl}
                alt="preview"
                className="w-14 h-14 rounded-lg object-cover border"
              />
            ) : (
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={28} />
              </div>
            )}

            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate max-w-[160px]">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        )}

        <input
          type="file"
          name={name}
          onChange={onChange}
          disabled={disabled}
          className="hidden"
        />
      </label>
    </div>
  );
}

/* =========================
   ID PROOF TYPE SELECT (UI)
========================= */
function IdProofTypeSelect({ value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        ID Proof Type <span className="text-red-500">*</span>
      </label>

      <select
        name="id_proof_type"
        value={value || ""}
        onChange={onChange}
        className="
          w-full rounded-xl border border-gray-300
          px-4 py-3 text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
        <option value="">Select ID Proof Type</option>
        <option value="aadhaar">Aadhaar Card</option>
        <option value="pan">PAN Card</option>
        <option value="passport">Passport</option>
        <option value="driving_license">Driving License</option>
      </select>
    </div>
  );
}

/* =========================
   DOCUMENTS UPLOAD (CARD)
========================= */
export default function DocumentsUpload({
  formData,
  onChange,
  onFileChange,
}) {
  const uploadDisabled = !formData.id_proof_type;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* HEADER */}
      <div className="flex items-center gap-3 px-6 py-4 border-b bg-gray-50 rounded-t-2xl">
        <div className="p-2 bg-gray-200 rounded-lg">
          <FileText size={18} className="text-gray-700" />
        </div>
        <h3 className="text-base font-semibold text-gray-800">
          Documents Upload
        </h3>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-6">
        {/* RESUME */}
        <UploadBox
          label="Resume"
          name="resume"
          file={formData.resume}
          onChange={onFileChange}
        />

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            <IdProofTypeSelect
              value={formData.id_proof_type}
              onChange={onChange}
            />

            <UploadBox
              label="ID Proof Document"
              name="id_proof_document"
              file={formData.id_proof_document}
              onChange={onFileChange}
              disabled={uploadDisabled}
            />
          </div>

          {/* RIGHT */}
          <UploadBox
            label="Offer Letter"
            name="offer_letter"
            file={formData.offer_letter}
            onChange={onFileChange}
          />
        </div>
      </div>
    </div>
  );
}
