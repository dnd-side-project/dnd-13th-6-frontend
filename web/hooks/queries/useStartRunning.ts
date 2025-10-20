import { useMutation } from '@tanstack/react-query';
import { runningStart } from '@/utils/apis/running';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { SEND_MESSAGE_TYPE } from '@/utils/webView/consts';

export const useStartRunning = () => {
  return useMutation({
    mutationFn: runningStart,
    onSuccess: data => {
      const { runningId, runnerId } = data.result;
      const messageData = JSON.stringify({ runningId, runnerId });
      postMessageToApp(SEND_MESSAGE_TYPE.RUNNING_START, messageData);
      localStorage.setItem('runningId', runningId);
      localStorage.setItem('runnerId', runnerId);
    },
    onError: async error => {
      throw error;
    }
  });
};
