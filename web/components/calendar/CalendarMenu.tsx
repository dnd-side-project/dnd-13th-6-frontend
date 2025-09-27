import React from 'react';

export default function CalendarMenu() {
  const [selectedView, setSelectedView] = React.useState<'week' | 'month'>(
    'week'
  );

  return (
    <>
      <div className="flex justify-between gap-10 p-3">
        <button
          className={`flex-1 text-[19px] tracking-[-0.014em] ${selectedView === 'week' ? 'font-bold' : ''}`}
          onClick={() => setSelectedView('week')}
        >
          주간
        </button>
        <button
          className={`flex-1 text-[19px] tracking-[-0.014em] ${selectedView === 'month' ? 'font-bold' : ''}`}
          onClick={() => setSelectedView('month')}
        >
          월간
        </button>
      </div>

      <div className="bg-gray-80 relative -mx-[14px] h-[2px]">
        <div
          className={`absolute top-0 h-[2px] w-1/2 transition-all duration-300 ${
            selectedView === 'week' ? 'left-0' : 'left-1/2'
          } bg-white`}
        />
      </div>
    </>
  );
}
