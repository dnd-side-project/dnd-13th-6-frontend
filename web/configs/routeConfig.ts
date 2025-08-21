// src/configs/routeConfig.ts
export interface RouteConfig {
  showHeader: boolean;
  backHref?: string;
  title?: string;
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
  '/main': { showHeader: true }
};
