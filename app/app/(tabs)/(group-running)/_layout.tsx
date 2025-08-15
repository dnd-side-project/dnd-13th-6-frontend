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
import Chip from '../../../components/chips/Chip';
import ProgressBar from '../../../components/ProgressBar';
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const GroupInfo = () => {
  return (
    <View style={styles.GroupInfoContainer}>
      <View>
        <Text style={styles.GroupInfoTitle}>방 제목 최대 몇 글자까지</Text>
        <View style={styles.GroupNotificationContainer}>
          <Ionicons name="megaphone" color={'white'} size={19} />
          <Text style={styles.GroupNotificationText}>
            매일매일 열심히 하자 (공지 및 방 설명)
          </Text>
        </View>
      </View>
    </View>
  );
};

const GroupGoal = () => {
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
        <ProgressBar progress={80} style={{ marginTop: 8 }} />
      </View>
    </View>
  );
};

export default function Layout() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
    >
      <View style={{ paddingInline: 17, paddingTop: 38 }}>
        <GroupInfo />
        <GroupGoal />
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
        <Pressable style={styles.startButton}>
          <Text style={styles.startButtonText}>운동 시작하기</Text>
        </Pressable>
      </View>
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
    width: '100%',
    paddingInline: 17,
    paddingBlock: 30,
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
    marginTop: 26
  },
  startButtonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});
