import { useState } from 'react';

interface AlertConfig {
  title?: string;
  message: string;
  buttons?: Array<{
    text: string;
    onPress?: () => void;
    className: string;
    textClassName?: string;
  }>;
}

export function useCustomAlert() {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (config: AlertConfig) => {
    setAlertConfig(config);
    setVisible(true);
  };

  const hideAlert = () => {
    setVisible(false);
    setTimeout(() => setAlertConfig(null), 200);
  };

  return {
    alertConfig,
    visible,
    showAlert,
    hideAlert
  };
}
