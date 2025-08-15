import { Ionicons } from '@expo/vector-icons';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '../../../components/bottom-sheets/BottomSheet';
import GroupSettingContent from '../../../components/bottom-sheets/contents/GroupSettingContent';
import Chip from '../../../components/chips/Chip';
import ProgressBar from '../../../components/ProgressBar';
import { useBottomSheet } from '../../../hooks/useBottomSheet';
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const GroupInfo = ({ onSettingsPress }: { onSettingsPress: () => void }) => {
  return (
    <View style={styles.GroupInfoContainer}>
      <View>
        <Text style={styles.GroupInfoTitle}>방 제목 최대 몇 글자까지</Text>
        <View style={styles.GroupNotificationContainer}>
          <Ionicons name="megaphone-outline" color={'white'} size={19} />
          <Text style={styles.GroupNotificationText}>
            매일매일 열심히 하자 (공지 및 방 설명)
          </Text>
          <Pressable onPress={onSettingsPress}>
            <Ionicons name="settings-outline" color={'white'} size={19} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const GroupGoal = ({ onProgressPress }: { onProgressPress: () => void }) => {
  return (
    <View style={styles.GroupGoalContainer}>
      <Chip
        style={{
          backgroundColor: '#000',
          marginBottom: 12,
          paddingHorizontal: 8.5,
          paddingVertical: 3.5,
          width: 115
        }}
      >
        <Text style={{ color: '#32FF76', fontSize: 13, textAlign: 'center' }}>
          시작한지 + 12일째
        </Text>
      </Chip>
      <View>
        <Text style={styles.GroupGoalText}>최종 목표까지</Text>
        <Text style={[styles.GroupGoalText, { marginTop: 10 }]}>
          <Text style={styles.RemainingGoalText}>0.7KM</Text> 남았어요!
        </Text>
        <Pressable onPress={onProgressPress}>
          <View>
            <ProgressBar progress={40} style={{ marginTop: 8 }} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default function Layout() {
  const insets = useSafeAreaInsets();

  // 각각 개별적으로 바텀시트 훅 호출 배경 블러처리
  const settingsBottomSheet = useBottomSheet({
    snapPoints: ['50%'],
    enableBackdropPress: true,
    enablePanDownToClose: true
  });

  const progressBottomSheet = useBottomSheet({
    snapPoints: ['60%', '80%'],
    enableBackdropPress: true
  });

  const startRunningBottomSheet = useBottomSheet({
    snapPoints: ['40%', '60%'],
    enableBackdropPress: true
  });

  // 바텀시트 핸들러들
  const handleSettingsPress = () => settingsBottomSheet.present();
  const handleProgressPress = () => progressBottomSheet.present();
  const handleStartRunningPress = () => startRunningBottomSheet.present();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={{ paddingInline: 17, paddingTop: 38 }}>
        <GroupInfo onSettingsPress={handleSettingsPress} />
        <GroupGoal onProgressPress={handleProgressPress} />
      </View>

      <MaterialTopTabs
        style={styles.topTabsContainer}
        screenOptions={{
          tabBarStyle: { backgroundColor: '#313131' },
          tabBarLabelStyle: { fontSize: 20, fontWeight: 'bold' },
          tabBarActiveTintColor: '#fff',
          tabBarIndicatorStyle: {
            backgroundColor: '#E5E5EA',
            borderRadius: 12,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            height: 4
          }
        }}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: '랭킹' }} />
        <MaterialTopTabs.Screen
          name="runningShare"
          options={{ title: '러닝 공유' }}
        />
      </MaterialTopTabs>

      <View style={{ backgroundColor: '#313131' }}>
        <Pressable style={styles.startButton} onPress={handleStartRunningPress}>
          <Text style={styles.startButtonText}>운동 시작하기</Text>
        </Pressable>
      </View>

      {/* BottomSheets */}

      {/* 설정 BottomSheet */}
      <BottomSheet
        ref={settingsBottomSheet.bottomSheetRef}
        {...settingsBottomSheet.config}
      >
        <GroupSettingContent />
      </BottomSheet>

      {/* 진행률 상세 BottomSheet */}
      <BottomSheet
        ref={progressBottomSheet.bottomSheetRef}
        {...progressBottomSheet.config}
      >
        <View style={{ gap: 15 }}>
          <View style={styles.progressDetailItem}>
            <Text style={styles.progressDetailLabel}>현재 진행률</Text>
            <Text style={styles.progressDetailValue}>40%</Text>
          </View>
          <View style={styles.progressDetailItem}>
            <Text style={styles.progressDetailLabel}>달성한 거리</Text>
            <Text style={styles.progressDetailValue}>2.3 KM</Text>
          </View>
          <View style={styles.progressDetailItem}>
            <Text style={styles.progressDetailLabel}>남은 거리</Text>
            <Text style={styles.progressDetailValue}>0.7 KM</Text>
          </View>
          <View style={styles.progressDetailItem}>
            <Text style={styles.progressDetailLabel}>예상 완료일</Text>
            <Text style={styles.progressDetailValue}>3일 후</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <ProgressBar progress={40} />
          </View>
        </View>
      </BottomSheet>

      {/* 운동 시작 BottomSheet */}
      <BottomSheet
        ref={startRunningBottomSheet.bottomSheetRef}
        {...startRunningBottomSheet.config}
      >
        <View style={{ gap: 20 }}>
          <Pressable style={styles.runningOption}>
            <Ionicons name="person-outline" size={24} color="#fff" />
            <Text style={styles.runningOptionText}>개인 러닝</Text>
          </Pressable>
          <Pressable style={styles.runningOption}>
            <Ionicons name="people-outline" size={24} color="#fff" />
            <Text style={styles.runningOptionText}>그룹 러닝</Text>
          </Pressable>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.runningNote}>
              * 그룹 러닝은 다른 멤버들과 함께 실시간으로 운동할 수 있습니다.
            </Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  GroupInfoContainer: {},
  GroupInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  GroupNotificationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 20
  },
  GroupNotificationText: {
    backgroundColor: '#E5E5E7',
    paddingBlock: 8,
    paddingInline: 20,
    borderRadius: 10,
    flexGrow: 1
  },
  GroupGoalContainer: {
    paddingInline: 17,
    paddingTop: 22,
    paddingBottom: 53,
    backgroundColor: '#313131',
    borderRadius: 12,
    marginTop: 17
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
  topTabsContainer: {
    marginTop: 24,
    backgroundColor: '#313131'
  },
  startButton: {
    backgroundColor: '#31FF76',
    textAlign: 'center',
    marginInline: 18,
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 26,
    marginBottom: 35
  },
  startButtonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  // BottomSheet 관련 스타일들
  bottomSheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#404040'
  },
  bottomSheetItemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  progressDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#404040',
    borderRadius: 8
  },
  progressDetailLabel: {
    color: '#ccc',
    fontSize: 14
  },
  progressDetailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  runningOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#404040',
    borderRadius: 8
  },
  runningOptionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  runningNote: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16
  }
});
