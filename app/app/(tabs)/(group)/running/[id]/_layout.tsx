import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, withLayoutContext } from 'expo-router';
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
import { ENV } from '@/utils/app/consts';
import GroupCodeAlert from '@/components/modal/GroupCodeAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <Text className="text-white text-2xl font-bold">{crewInfo.name}</Text>
        <View className="flex flex-row items-center gap-[10px] mt-5 bg-gray70 rounded-lg px-3 py-2">
          <Ionicons name="megaphone-outline" color={'white'} size={19} />
          <Text className="text-gray40 font-semibold">
            {crewInfo.notice ? crewInfo.notice : '등록된 공지가 없습니다.'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const GroupGoal = ({ crewInfo }: { crewInfo: Crew }) => {
  return (
    <View className="p-[18px] bg-gray rounded-xl mt-4 flex justify-between gap-4">
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
        <Text className="text-lg font-bold text-white">최종 목표까지</Text>
        <Text className="text-lg font-bold text-white mt-1">
          <Text className="text-main rounded-xl py-[18px]">
            {crewInfo.goal - crewInfo.runningDistance}KM
          </Text>{' '}
          남았어요!
        </Text>
      </View>
      <ProgressBar
        progress={
          isNaN(crewInfo.runningDistance / crewInfo.goal)
            ? 0
            : (crewInfo.runningDistance / crewInfo.goal) * 100
        }
      />
    </View>
  );
};

const MaterialTopTabsScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarStyle: {
    backgroundColor: '#313131',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  tabBarIndicatorContainerStyle: {
    minHeight: 1200
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
  // const [duration, setDuration] = useState<number>(0);
  // CustomAlert 훅
  const { alertConfig, visible, showAlert, hideAlert } = useCustomAlert();
  const [isGroupCodeAlertVisible, setIsGroupCodeAlertVisible] = useState(false);
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
  const handleEditMemberPress = () => editMemberBottomSheet.present();
  const handleEditNoticePress = () => editNoticeBottomSheet.present();
  const { showSuccess } = useToast();
  const [isAdminUser, setIsAdminUser] = useState(false);
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

  const { data: crewInfo, fetchData: crewInfoFetchData } = useFetch<Crew>(
    API_END_POINT.CREWS.GET_CREW_DETAIL(crewId as string),
    {
      method: 'GET'
    }
  );

  const { data: crewMembers, fetchData: crewMembersFetchData } = useFetch<{
    members: MemberData[];
  }>(API_END_POINT.CREWS.GET_CREW_MEMBERS(crewId as string), {
    method: 'GET'
  });

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
        ([crewInfo]) => {
          setIsAdminUser(crewInfo?.isLeader || true);
        }
      );
    };
    init();
  }, []);

  useEffect(() => {
    return () => {
      console.log('cleanup');
    };
  }, []);

  const contextValue = {
    crewInfo,
    crewMembers
  };

  return (
    <View style={[{ paddingTop: insets.top }]} className="flex-1 bg-black">
      <View className="flex-row px-4 py-[10px] items-center gap-5">
        <Pressable
          onPress={() => {
            router.replace('/(tabs)/(group)');
          }}
        >
          <Ionicons name="arrow-back-outline" color={'white'} size={24} />
        </Pressable>
        <Pressable className="">
          <Image className="w-6 h-6" />
        </Pressable>
        <Text className="text-white text-lg font-semibold flex-grow text-center">
          크루123123
        </Text>
        <Pressable
          className="ml-auto"
          onPress={() => {
            setIsGroupCodeAlertVisible(true);
          }}
        >
          <Image
            source={require('@/assets/images/UserPlus.png')}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>
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
      <View className="bg-gray py-[18px] px-[14px]">
        <Pressable
          className="bg-main text-center py-[18px] rounded-xl"
          onPress={() => router.push('/(tabs)/(single-running)')}
        >
          <Text className="text-[20px] text-gray font-bold text-center">
            운동 시작하기
          </Text>
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
      <GroupCodeAlert
        visible={isGroupCodeAlertVisible}
        onClose={() => setIsGroupCodeAlertVisible(false)}
        code={crewInfo?.code || ''}
      />
    </View>
  );
}
