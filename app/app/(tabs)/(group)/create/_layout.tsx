import { Slot, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function CalendarLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' }
    });

    return () => {
      // cleanup: 탭바를 다시 보이게 함
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'flex' }
      });
    };
  }, [navigation]);
  return <Slot />;
}
