import { Slot, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function CalendarLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' }
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'flex' }
      });
    };
  }, [navigation]);
  return <Slot />;
}
