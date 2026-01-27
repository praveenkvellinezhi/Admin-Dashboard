import { UploadCloud, FileText } from "lucide-react";

function UploadBox({ label, name, file, onChange, disabled = false }) {
  const isImage = file && file.type?.startsWith("image/");
  const previewUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className={`${disabled ? "opacity-50" : ""}`}>
      <p className="text-sm text-gray-700 mb-2">{label}</p>

      <label
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-28 transition bg-white overflow-hidden
          ${
            disabled
              ? "border-gray-200 cursor-not-allowed"
              : "border-gray-300 cursor-pointer hover:border-blue-400"
          }
        `}
      >
        {!file && (
          <>
            <UploadCloud size={22} className="text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Drag & Drop or{" "}
              <span className="text-blue-600 font-medium">Browse</span>
            </p>
          </>
        )}

        {file && (
          <div className="flex items-center gap-3 px-3">
            {isImage ? (
              <img
                src={previewUrl}
                alt="preview"
                className="w-14 h-14 object-cover rounded border"
              />
            ) : (
              <FileText className="text-blue-600" size={32} />
            )}

            <div className="text-left">
              <p className="text-sm font-medium text-gray-700 truncate max-w-[140px]">
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

      {disabled && (
        <p className="text-xs text-red-500 mt-1">Not required for interns</p>
      )}
    </div>
  );
}


export default function DocumentsUpload({ onChange, formData }) {
  const isIntern = formData.employment_type === "intern";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-gray-50 rounded-t-lg">
        <FileText size={16} className="text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-700">
          Documents Upload
        </h3>
      </div>

      <div className="p-4 space-y-4">
        <UploadBox
          label="Resume"
          name="resume"
          file={formData.resume}
          onChange={onChange}
          disabled={isIntern}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UploadBox
            label="ID Proof"
            name="id_proof_document"
            file={formData.id_proof_document}
            onChange={onChange}
          />

          <UploadBox
            label="Offer Letter"
            name="offer_letter"
            file={formData.offer_letter}
            onChange={onChange}
            disabled={isIntern}
          />
        </div>
      </div>
    </div>
  );
}
