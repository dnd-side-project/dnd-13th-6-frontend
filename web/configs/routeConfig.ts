// src/configs/routeConfig.ts
export interface RouteConfig {
  showHeader: boolean;
  backHref?: string;
  title?: string;
  showSaveButton?: boolean;
}

export const routeConfigs: Record<string, RouteConfig> = {
  '/login': { showHeader: false },
  '/onboarding': {
    showHeader: true
  },
  '/onboarding/terms': {
    showHeader: true,
    backHref: '/login'
  },
  '/onboarding/setup-nickname': {
    showHeader: true,
    backHref: '/onboarding/terms'
  },
  '/onboarding/select-character': {
    showHeader: true,
    backHref: '/onboarding/setup-nickname'
  },
  '/onboarding/setup-target': {
    showHeader: true,
    backHref: '/onboarding/select-character'
  },
  '/onboarding/onboarding-finish': { showHeader: true },
  '/main': { showHeader: true },
  '/badge-collection': {
    showHeader: true,
    backHref: '/main',
    title: '프로필',
    showSaveButton: true
  },
  '/badge-collection/gacha': {
    showHeader: true,
    backHref: '/badge-collection'
  },
  '/badge-collection/gacha/result': {
    showHeader: true
  },
  '/notification': {
    showHeader: true,
    backHref: '/main',
    title: '알림'
  },
  '/lucky-stamp': { showHeader: true, backHref: '/main', title: '러닝종료' },
  '/crew-reward': {
    showHeader: true,
    backHref: '/main',
    title: '크루 주간 보상'
  },
  '/change-target-distance': {
    showHeader: true,
    backHref: '/main',
    title: '목표 수정',
    showSaveButton: true
  },
  '/last-run-result': {
    showHeader: true,
    backHref: '/main'
  }
};
