export interface RouteConfig {
  showHeader: boolean;
  backHref?: string;
  title?: string;
  showSaveButton?: boolean;
}

export const routeConfigs: Record<string, RouteConfig> = {
  '/group': {
    showHeader: true,
    backHref: '/app/home',
    title: '크루'
  },
  '/group/code': {
    showHeader: true,
    backHref: '/group',
    title: '초대 코드 입력'
  },
  '/group/code/invite': {
    showHeader: false,
    backHref: '/group/code',
    title: '초대 코드 입력'
  },
  '/group/running': {
    showHeader: true,
    backHref: '/app/home',
    title: '그룹 달리기 조회'
  },
  '/group/create': {
    showHeader: true,
    backHref: '/back',
    title: '크루 만들기'
  }
};
