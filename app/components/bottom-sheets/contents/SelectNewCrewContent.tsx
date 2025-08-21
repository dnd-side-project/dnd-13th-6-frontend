import { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../../components/Button';
interface Props {
  onClose: () => void;
}

function GroupExitContent({ onClose }: Props) {
  const [reaseon, setReaseon] = useState<string>('');

  const onConfirm = () => {
    console.log('onConfirm');
    onClose();
  };
  return (
    <View className="mb-4">
      <Text className="text-white text-title3">
        떠나기 전에 새 리더를 정해주세요
      </Text>
      <Text className="font-medium mt-2 text-gray40">{`현재 크루 리더는 [닉네임]닙이에요.\n새 리더를 정해야 탈퇴할 수 있어요.`}</Text>
      <Button
        className="bg-main rounded-xl text-body1 mt-11 py-[14px]"
        onPress={onConfirm}
      >
        <Text className="text-center text-black text-headline1"> 위임하기</Text>
      </Button>
      <Button className="bg-gray rounded-md py-4" onPress={onClose}>
        <Text className="text-white text-center text-headline1">그만두기</Text>
      </Button>
    </View>
  );
}

export default GroupExitContent;
