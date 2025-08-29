import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';

const hideTabBarScreens = ['(single-running)', '(group-running)'];

// WebView 초기화를 위한 Context
export const WebViewResetContext = createContext<{
  resetTrigger: number;
  triggerReset: () => void;
}>({
  resetTrigger: 0,
  triggerReset: () => {}
});

export const useWebViewReset = () => useContext(WebViewResetContext);

export default function TabLayout() {
  const segments = useSegments(); // usePathname 대신 useSegments 사용
  const [resetTrigger, setResetTrigger] = useState(0);
  const [previousTab, setPreviousTab] = useState<string>('');

  // segments에서 현재 탭 정보 추출
  const currentTab = segments[1] || ''; // (tabs) 다음 세그먼트가 현재 탭
  const fullPath = `/${segments.join('/')}`;

  const isHideTabBar = hideTabBarScreens.some(screen =>
    currentTab.includes(screen.replace(/[()]/g, ''))
  );

  // 탭 변경 감지 및 WebView 초기화 트리거
  useEffect(() => {
    if (previousTab && previousTab !== currentTab) {
      setResetTrigger(prev => prev + 1);
    }
    setPreviousTab(currentTab);
  }, [currentTab]);

  const triggerReset = () => {
    setResetTrigger(prev => prev + 1);
  };

  const contextValue = {
    resetTrigger,
    triggerReset
  };

  return (
    <WebViewResetContext.Provider value={contextValue}>
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
            )
          }}
        />
        <Tabs.Screen
          name="(group)"
          options={{
            title: '그룹',
            tabBarIcon: ({ color }) => (
              <Image
                tintColor={color}
                source={require('../../assets/images/UsersThree.png')}
                style={{ width: 28, height: 28 }}
              />
            )
          }}
        />
        <Tabs.Screen
          name="(calendar)"
          options={{
            title: '캘린더',
            tabBarIcon: ({ color }) => (
              <Image
                tintColor={color}
                source={require('../../assets/images/CalendarBlank.png')}
                style={{ width: 28, height: 28 }}
              />
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
    </WebViewResetContext.Provider>
  );
}
