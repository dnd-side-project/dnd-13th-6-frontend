export interface Notification {
  id: number;
  title: string;
  text: string;
  senderId: number;
  read: boolean;
  createdAt: string;
  template: {
    code: string;
    raw: string;
    variables: {
      CREW_NAME: string;
      NICKNAME: string;
    };
    emphasize: string[];
  };
}
