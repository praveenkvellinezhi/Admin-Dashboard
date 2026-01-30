import React from "react";
import {
  FileText,
  File,
  Download,
  ExternalLink,
  Folder,
} from "lucide-react";

export default function DocumentsCard({ employee }) {
  // ✅ SAFE FALLBACK (UNCHANGED)
  const emp = employee?.employee ?? {};

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center gap-3 px-6 py-4 border-b">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
          <Folder size={18} className="text-blue-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          Documents
        </h3>
      </div>

      {/* CONTENT */}
      <div className="divide-y divide-gray-200">
        {!emp.id_proof_document_url &&
          !emp.offer_letter_url &&
          !emp.resume && (
            <p className="px-6 py-4 text-sm text-gray-400">
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

        {emp.resume && (
          <DocumentRow
            label="Resume"
            url={emp.resume}
          />
        )}
      </div>
    </div>
  );
}

/* =========================
   DOCUMENT ROW
========================= */
function DocumentRow({ label, url }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <File size={18} className="text-blue-600" />
        </div>

        <span className="text-sm font-medium text-gray-900">
          {label}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-6 text-sm">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ExternalLink size={16} />
          View
        </a>

        <a
          href={url}
          download
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <Download size={16} />
          Download
        </a>
      </div>
    </div>
  );
}
