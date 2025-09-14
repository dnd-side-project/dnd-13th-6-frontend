import EditGroupNotificationContent from '@/components/bottom-sheets/contents/EditGroupNotificationContent';
import EditMemberContent from '@/components/bottom-sheets/contents/EditMemberContent';
import GroupSettingContent from '@/components/bottom-sheets/contents/GroupSettingContent';
import SelectNewCrewContent from '@/components/bottom-sheets/contents/SelectNewCrewContent';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { Crew, MemberData } from '@/types/crew';
import BottomSheet from '@/components/bottom-sheets/BottomSheet';
import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { AlertConfig, useCustomAlert } from '@/hooks/useCustomAlert';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/apis/api';
import { ENV } from '@/utils/app/consts';
import { CrewApi } from '@/utils/apis/crewApi';
export default function BottomSheetContainer({
  crewInfo,
  crewMembers,
  isAdminUser,
  settingsBottomSheet,
  crewId,
  showAlert,
  hideAlert,
  crewInfoFetchData
}: {
  crewInfo: Crew;
  crewMembers: { members: MemberData[] };
  isAdminUser: boolean;
  settingsBottomSheet: any;
  crewId: string;
  showAlert: (config: AlertConfig) => void;
  hideAlert: () => void;
  crewInfoFetchData: () => void;
}) {
  const [editMemberType, setEditMemberType] = useState<
    'editMember' | 'editOwner'
  >('editMember');

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
            Cookie: `accessToken=${await AsyncStorage.getItem('accessToken')}`,
            Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`
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
    settingsBottomSheet.close();
    if (type === 'editMember') {
      editMemberBottomSheet.close();
      showAlert({
        message: `${member.nickname}님을\n 크루에서 내보낼까요?`,
        buttons: [
          {
            text: '아니오',
            className: 'bg-gray70 py-4 rounded-md',
            textClassName: 'text-white text-headline1',
            onPress: () => {
              hideAlert();
              editMemberBottomSheet.close();
              settingsBottomSheet.close();
            }
          },
          {
            text: '네, 내보낼게요',
            className: 'bg-red py-4 rounded-md',
            textClassName: 'text-white text-headline1',
            onPress: async () => {
              try {
                const response = await CrewApi.deleteCrewMember(
                  crewId,
                  member.memberId
                );
                if (response.ok) {
                  showSuccess(`${member.nickname}님을 크루에서 내보냈어요.`);
                } else {
                  showSuccess(
                    `${member.nickname}님을 크루에서 내보내는데 실패했어요.`
                  );
                }
                hideAlert();
              } catch (error) {
                console.log('error', error);
              } finally {
                editMemberBottomSheet.close();
              }
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
              showSuccess(`크루 리더가 [${member.nickname}]으로 변경됐어요.`);
              hideAlert();
              editMemberBottomSheet.close();
              settingsBottomSheet.close();
            }
          },
          {
            text: '네, 위임할게요',
            className: 'bg-main py-4 rounded-md',
            textClassName: 'text-white text-headline1',
            onPress: () => {
              hideAlert();
              editMemberBottomSheet.close();
              settingsBottomSheet.close();
            }
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
      {/* 그룹 설정 bottomSheet */}
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
              editMemberBottomSheet.present();
            }}
            onConfirm={() => {
              groupExitBottomSheet.close();
              setEditMemberType('editOwner');
              editMemberBottomSheet.present();
            }}
          />
        ) : (
          <SelectNewCrewContent
            onClose={() => {
              groupExitBottomSheet.close();
              editMemberBottomSheet.present();
            }}
            onConfirm={() => {
              groupExitBottomSheet.close();
              setEditMemberType('editOwner');
              editMemberBottomSheet.present();
            }}
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
              crewInfo={crewInfo}
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
