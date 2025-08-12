import ProgressBar from '@/app/components/progressBar';
import { Ionicons } from '@expo/vector-icons';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
          <Ionicons name="megaphone" color={'black'} size={19} />
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
      <View>
        <Text style={styles.GroupGoalText}>최종 목표까지</Text>
        <Text style={[styles.GroupGoalText, { marginTop: 10 }]}>
          <Text style={styles.RemainingGoalText}>0.7KM</Text> 남았어요!
        </Text>
        <ProgressBar progress={80} style={{ marginTop: 32 }} />
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
      <GroupInfo />
      <GroupGoal />
      <MaterialTopTabs>
        <MaterialTopTabs.Screen name="index" options={{ title: '랭킹' }} />
        <MaterialTopTabs.Screen
          name="runningShare"
          options={{ title: '러닝 공유' }}
        />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  GroupInfoContainer: {
    paddingBlock: 16,
    paddingInline: 24
  },
  GroupInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold'
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
    backgroundColor: '#d3d3d3'
  },
  GroupGoalText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  RemainingGoalText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold'
  }
});
