import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { CrewContext } from './_layout';

interface RankingItemProps {
  name: string;
  rank: number;
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
  const rankClass = rankStyle(rank);
  return (
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
  );
};

function Index() {
  const handleDelete = (name: string) => {};
  const [duration, setDuration] = useState<number>(0);
  const { crewMembers, crewInfo } = useContext(CrewContext);

  useEffect(() => {
    const createdAt = new Date(crewInfo?.createdAt || '');
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDuration(diffDays);
  }, []);
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ minHeight: 750 }}
    >
      <Text style={styles.title}>이번 주의 크루 MVP는?</Text>
      <View style={styles.rankingList}>
        {crewMembers &&
          crewMembers.members
            .sort((a, b) => b.runningDistance - a.runningDistance)
            .map((member, index) => (
              <RankingItem
                key={member.memberId}
                name={member.nickname}
                imageUrl={member.badgeImageUrl}
                rank={index + 1}
                onDelete={() => handleDelete(member.nickname)}
              />
            ))}
      </View>
    </ScrollView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
