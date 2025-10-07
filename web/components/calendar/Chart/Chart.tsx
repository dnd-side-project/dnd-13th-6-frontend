import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Cell,
  LabelProps,
  RectangleProps
} from 'recharts';
import Card from '@/components/main/Card';

const RoundedBar = (props: RectangleProps) => {
  const { fill, x, y, width, height } = props;
  const radius = 6;

  if (height === 0) {
    return null;
  }

  // width, height, x, y가 undefined일 수 있으므로 기본값 지정
  const safeX = x ?? 0;
  const safeY = y ?? 0;
  const safeWidth = width ?? 0;
  const safeHeight = height ?? 0;

  // Path for a rectangle with rounded top-left and top-right corners
  const path = `M${safeX},${safeY + radius} 
                A${radius},${radius} 0 0 1 ${safeX + radius},${safeY} 
                L${safeX + safeWidth - radius},${safeY} 
                A${radius},${radius} 0 0 1 ${safeX + safeWidth},${safeY + radius} 
                L${safeX + safeWidth},${safeY + safeHeight} 
                L${safeX},${safeY + safeHeight} Z`;

  return <path d={path} fill={fill} />;
};
type ChartProps = {
  title: string;
  data: { name: string; value: number }[];
  unit?: string;
  valueFormatter?: (value: number) => string;
};

export default function Chart({
  title,
  data,
  unit,
  valueFormatter
}: ChartProps) {
  const formatValue = (value: number) => {
    if (valueFormatter) {
      return valueFormatter(value);
    }
    return `${value}${unit || ''}`;
  };

  const renderLabel = (props: LabelProps) => {
    const { x, y, width, value } = props;

    // x, y, width 안전하게 number로 변환
    const safeX = Number(x ?? 0);
    const safeY = Number(y ?? 0);
    const safeWidth = Number(width ?? 0);

    // value를 숫자로 변환
    const numericValue = Number(value ?? 0);

    if (numericValue > 0) {
      return (
        <text
          x={safeX + safeWidth / 2}
          y={safeY}
          dy={-4}
          fill="white"
          fontSize={12}
          textAnchor="middle"
        >
          {formatValue(numericValue)}
        </text>
      );
    }

    return null;
  };

  return (
    <div className="mt-10">
      <p className="pretendard-headline text-gray-20 mb-4">{title}</p>
      <Card className="bg-[#252427] p-[-16px]">
        <ResponsiveContainer width="100%" height={152}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: -10, bottom: 5 }}
          >
            <XAxis
              dataKey="name"
              axisLine={{ stroke: 'white' }}
              tickLine={false}
              tick={{ fill: 'white', fontSize: 12 }}
            />
            <YAxis
              axisLine={{ stroke: 'white' }}
              tickLine={false}
              tick={{ fill: '#A0A0A0', fontSize: 12 }}
              tickFormatter={formatValue}
            />
            <Bar dataKey="value" shape={<RoundedBar />} maxBarSize={25}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={'#32ff76'} />
              ))}
              <LabelList dataKey="value" content={renderLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
