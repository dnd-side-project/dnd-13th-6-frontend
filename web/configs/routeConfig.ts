// src/configs/routeConfig.ts
export interface RouteConfig {
  showHeader: boolean;
  backHref?: string;
  title?: string;
  showSaveButton?: boolean;
}

export const routeConfigs: Record<string, RouteConfig> = {
  //로그인 및 온보딩
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

  //설정
  '/settings': {
    showHeader: true,
    backHref: '/main',
    title: '설정'
  },
  '/settings/edit-nickname': {
    showHeader: true,
    backHref: '/settings',
    title: '프로필'
  },
  //메인  페이지
  '/main': { showHeader: true },
  //배지 컬렉션 페이지
  '/badge-collection': {
    showHeader: true,
    backHref: '/main',
    title: '배지',
    showSaveButton: true
  },
  '/badge-collection/gacha': {
    showHeader: true,
    backHref: '/badge-collection'
  },
  '/badge-collection/gacha/result': {
    showHeader: true
  },

  //알림 페이지
  '/notification': {
    showHeader: true,
    backHref: '/main',
    title: '알림'
  },

  //뽑기 페이지
  '/lucky-stamp': { showHeader: true, backHref: '/main', title: '러닝종료' },

  //크루 페이지
  '/crew-reward': {
    showHeader: true,
    backHref: '/main',
    title: '크루 주간 보상'
  },
  '/group': {
    showHeader: false,
    backHref: '/main',
    title: '크루'
  },
  '/group/code': {
    showHeader: false,
    backHref: '/group',
    title: '초대 코드 입력'
  },
  '/group/code/invite': {
    showHeader: false,
    backHref: '/group/code',
    title: '초대 코드 입력'
  },
  '/group/running': {
    showHeader: false,
    backHref: '/main',
    title: '그룹 달리기 조회'
  },
  //목표 거리 수정페이지
  '/change-target-distance': {
    showHeader: true,
    backHref: '/main',
    title: '목표 수정',
    showSaveButton: true
  },
  //오늘 뛴 결과 페이지
  '/today-run-result': {
    showHeader: true,
    backHref: '/main'
  },
  //캘린더 페이지
  '/calendar': {
    showHeader: true,
    title: '캘린더'
  }
};
