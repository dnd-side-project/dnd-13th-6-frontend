import { AppState, AppStateStatus } from 'react-native';

const getAppState = (
  next: AppStateStatus
): 'background' | 'foreground' | 'inactive' => {
  const appStateRef = { current: AppState.currentState } as {
    current: string;
  };
  const wasActive = appStateRef.current === 'active';

  const goingBackground = /inactive|background/.test(next);
  const wasBackground = /inactive|background/.test(appStateRef.current);
  const goingActive = next === 'active';

  // 포그라운드 -> 백그라운드
  if (wasActive && goingBackground) {
    return 'background';
  }

  // 백그라운드 -> 포그라운드
  if (wasBackground && goingActive) {
    return 'foreground';
  }

  return 'inactive';
};

export { getAppState };
