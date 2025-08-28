import Checkbox from '@/components/Checkbox';
import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import Button from '@/components/Button';
import { MemberData } from '@/types/crew';
interface EditMemberContentProps {
  type: 'editMember' | 'editOwner';
  onClose: () => void;
  onPress: (member: MemberData) => void | Promise<void>;
  crewMembers: { members: MemberData[] } | null;
}

export function MemberSelectContainer({
  selectedMember,
  setSelectMember,
  crewMembers
}: {
  selectedMember: MemberData | null;
  setSelectMember: (member: MemberData) => void;
  crewMembers: { members: MemberData[] };
}) {
  const renderItem = (item: MemberData) => {
    return (
      <View
        key={item.memberId}
        className="flex flex-row items-center justify-left gap-2 py-4"
      >
        <Checkbox
          checked={item.memberId === selectedMember?.memberId}
          onPress={() => setSelectMember(item)}
        />
        <Text className="text-gray20 text-headline1">{item.nickname}</Text>
      </View>
    );
  };

  return (
    <View className="bg-black rounded-2xl mt-4 px-4 py-[14px]">
      {crewMembers.members.map(renderItem)}
    </View>
  );
}

export default function EditMemberContent({
  type,
  onClose,
  onPress,
  crewMembers
}: EditMemberContentProps) {
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);

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
      {crewMembers && (
        <MemberSelectContainer
          selectedMember={selectedMember}
          setSelectMember={setSelectedMember}
          crewMembers={crewMembers}
        />
      )}
      <Button
        className={`${
          isEdit ? 'bg-red' : 'bg-main'
        } rounded-xl py-[14px] text-body1 mt-6`}
        onPress={() => {
          if (selectedMember) {
            onPress(selectedMember);
          }
        }}
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
