import { useCallback } from 'react';

interface ToastAPI {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

declare global {
  interface Window {
    toast: ToastAPI;
  }
}

export const useToast = () => {
  const showToast = useCallback(
    (type: keyof ToastAPI, message: string, duration?: number) => {
      if (typeof window !== 'undefined' && window.toast) {
        window.toast[type](message, duration);
      }
    },
    [],
  );

  return {
    success: (message: string, duration?: number) =>
      showToast('success', message, duration),
    error: (message: string, duration?: number) =>
      showToast('error', message, duration),
    warning: (message: string, duration?: number) =>
      showToast('warning', message, duration),
    info: (message: string, duration?: number) =>
      showToast('info', message, duration),
  };
};
