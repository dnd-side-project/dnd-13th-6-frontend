import Checkbox from '@/components/Checkbox';
import Grid from '@/components/ui/Grid';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';
interface EditMemberContentProps {
  type: 'editMember' | 'editOwner';
  onClose: () => void;
}
const data = [
  {
    id: '1',
    name: '홍길동'
  },

  {
    id: '2',
    name: '홍길동'
  },

  {
    id: '3',
    name: '홍길동'
  },

  {
    id: '4',
    name: '홍길동'
  },

  {
    id: '5',
    name: '홍길동'
  }
];

export function MemberSelectContainer({
  selectedMemberId,
  setSelectedMemberId
}: {
  selectedMemberId: string | null;
  setSelectedMemberId: (memberId: string) => void;
}) {
  const renderItem = (item: any) => {
    return (
      <View className="flex flex-row gap-1">
        <Checkbox
          checked={item.id === selectedMemberId}
          onPress={() => setSelectedMemberId(item.id)}
        />
        <Text
          className={`${
            item.id === selectedMemberId ? 'text-red-500' : 'text-gray60'
          } text-[20px] font-medium`}
        >
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View className="bg-black rounded-2xl mt-[14px] px-9 pt-6">
      <Grid data={data} renderItem={renderItem} numColumns={2} spacing={19} />
    </View>
  );
}

export default function EditMemberContent({
  type,
  onClose
}: EditMemberContentProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const onConfirm = () => {
    console.log('onConfirm');
  };
  return (
    <View className="mb-4">
      {type === 'editMember' ? (
        <>
          <Text className="text-white text-title3">
            어떤 멤버를 탈퇴시킬까요?
          </Text>
          <Text className="font-medium mt-2 text-gray40">{`한번 삭제된 기록은 복구할 수 없으니\n신중하게 진행해주세요.`}</Text>
        </>
      ) : (
        <>
          <Text className="text-white text-title3">
            위임할 크루를 선택해주세요.
          </Text>
          <Text className="font-medium mt-2 text-gray40">{`현재 리더는 [사후르]님입니다.\n새로운 리더를 지정해주세요.`}</Text>
        </>
      )}
      <MemberSelectContainer
        selectedMemberId={selectedMemberId}
        setSelectedMemberId={setSelectedMemberId}
      />
      <Button
        className="bg-red-500 rounded-md py-[14px] text-body1 mt-6"
        onPress={onConfirm}
      >
        <Text className="text-center text-white">
          {type === 'editMember' ? '탈퇴하기' : '위임하기'}
        </Text>
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
const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 100,
    borderWidth: 1
  },
  unchecked: {
    backgroundColor: 'transparent',
    borderColor: '#8E8E93'
  },
  checked: {
    backgroundColor: '#31FF76', // 메인 컬러 배경 (검정 아이콘이 잘 보임)
    borderColor: '#31FF76'
  }
});
