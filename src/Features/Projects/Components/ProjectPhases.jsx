import PhaseCard from "./PhaseCard";
import PhaseDetailsModal from "./PhaseModal";
import { useState } from "react";

export default function ProjectPhases({ phases = [] }) {
  const [selectedPhase, setSelectedPhase] = useState(null);

  if (!phases.length) {
    return (
      <p className="text-sm text-gray-500 text-center mt-6">
        No phases added yet
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {phases.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            onClick={() => setSelectedPhase(phase)}
          />
        ))}
      </div>

      {selectedPhase && (
        <PhaseDetailsModal
          phase={selectedPhase}
          onClose={() => setSelectedPhase(null)}
        />
      )}
    </>
  );
}
