import React from 'react';

function MainOverview() {
  return (
    <>
      <p className="pb-5 text-xl font-medium text-white/80">거리</p>
      <div className="flex items-baseline">
        <span className="text-9xl font-extrabold italic">1.06</span>
        <span className="ml-2 text-4xl font-semibold italic text-gray-50">
          km
        </span>
      </div>
    </>
  );
}

export default MainOverview;
