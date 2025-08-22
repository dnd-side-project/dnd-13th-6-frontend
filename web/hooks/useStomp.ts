import { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface UseStompOptions {
  url: string; // ex) "http://localhost:8080/ws"
  subscribeUrl: string; // ex) "/topic/messages"
  publishUrl: string; // ex) "/app/chat"
  onMessage?: (message: string) => void;
}

export function useStomp({ url, subscribeUrl, publishUrl, onMessage }: UseStompOptions) {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS(url);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to STOMP");
        setConnected(true);

        client.subscribe(subscribeUrl, (msg: IMessage) => {
          if (msg.body && onMessage) {
            onMessage(msg.body);
          }
        });
      },
      onDisconnect: () => {
        setConnected(false);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [url, subscribeUrl, onMessage]);

  const publish = (body: string) => {
    if (clientRef.current && connected) {
      clientRef.current.publish({
        destination: publishUrl,
        body,
      });
    }
  };

  return { connected, publish };
}
