import { Ionicons } from '@expo/vector-icons';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '../../../components/bottom-sheets/BottomSheet';
import EditGroupNotificationContent from '../../../components/bottom-sheets/contents/EditGroupNotificationContent';
import EditMemberContent from '../../../components/bottom-sheets/contents/EditMemberContent';
import GroupExitContent from '../../../components/bottom-sheets/contents/GroupExitContent';
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
          alignSelf: 'flex-start'
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
  const [editMemberType, setEditMemberType] = useState<
    'editMember' | 'editOwner'
  >('editMember');
  // 각각 개별적으로 바텀시트 훅 호출 배경 블러처리
  const settingsBottomSheet = useBottomSheet({
    snapPoints: ['50%'],
    enableBackdropPress: true,
    enablePanDownToClose: true
  });

  const groupExitBottomSheet = useBottomSheet({
    snapPoints: ['60%', '80%'],
    enableBackdropPress: true
  });

  const editMemberBottomSheet = useBottomSheet({
    snapPoints: ['60%'],
    enableBackdropPress: true
  });

  const editNoticeBottomSheet = useBottomSheet({
    snapPoints: ['60%'],
    enableBackdropPress: true
  });

  // 바텀시트 핸들러들
  const handleSettingsPress = () => settingsBottomSheet.present();
  const handleProgressPress = () => groupExitBottomSheet.present();
  const handleEditMemberPress = () => editMemberBottomSheet.present();
  const handleEditNoticePress = () => editNoticeBottomSheet.present();
  const isAdminUser = true;

  //그룹 나가기
  const onGroupExit = () => {
    settingsBottomSheet.close();
    handleProgressPress();
  };

  const onEditMember = (type: 'editMember' | 'editOwner') => {
    settingsBottomSheet.close();
    setEditMemberType(type);
    handleEditMemberPress();
  };

  const onEditNotice = () => {
    settingsBottomSheet.close();
    handleEditNoticePress();
  };

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
        <Pressable style={styles.startButton} onPress={handleEditMemberPress}>
          <Text style={styles.startButtonText}>운동 시작하기</Text>
        </Pressable>
      </View>

      {/* BottomSheets */}

      {/* 설정 BottomSheet */}
      <BottomSheet
        ref={settingsBottomSheet.bottomSheetRef}
        {...settingsBottomSheet.config}
      >
        <GroupSettingContent
          isAdminUser={isAdminUser}
          onExitPress={onGroupExit}
          onEditMemberPress={() => onEditMember('editMember')}
          onEditGroupInfoPress={() => onEditMember('editOwner')}
          onEditNoticePress={onEditNotice}
        />
      </BottomSheet>

      <BottomSheet
        ref={groupExitBottomSheet.bottomSheetRef}
        {...groupExitBottomSheet.config}
      >
        <GroupExitContent onClose={groupExitBottomSheet.close} />
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
            />
          </BottomSheet>
          {/* 공지 변경 bottomSheet */}
          <BottomSheet
            ref={editNoticeBottomSheet.bottomSheetRef}
            {...editNoticeBottomSheet.config}
          >
            <EditGroupNotificationContent
              onClose={editNoticeBottomSheet.close}
            />
          </BottomSheet>
        </>
      )}
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
    paddingHorizontal: 17,
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
