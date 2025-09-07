import EditGroupNotificationContent from '@/components/bottom-sheets/contents/EditGroupNotificationContent';
import EditMemberContent from '@/components/bottom-sheets/contents/EditMemberContent';
import GroupExitContent from '@/components/bottom-sheets/contents/GroupExitContent';
import GroupSettingContent from '@/components/bottom-sheets/contents/GroupSettingContent';
import SelectNewCrewContent from '@/components/bottom-sheets/contents/SelectNewCrewContent';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { Crew, MemberData } from '@/types/crew';
import BottomSheet from '@/components/bottom-sheets/BottomSheet';
import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { useCustomAlert } from '@/hooks/useCustomAlert';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import { Text } from 'react-native';
export default function BottomSheetContainer({
  crewInfo,
  crewMembers,
  isAdminUser,
  settingsBottomSheet,
  crewId,
  crewInfoFetchData
}: {
  crewInfo: Crew;
  crewMembers: { members: MemberData[] };
  isAdminUser: boolean;
  settingsBottomSheet: any;
  crewId: string;
  crewInfoFetchData: () => void;
}) {
  const [editMemberType, setEditMemberType] = useState<
    'editMember' | 'editOwner'
  >('editMember');

  const { showAlert, hideAlert } = useCustomAlert();
  const { showSuccess } = useToast();

  const groupExitBottomSheet = useBottomSheet({
    snapPoints: ['70%'],
    enableBackdropPress: true
  });

  const editMemberBottomSheet = useBottomSheet({
    snapPoints: ['65%'],
    enableBackdropPress: true
  });

  const editNoticeBottomSheet = useBottomSheet({
    snapPoints: ['70%'],
    enableBackdropPress: true
  });

  // 바텀시트 핸들러들
  const handleEditMemberPress = () => editMemberBottomSheet.present();
  const handleEditNoticePress = () => editNoticeBottomSheet.present();
  //그룹 나가기
  const onGroupExit = async () => {
    try {
      if (crewInfo) {
        const url = `${ENV.API_BASE_URL}/${API_END_POINT.CREWS.DELETE_CREW(
          crewInfo.crewId
        )}`;
        const ret = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `accessToken=${await AsyncStorage.getItem('accessToken')}`
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

  const onEditMember = (
    type: 'editMember' | 'editOwner',
    member: MemberData
  ) => {
    if (type === 'editMember') {
      showAlert({
        message: `${member.nickname}님을\n 크루에서 내보낼까요?`,
        buttons: [
          {
            text: '아니오',
            className: 'bg-gray70 py-4 rounded-md',
            textClassName: 'text-white text-headline1',
            onPress: () => {}
          },
          {
            text: '네, 내보낼게요',
            className: 'bg-red py-4 rounded-md',
            textClassName: 'text-white text-headline1',
            onPress: async () => {
              const { error: isError, fetchData: deleteMemberFetchData } =
                useFetch<string>(
                  API_END_POINT.CREWS.DELETE_CREW_MEMBER(
                    crewId,
                    member.memberId
                  ),
                  {
                    method: 'DELETE'
                  }
                );
              await deleteMemberFetchData();
              if (isError) {
                showSuccess('크루 나가기 실패');
              } else {
                showSuccess('크루 나가기 완료');
              }
              hideAlert();
            }
          }
        ]
      });
    } else {
      showAlert({
        message: `${member.nickname}님께\n 크루 리더를 위임할까요?`,
        buttons: [
          {
            text: '아니오',
            className: 'bg-gray70 py-4 rounded-md',
            textClassName: 'text-white text-headline1',
            onPress: () => {
              showSuccess('크루 리더가 [닉네임]으로 변경됐어요.');
            }
          },
          {
            text: '네, 위임할게요',
            className: 'bg-main py-4 rounded-md',
            textClassName: 'text-white text-headline1',
            onPress: hideAlert
          }
        ]
      });
    }
  };

  const onEditGroupInfo = (type: 'editMember' | 'editOwner') => {
    settingsBottomSheet.close();
    setEditMemberType(type);
    handleEditMemberPress();
  };

  const onEditNotice = () => {
    settingsBottomSheet.close();
    handleEditNoticePress();
  };
  return (
    <>
      <BottomSheet
        ref={settingsBottomSheet.bottomSheetRef}
        {...settingsBottomSheet.config}
      >
        <GroupSettingContent
          isAdminUser={isAdminUser}
          onClose={settingsBottomSheet.close}
          onExitPress={() => {
            if (crewMembers?.members.length === 1) {
              onGroupExit();
            } else {
              groupExitBottomSheet.present();
            }
          }}
          onEditMemberPress={() => onEditGroupInfo('editMember')}
          onEditGroupInfoPress={() => onEditGroupInfo('editOwner')}
          onEditNoticePress={onEditNotice}
        />
      </BottomSheet>
      <BottomSheet
        ref={groupExitBottomSheet.bottomSheetRef}
        {...groupExitBottomSheet.config}
      >
        {isAdminUser ? (
          <SelectNewCrewContent
            onClose={() => {
              groupExitBottomSheet.close();
              setEditMemberType('editOwner');
              editMemberBottomSheet.present();
            }}
          />
        ) : (
          <GroupExitContent
            crewInfo={crewInfo}
            isLastUser={crewMembers?.members.length === 1}
            onClose={groupExitBottomSheet.close}
          />
        )}
      </BottomSheet>
      {isAdminUser && (
        <>
          {/* 멤버 탈퇴 및 그룹장 위임 bottomSheet */}
          <BottomSheet
            ref={editMemberBottomSheet.bottomSheetRef}
            {...editMemberBottomSheet.config}
          >
            <EditMemberContent
              type={editMemberType}
              onClose={editMemberBottomSheet.close}
              crewMembers={crewMembers}
              onPress={(member: MemberData) =>
                onEditMember(editMemberType, member)
              }
            />
          </BottomSheet>
          {/* 공지 변경 bottomSheet */}
          <BottomSheet
            ref={editNoticeBottomSheet.bottomSheetRef}
            {...editNoticeBottomSheet.config}
          >
            <EditGroupNotificationContent
              crewId={crewId}
              prevNotice={crewInfo?.notice || ''}
              onClose={() => {
                crewInfoFetchData();
                editNoticeBottomSheet.close();
              }}
            />
          </BottomSheet>
        </>
      )}
    </>
  );
}
