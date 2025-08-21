import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

const MaterialTopTabsScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarStyle: {
    backgroundColor: '#313131',
    borderTopLeftRadius: 24, // Apply border-radius to the top-left corner
    borderTopRightRadius: 24
  },
  tabBarLabelStyle: { fontSize: 20, fontWeight: 'bold' },
  tabBarActiveTintColor: '#fff',
  tabBarIndicatorStyle: {
    backgroundColor: '#E5E5EA',
    height: 4,
    width: '45%',
    marginHorizontal: 12
  }
};

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export function TobTab({ children }: { children: React.ReactNode }) {
  return (
    <MaterialTopTabs
      className="bg-gray px-6"
      screenOptions={MaterialTopTabsScreenOptions}
    >
      {children}
    </MaterialTopTabs>
  );
}
