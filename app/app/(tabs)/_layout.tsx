import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useSegments } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';

const hideTabBarScreens = ['(single-running)', '(group-running)'];

export default function TabLayout() {
  const segments = useSegments(); // usePathname 대신 useSegments 사용

  // segments에서 현재 탭 정보 추출
  const currentTab = segments[1] || ''; // (tabs) 다음 세그먼트가 현재 탭
  const fullPath = `/${segments.join('/')}`;

  const isHideTabBar = hideTabBarScreens.some(screen =>
    currentTab.includes(screen.replace(/[()]/g, ''))
  );
  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: isHideTabBar ? 'none' : 'flex'
        },
        tabBarActiveTintColor: '#31FF76'
        // tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
          tabBarLabelStyle: {
            color: '#31FF76'
          }
        }}
      />
      <Tabs.Screen
        name="(group)"
        options={{
          title: '그룹',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
          tabBarLabelStyle: {
            color: '#31FF76'
          }
        }}
      />
      <Tabs.Screen
        name="(my-info)"
        options={{
          title: '내정보',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="calendar" color={color} />
          ),
          tabBarLabelStyle: {
            color: '#31FF76'
          }
        }}
      />
      <Tabs.Screen
        name="(single-running)"
        options={{
          href: null // 탭바에는 표시 안 함
        }}
      />
    </Tabs>
  );
}
