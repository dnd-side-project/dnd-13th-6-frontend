const StatCard = ({
  label,
  value,
  unit
}: {
  label: string;
  value: string;
  unit?: string;
}) => (
  <div className="text-center">
    <p className="text-lg font-semibold text-[#D1D1D6] font-pretendard">
      {label}
    </p>
    <div className="flex items-baseline justify-center">
      <p className="text-4xl font-bold text-white italic">{value}</p>
      {unit && (
        <p className="ml-1 text-xl font-medium text-gray-500 italic">{unit}</p>
      )}
    </div>
  </div>
);
export default StatCard;
