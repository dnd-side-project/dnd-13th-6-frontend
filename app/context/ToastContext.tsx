import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToastConfig {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastContextType {
  showToast: (config: ToastConfig) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  hideToast: () => void;
  visible: boolean;
  toastConfig: ToastConfig | null;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = (config: ToastConfig) => {
    setToastConfig(config);
    setVisible(true);
  };

  const hideToast = () => {
    setVisible(false);
    setTimeout(() => setToastConfig(null), 300);
  };

  const showSuccess = (message: string, duration?: number) => {
    showToast({ message, type: 'success', duration });
  };

  const showError = (message: string, duration?: number) => {
    showToast({ message, type: 'error', duration });
  };

  const showInfo = (message: string, duration?: number) => {
    showToast({ message, type: 'info', duration });
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccess,
        showError,
        showInfo,
        hideToast,
        visible,
        toastConfig
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
