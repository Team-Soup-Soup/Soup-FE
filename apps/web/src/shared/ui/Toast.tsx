import React, { useEffect, useState } from 'react';
import { cn } from '@soup/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({
  id,
  message,
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const autoRemoveTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoRemoveTimer);
    };
  }, [id, duration, onClose]);

  return (
    <div
      className={cn(
        'border-main-board-border box-shadow-4 flex items-center gap-3 rounded-[10px] border bg-white px-[24px] py-[18px] shadow-lg transition-all duration-500',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        isLeaving ? 'translate-x-full opacity-0' : '',
      )}
    >
      <span className="flex-1 text-sm">{message}</span>
    </div>
  );
}
