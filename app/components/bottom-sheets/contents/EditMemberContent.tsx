import Checkbox from '@/components/Checkbox';
import Grid from '@/components/ui/Grid';
import { useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import Button from '../../../components/Button';
import { useCustomAlert } from '@/hooks/useCustomAlert';
interface EditMemberContentProps {
  type: 'editMember' | 'editOwner';
  onClose: () => void;
  onPress: () => void | Promise<void>;
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
      <View
        className="flex flex-row items-center justify-left gap-2 py-4"
        key={item.id}
      >
        <Checkbox
          checked={item.id === selectedMemberId}
          onPress={() => setSelectedMemberId(item.id)}
        />
        <Text className="text-gray20 text-headline1">{item.name}</Text>
      </View>
    );
  };

  return (
    <View className="bg-black rounded-2xl mt-4 px-4 py-[14px]">
      {data.map(renderItem)}
    </View>
  );
}

export default function EditMemberContent({
  type,
  onClose,
  onPress
}: EditMemberContentProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const isEdit = useMemo<boolean>(() => {
    return type === 'editMember';
  }, [type]);

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
            새 크루 리더를 지정해주세요.
          </Text>
          <Text className="font-medium mt-2 text-gray40">{`현재 리더는 [사후르]님입니다.\n새로운 리더를 지정해주세요.`}</Text>
        </>
      )}
      <MemberSelectContainer
        selectedMemberId={selectedMemberId}
        setSelectedMemberId={setSelectedMemberId}
      />
      <Button
        className={`${
          isEdit ? 'bg-red' : 'bg-main'
        } rounded-xl py-[14px] text-body1 mt-6`}
        onPress={onPress}
      >
        <Text
          className={`text-center text-headline1 ${
            isEdit ? 'text-white' : 'text-black'
          }`}
        >
          {isEdit ? '내보내기' : '위임하기'}
        </Text>
      </Button>
      <Button
        className="bg-gray rounded-md py-[14px] font-body1"
        onPress={onClose}
      >
        <Text className="text-white text-headline1 text-center">닫기</Text>
      </Button>
    </View>
  );
}
