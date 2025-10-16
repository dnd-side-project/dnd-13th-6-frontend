import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, withLayoutContext } from 'expo-router';
import { createContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  AppState,
  Image,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  // tabBarIndicatorContainerStyle 제거: 과도한 높이로 인해 스크롤/터치 이슈 유발
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
    width: '45%'
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
  const progress = useMemo(() => {
    if (Math.floor(crewInfo.goal) === 0) return 0;
    const result =
      Math.floor(crewInfo.runningDistance) / Math.floor(crewInfo.goal);
    return isNaN(result) || result === Infinity ? 0 : result * 100;
  }, [crewInfo.runningDistance, crewInfo.goal]);
  return (
    <View className="p-[18px] bg-gray rounded-xl mt-4 flex justify-between gap-4">
       <Text className="text-gray50 text-body3">
          시작한지 + 12일째
        </Text>
      {crewInfo.goal - crewInfo.runningDistance > 0 ? (
        <View>
          <Text className="text-headline1 text-white">최종 목표까지</Text>
          <Text className="text-headline1 text-white mt-1">
            <Text className="text-main rounded-xl py-[18px]">
              {Math.floor(crewInfo.goal - crewInfo.runningDistance)}
              KM
            </Text>{' '}
            남았어요!
          </Text>
        </View>
      ) : (
        <View>
          <Text className="text-headline text-white font-semibold rounded-xl py-[18px]">
            {progress === 0 ? '주간 목표를 설정해주세요.': '주간 목표를 달성했어요!'}
          </Text>
        </View>
      )}
      <ProgressBar progress={progress} width={330} />
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
  const insets = useSafeAreaInsets();;

  const { id: crewId } = useLocalSearchParams();
  if(!crewId) {
    router.push('/(tabs)/(group)')
  }
  // CustomAlert 훅
  const { alertConfig, visible, showAlert, hideAlert } = useCustomAlert();
  const [isGroupCodeAlertVisible, setIsGroupCodeAlertVisible] = useState(false);


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

  useEffect(() => {
    const init = async () => {
      await Promise.all([crewInfoFetchData(), crewMembersFetchData().then((res) => console.log(res))])
    }
    const checkReboot = async () => {
      const lastActiveTime = await AsyncStorage.getItem('lastActiveTime');
      const currentTime = Date.now()  

      if (lastActiveTime) {
        const timeDiff = currentTime - parseInt(lastActiveTime);
        // 비정상적으로 긴 시간 차이가 있다면 재부팅 가능성
        if (timeDiff > 10 * 1000) { // 10초 이상
          init();
        };

      } else init();
    }
    checkReboot();
  
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        console.log('update')
        checkReboot();
      }
    });
    AsyncStorage.setItem('lastActiveTime', Date.now().toString());
    return () => {
      AsyncStorage.removeItem('lastActiveTime')
      subscription.remove();
    }
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
      <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
    {/* 헤더 */}
    <View className="flex-row px-4 py-[10px] items-center gap-5 bg-black">
      <Pressable onPress={() => router.replace('/(tabs)/(group)')}>
        <Ionicons name="arrow-back-outline" color={'white'} size={24} />
      </Pressable>
      <Text className="text-white text-lg font-semibold flex-grow text-center">
        크루
      </Text>
      <Pressable
        className="ml-auto"
        onPress={() => setIsGroupCodeAlertVisible(true)}
      >
        <Ionicons name="person-add-outline" color={'white'} size={24} />
      </Pressable>
      <Pressable onPress={handleSettingsPress}>
        <Ionicons name="settings-outline" color={'white'} size={24} />
      </Pressable>
    </View>

    {/* 전체 스크롤 영역 */}
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    >
      {/* 상단 그룹 정보 */}
      {crewInfo && (
        <View className="px-[17px] pt-[22px] pb-[26px] bg-black">
          <GroupInfo crewInfo={crewInfo} />
          <GroupGoal crewInfo={crewInfo} />
        </View>
      )}

      {/* 탭 전체를 감싸는 고정 영역 */}
      <View
        style={{
          flex: 1,
          minHeight: 500, // 기본 높이 확보
          backgroundColor: '#313131',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <CrewContext.Provider value={contextValue}>
          <MaterialTopTabs
            screenOptions={{
              ...MaterialTopTabsScreenOptions,
              // 각 탭 스크린에서도 자체 스크롤 허용
              swipeEnabled: true,
              lazy: true,
            }}
          >
            <MaterialTopTabs.Screen
              name="index"
              options={{ title: '랭킹' }}
            />
            <MaterialTopTabs.Screen
              name="runningShare"
              options={{ title: '러닝 공유' }}
            />
          </MaterialTopTabs>
        </CrewContext.Provider>
      </View>
          {/* 하단 고정 버튼 */}
    <View className=" bg-[#313131] py-[18px] px-[14px]">
      <Pressable
        className="bg-main text-center py-[18px] rounded-xl"
        onPress={() => router.push('/(tabs)/(single-running)')}
      >
        <Text className="text-[20px] text-gray font-bold text-center">
          운동 시작하기
        </Text>
      </Pressable>
    </View>

    </ScrollView>


    {/* 모달 및 알림 */}
    {crewInfo && crewMembers && (
      <BottomSheetContainer
        crewInfo={crewInfo}
        crewMembers={crewMembers}
        isAdminUser={crewInfo.isLeader}
        settingsBottomSheet={settingsBottomSheet}
        crewId={crewId as string}
        crewInfoFetchData={crewInfoFetchData}
        showAlert={showAlert}
        hideAlert={hideAlert}
      />
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
