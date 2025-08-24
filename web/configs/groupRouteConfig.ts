  
  export interface RouteConfig {
  showHeader: boolean;
  backHref?: string;
  title?: string;
  showSaveButton?: boolean;
}

export const routeConfigs: Record<string, RouteConfig> = {
    '/group': {
    showHeader: true,
    backHref: '/group',
    title: '초대 코드 입력'
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
    showHeader: false,
    backHref: '/main',
    title: '그룹 달리기 조회'
  }
}