import { Pressable, Text, View } from 'react-native';

interface GroupSettingContentProps {
  isAdminUser: boolean;
  onClose: () => void;
  onExitPress: () => void;
  onEditNoticePress?: () => void;
  onEditMemberPress?: () => void;
  onEditGroupInfoPress?: () => void;
}

interface GroupSettingItemProps {
  title: string;
  onPress?: () => void | Promise<void>;
  id: number;
}

function GroupSettingContent({
  isAdminUser,
  onClose,
  onExitPress,
  onEditNoticePress,
  onEditMemberPress,
  onEditGroupInfoPress
}: GroupSettingContentProps) {
  const normalSettingItems = [
    {
      id: 4,
      title: '그룹 탈퇴하기',
      onPress: onExitPress
    }
  ];

  const adminSettingItems: Array<GroupSettingItemProps> = [
    {
      id: 1,
      title: '공지 수정하기',
      onPress: onEditNoticePress
    },
    {
      id: 2,
      title: '멤버 관리하기',
      onPress: onEditMemberPress
    },
    {
      id: 3,
      title: '그룹 정보수정하기',
      onPress: onEditGroupInfoPress
    }
  ];
  const renderItem = (item: GroupSettingItemProps) => (
    <Pressable
      className="py-5 text-center bg-gray90 rounded-md"
      onPress={item.onPress}
    >
      <Text className="text-gray20 text-center text-headline1">
        {item.title}
      </Text>
    </Pressable>
  );

  return (
    <View className="flex px-[32px] gap-6">
      <View className="flex gap-3 flex-grow">
        {isAdminUser && adminSettingItems.map(item => renderItem(item))}
        {normalSettingItems.map(item => renderItem(item))}
      </View>

      <Pressable className="justify-end  py-[14px]" onPress={onClose}>
        <Text className="text-gray20 text-lg font-medium text-center">
          닫기
        </Text>
      </Pressable>
    </View>
  );
}

export default GroupSettingContent;
