import React from 'react';

type MainOverviewProps = {
  type?: string;
  distance: number;
};

function MainOverview({ type, distance }: MainOverviewProps) {
  return (
    <>
      {type ? (
        <></>
      ) : (
        <p className="pb-5 text-xl font-medium text-white/80">거리</p>
      )}
      <div className="flex items-baseline">
        <span
          className={`text-${type === 'finish' ? '7xl' : '8xl'} font-extrabold italic`}
        >
          {distance}
        </span>
        <span className="ml-2 text-4xl font-semibold italic text-gray-50">
          km
        </span>
      </div>
    </>
  );
}

export default MainOverview;
