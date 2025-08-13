import React from 'react';
import { LockKeyhole } from 'lucide-react';

function GpsStatus() {
  return (
    <div className="absolute top-4 left-4 z-10 flex w-[calc(100%-2rem)] items-center justify-between">
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-[#353535] px-3 py-1.5 text-sm backdrop-blur-sm">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span>GPS 연결됨</span>
          </div>
          <div className="rounded-full bg-[#353535] p-2 backdrop-blur-sm">
            <LockKeyhole className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GpsStatus;
