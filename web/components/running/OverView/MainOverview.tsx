import React from 'react';

type MainOverviewProps = {
  type?: string;
  distance?: number;
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
          className={`${type === 'finish' ? 'text-7xl' : 'text-8xl'} font-lufga font-extrabold italic`}
        >
          {distance === 0 ? '0.00' : distance}
        </span>

        <span className="font-lufga ml-2 text-4xl font-semibold text-gray-50 italic">
          km
        </span>
      </div>
    </>
  );
}

export default MainOverview;
