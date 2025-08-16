import { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../../components/Button';
interface Props {
  onClose: () => void;
}

function GroupExitContent({ onClose }: Props) {
  const [reaseon, setReaseon] = useState<string>('');

  const onExist = () => {
    onClose();
  };
  return (
    <View className="mb-4">
      <Text className="text-white text-title3">정말 탈퇴하시겠어요?</Text>
      <Text className="font-medium mt-2 text-gray40">{`탈퇴하면 지금까지의 모든 기록이 삭제됩니다.\n다시 초대받아도 기록은 복구되지 않습니다.`}</Text>
      <Button
        className="bg-red-500 rounded-md py-[14px] text-body1 mt-11"
        onPress={onExist}
      >
        <Text className="text-center text-white"> 탈퇴하기</Text>
      </Button>
      <Button
        className="bg-gray rounded-md py-[14px] font-body1"
        onPress={onClose}
      >
        <Text className="text-white font-body1 text-center">닫기</Text>
      </Button>
    </View>
  );
}

export default GroupExitContent;
