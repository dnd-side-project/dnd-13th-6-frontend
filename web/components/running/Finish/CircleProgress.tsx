import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

function CircleProgress({ percent }: { percent: number }) {
  return (
    <div className="relative w-[110px] h-[110px]">
      <CircularProgressbar
        value={percent}
        strokeWidth={8}
        styles={{
          root: {
            overflow: 'visible'
          },
          path: {
            stroke: '#32FF76',
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 0.5s ease 0s',
            transformOrigin: 'center center',
            transform: 'rotate(90deg)' //회전
          },
          trail: {
            stroke: '#3A3A3C',
            strokeLinecap: 'round'
          },
          text: {
            display: 'none'
          }
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-gray-20 font-bold">
        <div className="align-baseline italic">
          <span className="text-3xl">{percent}</span>
          <span className="text-1xl">%</span>
        </div>
      </div>
    </div>
  );
}

export default CircleProgress;
