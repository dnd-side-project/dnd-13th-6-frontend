import React from 'react';
import { Locate } from 'lucide-react';

function GpsStatus({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed top-17 right-5 z-10 flex items-center gap-2">
      <button
        className="rounded-full bg-[#353535] p-2 backdrop-blur-sm"
        onClick={onClick}
      >
        <Locate size={24} />
      </button>
    </div>
  );
}

export default GpsStatus;
