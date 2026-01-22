import { useState } from "react";
import PhaseCard from "./PhaseCard";
import PhaseDetailsModal from "./PhaseModal";

export default function ProjectPhases({ phases }) {
  const [selectedPhase, setSelectedPhase] = useState(null);

  return (
    <>
      {/* Phase Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            onClick={() => setSelectedPhase(phase)}
          />
        ))}
      </div>

      {/* Phase Details Modal */}
      {selectedPhase && (
        <PhaseDetailsModal
          phase={selectedPhase}
          onClose={() => setSelectedPhase(null)}
        />
      )}
    </>
  );
}
