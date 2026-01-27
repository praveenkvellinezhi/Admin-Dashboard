import { FileText } from "lucide-react";

export default function DocumentsCard({ employee }) {
  // ✅ SAFE FALLBACK
  const emp = employee?.employee ?? {};

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <h3 className="px-4 py-3 border-b font-semibold text-sm">
        Documents
      </h3>

      <div className="p-4 space-y-3">
        {!emp.id_proof_document_url &&
          !emp.offer_letter_url &&
          !emp.resume_url && (
            <p className="text-sm text-gray-400">
              No documents uploaded
            </p>
          )}

        {emp.id_proof_document_url && (
          <DocumentRow
            label="ID Proof"
            url={emp.id_proof_document_url}
          />
        )}

        {emp.offer_letter_url && (
          <DocumentRow
            label="Offer Letter"
            url={emp.offer_letter_url}
          />
        )}

        {emp.resume_url && (
          <DocumentRow
            label="Resume"
            url={emp.resume_url}
          />
        )}
      </div>
    </div>
  );
}

function DocumentRow({ label, url }) {
  return (
    <div className="flex justify-between items-center rounded-md p-3">
      <div className="flex items-center gap-2">
        <FileText size={16} className="text-gray-500" />
        <span className="text-sm font-medium">
          {label}
        </span>
      </div>

      <div className="flex gap-3">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-blue-600 hover:underline"
        >
          View
        </a>
        <a
          href={url}
          download
          className="text-xs text-gray-600 hover:underline"
        >
          Download
        </a>
      </div>
    </div>
  );
}
