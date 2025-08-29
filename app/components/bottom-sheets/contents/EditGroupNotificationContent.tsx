import Button from '@/components/Button';
import useFetch from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface EditGroupNotificationContentProps {
  onClose: () => void;
  crewId: string;
  prevNotice: string;
}

function EditGroupNotificationContent({
  onClose,
  crewId,
  prevNotice
}: EditGroupNotificationContentProps) {
  const [notice, setNotice] = useState(prevNotice);

  const onSave = async () => {
    try {
      const url = `${ENV.API_BASE_URL}/${API_END_POINT.CREWS.UPDATE_CREW_NOTICE(
        crewId as string
      )}`;
      const token = await AsyncStorage.getItem('accessToken');
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `accessToken=${token}`
        },
        body: JSON.stringify({ notice })
      });
      console.log(res, 'res');
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex gap-4">
      <Text className="text-white text-title3">공지사항 변경하기</Text>
      <TextInput
        className="bg-black rounded-xl p-4 text-body1 h-32 placeholder:text-gray40 text-white"
        placeholder="최대 15글자까지 변경가능해요"
        maxLength={15}
        value={notice}
        onChangeText={setNotice}
        multiline={true}
      />
      <Button
        onPress={onSave}
        disabled={notice.trim() === '' || notice.length > 15}
        className="bg-main rounded-xl py-[14px] text-body1 disabled:opacity-50"
      >
        <Text className="text-center text-headline1 text-black">변경하기</Text>
      </Button>
      <Button
        onPress={onClose}
        className="bg-gray rounded-md py-[14px] font-body1"
      >
        <Text className="text-white text-headline1 text-center">닫기</Text>
      </Button>
    </View>
  );
}

export default EditGroupNotificationContent;
