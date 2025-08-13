import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
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
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.distanceText}>{distance}</Text>
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
      <Text style={styles.title}>누가 가장 잘 뛰고있나요?</Text>
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
      </ScrollView>
      <View>
        <Pressable style={styles.leaveButton}>
          <Text style={styles.leaveButtonText}>탈퇴하기</Text>
        </Pressable>
        <Pressable style={styles.startButton}>
          <Text style={styles.startButtonText}>운동 시작하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center'
  },
  rankingList: {
    flex: 1
  },
  rankingItemOdd: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 15
  },
  rankingItemEven: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'white',
    paddingHorizontal: 15
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
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
    color: '#333',
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
  },
  startButton: {
    backgroundColor: '#28AA78',
    textAlign: 'center',
    marginInline: 18,
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 26
  },
  startButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'semibold',
    fontSize: 20
  }
});
