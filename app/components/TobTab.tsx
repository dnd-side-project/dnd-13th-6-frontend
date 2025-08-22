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

export function TobTab({
  items,
  className = ''
}: {
  items: {
    name: string;
    options: MaterialTopTabNavigationOptions;
  }[];
  className?: string;
}) {
  return (
    <MaterialTopTabs
      className={`bg-gray px-6 ${className} `}
      screenOptions={MaterialTopTabsScreenOptions}
    >
      {items.map(item => (
        <MaterialTopTabs.Screen
          key={item.name}
          name={item.name}
          options={item.options}
        />
      ))}
    </MaterialTopTabs>
  );
}
