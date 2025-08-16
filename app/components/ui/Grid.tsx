import { View } from 'react-native';
interface GridProps {
  data: any[];
  numColumns: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  spacing?: number;
  containerClassName?: string;
}

const Grid: React.FC<GridProps> = ({
  data,
  numColumns,
  containerClassName,
  renderItem,
  spacing = 10
}) => {
  const rows = [];
  for (let i = 0; i < data.length; i += numColumns) {
    rows.push(data.slice(i, i + numColumns));
  }

  return (
    <View className={containerClassName} style={{ padding: spacing / 2 }}>
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: 'row',
            marginBottom: spacing
          }}
        >
          {row.map((item, colIndex) => (
            <View
              key={colIndex}
              style={{
                flex: 1,
                marginHorizontal: spacing / 2
              }}
            >
              {renderItem(item, rowIndex * numColumns + colIndex)}
            </View>
          ))}
          {/* 빈 공간 채우기 */}
          {row.length < numColumns &&
            Array.from({ length: numColumns - row.length }).map((_, index) => (
              <View key={`empty-${index}`} style={{ flex: 1 }} />
            ))}
        </View>
      ))}
    </View>
  );
};

export default Grid;
