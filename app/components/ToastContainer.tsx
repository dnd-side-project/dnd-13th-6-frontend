import React from 'react';
import Toast from './Toast';
import { useToast } from '@/contexts/ToastContext';

export default function ToastContainer() {
  const { visible, toastConfig, hideToast } = useToast();

  return (
    <Toast
      visible={visible}
      message={toastConfig?.message || ''}
      type={toastConfig?.type}
      duration={toastConfig?.duration}
      onHide={hideToast}
    />
  );
}
