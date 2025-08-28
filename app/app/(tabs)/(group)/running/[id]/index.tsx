import useFetch from '@/hooks/useFetch';
import { Crew, MemberData } from '@/types/crew';
import { API_END_POINT } from '@/utils/apis/api';
import { useLocalSearchParams } from 'expo-router';
import { createContext, useContext, useLayoutEffect } from 'react';
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
import { CrewContext } from './_layout';

interface RankingItemProps {
  name: string;
  rank: number;
  distance: string;
  onDelete?: () => void;
  imageUrl: string;
}

const rankStyle = (rank: number) => {
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

const RankingItem: React.FC<RankingItemProps> = ({ name, rank, imageUrl }) => {
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

  const rankClass = rankStyle(rank);
  return (
    // <Swipeable
    //   friction={2}
    //   leftThreshold={80}
    //   rightThreshold={80}
    //   renderRightActions={renderRightActions}
    // >
    <View style={styles.rankingItem}>
      <View style={styles.rankBadge} className={rankClass}>
        <Text style={styles.rankText}>{rank}</Text>
      </View>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: 50, height: 50, borderRadius: 100 }}
        alt={name}
      />
      <View style={styles.itemContent}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </View>
    // </Swipeable>
  );
};

function Index() {
  const { id: crewId } = useLocalSearchParams();
  const handleDelete = (name: string) => {};

  const { crewInfo, crewMembers } = useContext(CrewContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이번 주의 크루 MVP는?</Text>
      <ScrollView
        style={styles.rankingList}
        showsVerticalScrollIndicator={false}
      >
        {crewMembers &&
          crewMembers.members.map(member => (
            <RankingItem
              key={member.memberId}
              name={member.nickname}
              imageUrl={member.character}
              rank={1}
              distance="5.2km"
              onDelete={() => handleDelete(member.nickname)}
            />
          ))}
      </ScrollView>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#313131',
    paddingBottom: 26
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
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#313131',
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
