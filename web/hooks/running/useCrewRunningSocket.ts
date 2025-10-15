'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Client } from '@stomp/stompjs';
import type { MemberData } from '@/types/crew';
import api from '@/utils/apis/customAxios';

interface Location {
  lat: number;
  lng: number;
}

export const useCrewRunningSocket = (crewId: string | null) => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [activeMember, setActiveMember] = useState<MemberData | null>(null);
  const [memberLocation, setMemberLocation] = useState<Location[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const stompClientRef = useRef<Client | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const accessToken = useMemo(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken') || '';
    }
    return '';
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const client = new Client({
      webSocketFactory: () => new WebSocket('wss://api.runky.store/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: { Authorization: `Bearer ${accessToken}` },
      onConnect: () => setIsConnected(true),
      onDisconnect: () => setIsConnected(false)
    });

    client.activate();
    stompClientRef.current = client;

    const handleAppMessage = (event: Event) => {
      try {
        const messageEvent = event as MessageEvent;
        const parsedData = JSON.parse(messageEvent.data);
        if (parsedData.type === 'SET_CREW_MEMBERS') {
          setMembers(parsedData.message as MemberData[]);
        }
      } catch (error) {
        console.error('Error parsing app message:', error);
      }
    };

    document.addEventListener('message', handleAppMessage);
    window.addEventListener('message', handleAppMessage as EventListener);

    return () => {
      document.removeEventListener('message', handleAppMessage);
      window.removeEventListener('message', handleAppMessage as EventListener);
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      stompClientRef.current?.deactivate();
    };
  }, [accessToken]);

  useEffect(() => {
    const fetchInitialMembers = async () => {
      if (!crewId) return;
      try {
        const response = await api.get(`/api/crews/${crewId}/members`);
        setMembers(response.data.result.members);
      } catch (error) {
        console.error('Failed to fetch initial members:', error);
      }
    };
    fetchInitialMembers();

    return () => {
      setMemberLocation([]);
      setActiveMember(null);
    };
  }, [crewId]);

  const selectMember = (member: MemberData) => {
    setActiveMember(member);
    setMemberLocation([]); // 이전 멤버의 위치 기록 초기화

    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    if (member.isRunning && isConnected && stompClientRef.current?.connected) {
      const subscription = stompClientRef.current.subscribe(
        member.sub,
        message => {
          try {
            const data = JSON.parse(message.body);
            setMemberLocation(prev => [...prev, { lat: data.y, lng: data.x }]);
          } catch (error) {
            console.error('Error parsing subscription message:', error);
          }
        },
        { 'content-type': 'application/json' }
      );
      unsubscribeRef.current = () => subscription.unsubscribe();
    }
  };

  return { members, activeMember, memberLocation, selectMember };
};
