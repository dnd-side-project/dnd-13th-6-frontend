import React from 'react';

interface PageControlProps {
  pages: number;
  currentPage: number;
}

const PageControl: React.FC<PageControlProps> = ({ pages, currentPage }) => {
  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-full bg-[#353535] px-3 py-2 backdrop-blur-md z-50">
      {Array.from({ length: pages }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full bg-white transition-opacity ${
            index === currentPage ? 'opacity-100' : 'opacity-30'
          }`}
        />
      ))}
    </div>
  );
};

export default PageControl;
