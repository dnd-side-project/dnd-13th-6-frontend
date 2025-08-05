import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute'
          },
          default: {}
        })
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
        name="(calendar)"
        options={{
          title: '캘린더',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="calendar" color={color} />
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
    </Tabs>
  );
}
