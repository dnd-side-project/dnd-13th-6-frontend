import { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../../components/Button';
import { Crew } from '@/types/crew';
import { ENV } from '@/utils/app/consts';
import { API_END_POINT } from '@/utils/apis/api';
import { router } from 'expo-router';
interface Props {
  onClose: () => void;
  crewInfo: Crew | null;
  isLastUser: boolean;
}

function GroupExitContent({ onClose, crewInfo, isLastUser }: Props) {
  const [reaseon, setReaseon] = useState<string>('');

  const onExit = async () => {
    try {
      if (crewInfo) {
        const url = `${ENV.API_BASE_URL}/${API_END_POINT.CREWS.EXIT_CREW(
          crewInfo.crewId
        )}`;
        const ret = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': '1'
          }
        });
        if (ret.ok) {
          router.push('/(tabs)/(group)');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onExist = () => {
    if (crewInfo) {
      console.log(isLastUser);
      if (crewInfo.leaderNickname === 'leader' && !isLastUser) {
        onClose();
        return;
      }
      onExit();
    }
  };
  return (
    <View className="mb-4">
      <Text className="text-white text-title3">정말 탈퇴하시겠어요?</Text>
      <Text className="font-medium mt-2 text-gray40">{`탈퇴하면 지금까지의 모든 기록이 삭제됩니다.\n다시 초대받아도 기록은 복구되지 않습니다.`}</Text>
      <Button
        className="bg-red rounded-xl py-[14px] text-body1 mt-11"
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
