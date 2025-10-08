'use client';
import { useState, useEffect, useCallback } from 'react';

export const useTargetDistance = (initialValue: string = '') => {
  const [targetDistance, setTargetDistance] = useState(initialValue);

  useEffect(() => {
    const storedTargetDistance = localStorage.getItem('targetDistance');
    if (storedTargetDistance !== null) {
      setTargetDistance(storedTargetDistance);
    }
  }, []);

  const handleDistanceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;
      val = val.replace(/[^0-9.]/g, '');

      const dotIndex = val.indexOf('.');
      if (dotIndex > -1) {
        const afterDot = val.substring(dotIndex + 1).replace(/\./g, '');
        val = val.substring(0, dotIndex + 1) + afterDot;
      }

      const parts = val.split('.');
      if (parts[1] && parts[1].length > 2) {
        val = `${parts[0]}.${parts[1].substring(0, 2)}`;
      }

      setTargetDistance(val);
    },
    []
  );

  const formatAndSetDistance = useCallback(() => {
    if (targetDistance !== '') {
      const formatted = parseFloat(targetDistance).toFixed(2);
      setTargetDistance(formatted);
    }
  }, [targetDistance]);

  const saveDistanceToStorage = useCallback(() => {
    let distance = targetDistance;
    if (distance === '' || distance === '0') {
      distance = '3.00'; // 기본값
    }
    const formattedDistance = parseFloat(distance).toFixed(2);
    localStorage.setItem('targetDistance', formattedDistance);
    return formattedDistance;
  }, [targetDistance]);

  return {
    targetDistance,
    handleDistanceChange,
    formatAndSetDistance,
    saveDistanceToStorage
  };
};
