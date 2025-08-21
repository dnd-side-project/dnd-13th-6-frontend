import Button from '@/components/Button';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface EditGroupNotificationContentProps {
  onClose: () => void;
}

function EditGroupNotificationContent({
  onClose
}: EditGroupNotificationContentProps) {
  const [notice, setNotice] = useState('');

  const onSave = () => {
    console.log('onSave');
  };
  return (
    <View className="flex gap-4">
      <Text className="text-white text-title3">공지사항 변경하기</Text>
      <TextInput
        className="bg-black rounded-xl p-4 text-body1 h-32 placeholder:text-gray40"
        placeholder="최대 15글자까지 변경가능해요"
        maxLength={15}
        value={notice}
        onChangeText={setNotice}
        multiline={true}
      />
      <Button
        onPress={onSave}
        className="bg-main rounded-xl py-[14px] text-body1"
      >
        <Text className="text-center text-headline1 text-black"> 변경하기</Text>
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
