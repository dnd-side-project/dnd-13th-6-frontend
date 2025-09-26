import { MODULE } from './apis/api';
import { postMessageToApp } from './apis/postMessageToApp';

export const redirectToLogin = () => {
  const data = {
    type: MODULE.PUSH,
    url: '/(onboarding)'
  };
  postMessageToApp(MODULE.PUSH, JSON.stringify(data));
};
