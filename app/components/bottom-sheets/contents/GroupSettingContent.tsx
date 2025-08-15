import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

// 기존에 만든 Grid 컴포넌트 사용
import Grid from '../../ui/Grid';

interface GroupSettingItemProps {
  title: string;
  icon: string;
  backgroundColor: string;
  onPress: () => void;
}

function GroupSettingItem({
  title,
  icon,
  backgroundColor,
  onPress
}: GroupSettingItemProps) {
  return (
    <Pressable
      className="bg-[#636366] backdrop-blur-md rounded-lg p-5 min-h-[120px]"
      onPress={onPress}
    >
      <Text className="text-white text-[17px] font-bold mb-2">{title}</Text>
      <View
        className={`rounded-full flex items-center justify-center w-11 h-11 ml-auto mt-auto`}
        style={{ backgroundColor }}
      >
        <Ionicons name={icon as any} size={24} color="#fff" />
      </View>
    </Pressable>
  );
}

const settingItems = [
  {
    id: 1,
    title: '공지\n수정하기',
    icon: 'notifications-outline',
    backgroundColor: '#32FF76',
    onPress: () => console.log('공지 수정하기')
  },
  {
    id: 2,
    title: '멤버\n관리하기',
    icon: 'people-outline',
    backgroundColor: '#32FF76',
    onPress: () => console.log('멤버 관리하기')
  },
  {
    id: 3,
    title: '그룹 정보\n수정하기',
    icon: 'create-outline',
    backgroundColor: '#32FF76',
    onPress: () => console.log('그룹 정보 수정하기')
  },
  {
    id: 4,
    title: '그룹\n나가기',
    icon: 'exit-outline',
    backgroundColor: '#ef4444',
    onPress: () => console.log('그룹 나가기')
  }
];

function GroupSettingContent() {
  const renderItem = (item: GroupSettingItemProps) => (
    <GroupSettingItem
      title={item.title}
      icon={item.icon}
      backgroundColor={item.backgroundColor}
      onPress={item.onPress}
    />
  );

  return (
    <View className="px-[32px]">
      <Grid
        data={settingItems}
        numColumns={2}
        renderItem={renderItem}
        spacing={16}
      />
    </View>
  );
}

export default GroupSettingContent;
