import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useSegments } from 'expo-router';
import React from 'react';

const hideTabBarScreens = ['(single-running)'];

export default function TabLayout() {
  const segments = useSegments(); // usePathname 대신 useSegments 사용

  // segments에서 현재 탭 정보 추출
  const currentTab = segments[1] || ''; // (tabs) 다음 세그먼트가 현재 탭

  const isHideTabBar = hideTabBarScreens.some(screen =>
    currentTab.includes(screen.replace(/[()]/g, ''))
  );
  //시작시 경로 home으로 설정
  return (
    <Tabs
      backBehavior="history"
      initialRouteName="(home)"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: isHideTabBar ? 'none' : 'flex'
        }
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="(group)"
        options={{
          title: '그룹',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="leaf" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="(my-info)"
        options={{
          title: '내정보',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="person-circle" color={color} />
          )
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
