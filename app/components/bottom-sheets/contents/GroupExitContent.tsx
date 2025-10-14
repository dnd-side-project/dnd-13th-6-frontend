import { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../../components/Button';
import { Crew } from '@/types/crew';
import { ENV } from '@/utils/app/consts';
import { API_END_POINT } from '@/utils/apis/api';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props {
  onClose: () => void;
  crewInfo: Crew | null;
}

function GroupExitContent({ onClose, crewInfo }: Props) {

  const onExit = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if(crewInfo?.isLeader) {
      try {
        const url = `${ENV.API_BASE_URL}/${API_END_POINT.CREWS.DELETE_CREW(
            crewInfo.crewId
          )}`;
          const ret = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Cookie: `accessToken=${token}`,
              Authorization: `Bearer ${token}`
            }
          });
          if (ret.ok) {
            router.push('/(tabs)/(group)');
          }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (crewInfo) {
          const url = `${ENV.API_BASE_URL}/${API_END_POINT.CREWS.EXIT_CREW(
            crewInfo.crewId
          )}`;
          const ret = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Cookie: `accessToken=${token}`,
              Authorization: `Bearer ${token}`
            }
          });
          if (ret.ok) {
            router.push('/(tabs)/(group)');
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

  };

  return (
    <View className="mb-4">
      <Text className="text-white text-title3">정말 탈퇴하시겠어요?</Text>
      <Text className="font-medium mt-2 text-gray40">{`탈퇴하면 지금까지의 모든 기록이 삭제됩니다.\n다시 초대받아도 기록은 복구되지 않습니다.`}</Text>
      <Button
        className="bg-red rounded-xl py-[14px] text-body1 mt-11"
        onPress={onExit}
      >
        <Text className="text-center text-white font-bold"> 탈퇴하기</Text>
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
