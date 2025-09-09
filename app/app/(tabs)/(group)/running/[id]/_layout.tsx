import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, withLayoutContext } from 'expo-router';
import { createContext, useLayoutEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Chip from '@/components/chips/Chip';
import ProgressBar from '@/components/ProgressBar';
import CustomAlert from '@/components/modal/CustomAlert';
import { useCustomAlert } from '@/hooks/useCustomAlert';
import useFetch from '@/hooks/useFetch';
import { API_END_POINT } from '@/utils/apis/api';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { Crew, MemberData } from '@/types/crew';
import BottomSheetContainer from '@/components/containers/running/BottomSheetContainer';
import GroupCodeAlert from '@/components/modal/GroupCodeAlert';
import { useBottomSheet } from '@/hooks/useBottomSheet';

const { Navigator } = createMaterialTopTabNavigator();

export const CrewContext = createContext<{
  crewInfo: Crew | null;
  crewMembers: { members: MemberData[] } | null;
}>({
  crewInfo: null,
  crewMembers: null
});

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
      <Chip className="bg-black px-[8px] py-[3px] self-start">
        <Text className="text-main text-body3 text-center">
          시작한지 + 12일째
        </Text>
      </Chip>
      <View>
        <Text className="text-headline1 text-white">최종 목표까지</Text>
        <Text className="text-headline1 text-white mt-1">
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

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  const insets = useSafeAreaInsets();

  const { id: crewId } = useLocalSearchParams();
  // CustomAlert 훅
  const { alertConfig, visible, showAlert, hideAlert } = useCustomAlert();
  const [isGroupCodeAlertVisible, setIsGroupCodeAlertVisible] = useState(false);

  const [isAdminUser, setIsAdminUser] = useState(false);

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

  const contextValue = {
    crewInfo,
    crewMembers
  };

  const settingsBottomSheet = useBottomSheet({
    snapPoints: ['70%'],
    enableBackdropPress: true,
    enablePanDownToClose: true
  });

  const handleSettingsPress = () => {
    settingsBottomSheet.present();
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
          크루
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
      <View className="px-[17px] pt-[22px] pb-[26px] bg-black">
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
      <BottomSheetContainer
        crewInfo={
          crewInfo || {
            crewId: 0,
            name: '',
            leaderNickname: '',
            notice: '',
            code: '',
            createdAt: '',
            memberCount: 0,
            goal: 0,
            runningDistance: 0,
            isLeader: false
          }
        }
        crewMembers={crewMembers || { members: [] }}
        isAdminUser={isAdminUser}
        settingsBottomSheet={settingsBottomSheet}
        crewId={crewId as string}
        crewInfoFetchData={crewInfoFetchData}
      />
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
