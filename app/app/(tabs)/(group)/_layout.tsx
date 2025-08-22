import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
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
import { TobTab } from '@/components/TobTab';
import CustomAlert from '@/components/modal/CustomAlert';
import { useCustomAlert } from '@/hooks/useCustomAlert';
import { useToast } from '@/contexts/ToastContext';

const GroupInfo = () => {
  return (
    <View>
      <View>
        <Text style={styles.GroupInfoTitle}>방 제목 최대 몇 글자까지</Text>
        <View style={styles.GroupNotificationContainer}>
          <Ionicons name="megaphone-outline" color={'white'} size={19} />
          <Text
            className="text-gray40 font-semibold"
            style={styles.GroupNotificationText}
          >
            매일매일 열심히 하자 (공지 및 방 설명)
          </Text>
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
        <Text style={[styles.GroupGoalText, { marginTop: 5 }]}>
          <Text style={styles.RemainingGoalText}>0.7KM</Text> 남았어요!
        </Text>
      </View>
      <ProgressBar progress={40} />
    </View>
  );
};

const MaterialTobTabItems = [
  {
    name: 'index',
    options: {
      title: '랭킹'
    }
  },
  {
    name: 'runningShare',
    options: {
      title: '러닝 공유'
    }
  }
];

export default function Layout() {
  const insets = useSafeAreaInsets();
  const [editMemberType, setEditMemberType] = useState<
    'editMember' | 'editOwner'
  >('editMember');

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
  const handleGroupInfoPress = () => editMemberBottomSheet.present();
  const { showSuccess } = useToast();
  const isAdminUser = true;

  //그룹 나가기
  const onGroupExit = () => {
    settingsBottomSheet.close();
    handleProgressPress();
  };

  const onEditMember = (type: 'editMember' | 'editOwner', memberId: string) => {
    if (type === 'editMember') {
      showAlert({
        message: `${memberId}님을\n 크루에서 내보낼까요?`,
        buttons: [
          {
            text: '아니오',
            className: 'bg-gray70 py-4 rounded-md',
            textClassName: 'text-white text-headline1',
            onPress: () => {
              showSuccess('크루 나가기 완료');
            }
          },
          {
            text: '네, 내보낼게요',
            className: 'bg-red py-4 rounded-md',
            textClassName: 'text-white text-headline1',
            onPress: hideAlert
          }
        ]
      });
    } else {
      showAlert({
        message: `${memberId}님께\n 크루 리더를 위임할까요?`,
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
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: '#000' }
      ]}
      className="flex-1"
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
        <GroupInfo />
        <GroupGoal onProgressPress={handleProgressPress} />
      </View>

      <TobTab items={MaterialTobTabItems} />

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
              onPress={() => onEditMember(editMemberType, '1')}
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
  runningOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#404040',
    borderRadius: 8
  }
});
