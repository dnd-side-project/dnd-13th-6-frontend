import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, withLayoutContext } from 'expo-router';
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '@/components/bottom-sheets/BottomSheet';
import EditGroupNotificationContent from '@/components/bottom-sheets/contents/EditGroupNotificationContent';
import EditMemberContent from '@/components/bottom-sheets/contents/EditMemberContent';
import GroupExitContent from '@/components/bottom-sheets/contents/GroupExitContent';
import GroupSettingContent from '@/components/bottom-sheets/contents/GroupSettingContent';
import SelectNewCrewContent from '@/components/bottom-sheets/contents/SelectNewCrewContent';
import Chip from '@/components/chips/Chip';
import ProgressBar from '@/components/ProgressBar';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import CustomAlert from '@/components/modal/CustomAlert';
import { useCustomAlert } from '@/hooks/useCustomAlert';
import { useToast } from '@/contexts/ToastContext';
import useFetch from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/apis/api';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { Crew, MemberData } from '@/types/crew';

export const CrewContext = createContext<{
  crewInfo: Crew | null;
  crewMembers: { members: MemberData[] } | null;
}>({
  crewInfo: null,
  crewMembers: null
});

const GroupInfo = ({ crewInfo }: { crewInfo: Crew }) => {
  return (
    <View>
      <View>
        <Text style={styles.GroupInfoTitle}>{crewInfo.name}</Text>
        <View style={styles.GroupNotificationContainer}>
          <Ionicons name="megaphone-outline" color={'white'} size={19} />
          <Text
            className="text-gray40 font-semibold"
            style={styles.GroupNotificationText}
          >
            {crewInfo.notice ? crewInfo.notice : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

const GroupGoal = ({ crewInfo }: { crewInfo: Crew }) => {
  return (
    <View style={styles.GroupGoalContainer}>
      <Chip
        style={{
          backgroundColor: '#000',
          paddingHorizontal: 8.5,
          paddingVertical: 3.5,
          alignSelf: 'flex-start'
        }}
      >
        <Text className="text-main text-body3 text-center">
          시작한지 + 12일째
        </Text>
      </Chip>
      <View>
        <Text style={styles.GroupGoalText}>최종 목표까지</Text>
        <Text style={[styles.GroupGoalText, { marginTop: 5 }]}>
          <Text style={styles.RemainingGoalText}>0.7KM</Text> 남았어요!
        </Text>
      </View>
      <ProgressBar progress={40} />
    </View>
  );
};

const MaterialTopTabsScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarStyle: {
    backgroundColor: '#313131',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  tabBarLabelStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'none' // 이 옵션을 추가하여 title이 그대로 표시되도록 함
  },
  tabBarActiveTintColor: '#fff',
  tabBarInactiveTintColor: '#999', // 비활성 탭 색상 추가
  tabBarIndicatorStyle: {
    backgroundColor: '#E5E5EA',
    height: 4,
    width: '45%',
    marginHorizontal: 12
  },
  tabBarShowLabel: true
};

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  const insets = useSafeAreaInsets();
  const [editMemberType, setEditMemberType] = useState<
    'editMember' | 'editOwner'
  >('editMember');
  const { id: crewId } = useLocalSearchParams();
  const isCrewLeader = true;
  // CustomAlert 훅
  const { alertConfig, visible, showAlert, hideAlert } = useCustomAlert();

  // 각각 개별적으로 바텀시트 훅 호출 배경 블러처리
  const settingsBottomSheet = useBottomSheet({
    snapPoints: ['70%'],
    enableBackdropPress: true,
    enablePanDownToClose: true
  });

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
  const handleSettingsPress = () => settingsBottomSheet.present();
  const handleProgressPress = () => groupExitBottomSheet.present();
  const handleEditMemberPress = () => editMemberBottomSheet.present();
  const handleEditNoticePress = () => editNoticeBottomSheet.present();
  const { showSuccess } = useToast();
  const [isAdminUser, setIsAdminUser] = useState(false);
  //그룹 나가기
  const onGroupExit = () => {
    settingsBottomSheet.close();
    handleProgressPress();
  };

  const {
    data: crewInfo,
    error: creInfoError,
    fetchData: crewInfoFetchData
  } = useFetch<Crew>(API_END_POINT.CREWS.GET_CREW_DETAIL(crewId as string), {
    method: 'GET'
  });
  const {
    data: crewMembers,
    error: crewMembersError,
    fetchData: crewMembersFetchData
  } = useFetch<{ members: MemberData[] }>(
    API_END_POINT.CREWS.GET_CREW_MEMBERS(crewId as string),
    {
      method: 'GET'
    }
  );

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
                    crewId as string,
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

  useLayoutEffect(() => {
    const init = async () => {
      await Promise.all([crewInfoFetchData(), crewMembersFetchData()]).then(
        ([creInfo]) => {
          setIsAdminUser(creInfo?.leaderNickname === 'leader');
        }
      );
      // setCrewInfo(creInfo);
      // setCrewMembers(crewMembers);
    };
    init();
  }, []);

  const contextValue = {
    crewInfo,
    crewMembers
  };

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      className="flex-1 bg-black"
    >
      <View className="flex-row justify-between px-4 py-[10px]">
        <Pressable onPress={() => router.push('/(tabs)/(home)')}>
          <Ionicons name="arrow-back-outline" color={'white'} size={24} />
        </Pressable>
        <Text className="text-white text-lg font-semibold">크루</Text>
        <Pressable onPress={handleSettingsPress}>
          <Ionicons name="settings-outline" color={'white'} size={24} />
        </Pressable>
      </View>
      <View
        style={{
          paddingInline: 17,
          paddingTop: 22,
          paddingBottom: 26,
          backgroundColor: '#000'
        }}
        className="flex-grow-0"
      >
        {crewInfo && (
          <>
            <GroupInfo crewInfo={crewInfo} />
            <GroupGoal crewInfo={crewInfo} />
          </>
        )}
      </View>
      <CrewContext.Provider value={contextValue}>
        <MaterialTopTabs screenOptions={MaterialTopTabsScreenOptions}>
          <MaterialTopTabs.Screen name="index" options={{ title: '랭킹' }} />
          <MaterialTopTabs.Screen
            name="runningShare"
            options={{ title: '러닝 공유' }}
          />
        </MaterialTopTabs>
      </CrewContext.Provider>
      <View
        style={{
          backgroundColor: '#313131',
          paddingBottom: 21,
          paddingHorizontal: 18
        }}
      >
        <Pressable
          style={styles.startButton}
          onPress={() => router.push('/(tabs)/(single-running)')}
        >
          <Text style={styles.startButtonText}>운동 시작하기</Text>
        </Pressable>
      </View>
      {/* 설정 BottomSheet */}
      <BottomSheet
        ref={settingsBottomSheet.bottomSheetRef}
        {...settingsBottomSheet.config}
      >
        <GroupSettingContent
          isAdminUser={isAdminUser}
          onClose={settingsBottomSheet.close}
          onExitPress={onGroupExit}
          onEditMemberPress={() => onEditGroupInfo('editMember')}
          onEditGroupInfoPress={() => onEditGroupInfo('editOwner')}
          onEditNoticePress={onEditNotice}
        />
      </BottomSheet>
      <BottomSheet
        ref={groupExitBottomSheet.bottomSheetRef}
        {...groupExitBottomSheet.config}
      >
        {isCrewLeader ? (
          <SelectNewCrewContent onClose={groupExitBottomSheet.close} />
        ) : (
          <GroupExitContent onClose={groupExitBottomSheet.close} />
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
              crewId={crewId as string}
              prevNotice={crewInfo?.notice || ''}
              onClose={() => {
                crewInfoFetchData();
                editNoticeBottomSheet.close();
              }}
            />
          </BottomSheet>
        </>
      )}
      <CustomAlert
        visible={visible}
        title={alertConfig?.title}
        message={alertConfig?.message || ''}
        buttons={alertConfig?.buttons}
        onClose={hideAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  GroupInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  GroupNotificationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    backgroundColor: '#313131',
    paddingBlock: 8,
    paddingInline: 12,
    borderRadius: 10
  },
  GroupNotificationText: {
    borderRadius: 10,
    flexGrow: 1
  },
  GroupGoalContainer: {
    padding: 18,
    backgroundColor: '#313131',
    borderRadius: 12,
    marginTop: 17,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 14
  },
  GroupGoalText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff'
  },
  RemainingGoalText: {
    color: '#32FF76',
    fontSize: 28,
    fontWeight: 'bold'
  },

  startButton: {
    backgroundColor: '#31FF76',
    textAlign: 'center',
    paddingVertical: 18,
    borderRadius: 12
  },
  startButtonText: {
    color: '#313131',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});
