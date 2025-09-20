import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { CrewContext } from './_layout';

interface RankingItemProps {
  name: string;
  rank: number;
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
    <View className="flex flex-row items-center justify-start bg-gray p-4 gap-4">
      <View
        className={
          rankClass + ' w-7 h-7 rounded-xl justify-center items-center'
        }
      >
        <Text className="text-headline1 text-white">{rank}</Text>
      </View>
      <Image
        source={{ uri: imageUrl }}
        className="w-14 h-14 rounded-full"
        alt={name}
      />
      <View className="flex-1 justify-center">
        <Text className="text-body1 text-white">{name}</Text>
      </View>
    </View>
  );
};

function Index() {
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
      className="bg-gray"
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Text className="text-title3 text-white ml-4 mt-9 ">
        이번 주의 크루 MVP는?
      </Text>
      <View>
        {crewMembers &&
          crewMembers.members
            .sort((a, b) => b.runningDistance - a.runningDistance)
            .map((member, index) => (
              <RankingItem
                key={member.memberId}
                name={member.nickname}
                imageUrl={member.badgeImageUrl}
                rank={index + 1}
              />
            ))}
      </View>
    </ScrollView>
  );
}

export default Index;
