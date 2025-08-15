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
    <p className="text-lg font-semibold text-gray-30 pb-2">{label}</p>
    <div className="flex items-baseline justify-center">
      <p className="text-4xl font-bold text-white italic font-lufga">{value}</p>
      {unit && (
        <p className="ml-1 text-xl font-medium text-gray-50 italic font-lufga">
          {unit}
        </p>
      )}
    </div>
  </div>
);
export default StatCard;
