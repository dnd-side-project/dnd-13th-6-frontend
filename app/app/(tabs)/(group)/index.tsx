import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface RankingItemProps {
  name: string;
  rank: number;
  distance: string;
  onDelete?: () => void;
}

const RankingItem: React.FC<RankingItemProps> = ({
  name,
  rank,
  distance,
  onDelete
}) => {
  // 왼쪽 스와이프 액션 (삭제)
  const renderRightActions = () => {
    return (
      <View style={styles.leftAction}>
        <Pressable
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert('삭제', `${name}의 정보를 편집합니다.`);
          }}
        >
          <Text style={styles.deleteButtonText}>삭제</Text>
        </Pressable>
      </View>
    );
  };
  const rankStyle = () => {
    switch (rank) {
      case 1:
        return 'bg-[#FFE500] border border-[2px] border-[#DA9E07]';
      case 2:
        return 'bg-[#D4D4D4] border border-[2px] border-white';
      case 3:
        return 'bg-[#F09749] border border-[2px] border-[#9D571A]';
      default:
        return '';
    }
  };

  const rankClass = rankStyle();
  return (
    <Swipeable
      friction={2}
      leftThreshold={80}
      rightThreshold={80}
      renderRightActions={renderRightActions}
    >
      <View
        style={rank % 2 !== 0 ? styles.rankingItemEven : styles.rankingItemOdd}
      >
        <View style={styles.rankBadge} className={rankClass}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
        <Image
          source={require('@/assets/images/ellipse-red.png')}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        />
        <View style={styles.itemContent}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

function Index() {
  const handleDelete = (name: string) => {
    console.log(`${name} 삭제됨`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이번 주의 크루 MVP는?</Text>
      <ScrollView
        style={styles.rankingList}
        showsVerticalScrollIndicator={false}
      >
        <RankingItem
          name="김민수"
          rank={1}
          distance="5.2km"
          onDelete={() => handleDelete('김민수')}
        />
        <RankingItem
          name="이지현"
          rank={2}
          distance="4.8km"
          onDelete={() => handleDelete('이지현')}
        />
        <RankingItem
          name="박준호"
          rank={3}
          distance="4.1km"
          onDelete={() => handleDelete('박준호')}
        />
        <RankingItem
          name="박준호"
          rank={3}
          distance="4.1km"
          onDelete={() => handleDelete('박준호')}
        />
        <RankingItem
          name="박준호"
          rank={4}
          distance="4.1km"
          onDelete={() => handleDelete('박준호')}
        />
        <RankingItem
          name="박준호"
          rank={5}
          distance="4.1km"
          onDelete={() => handleDelete('박준호')}
        />
      </ScrollView>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#313131'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
    color: 'white',
    marginTop: 36,
    marginVertical: 15
  },
  rankingList: {
    flex: 1
  },
  rankingItemOdd: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#313131',
    paddingHorizontal: 15,
    gap: 15
  },
  rankingItemEven: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 15,
    gap: 15
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rankText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  itemContent: {
    flex: 1
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4
  },
  distanceText: {
    fontSize: 14,
    color: '#666'
  },
  // 오른쪽 스와이프 액션 (삭제)
  rightAction: {
    width: 80,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },
  deleteButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  // 왼쪽 스와이프 액션 (편집)
  leftAction: {
    width: 80,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leaveButton: {},
  leaveButtonText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'semibold',
    textDecorationLine: 'underline',
    marginTop: 10
  }
});
