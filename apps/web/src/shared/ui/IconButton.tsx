import { cn } from '@soup/utils';
import React, { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  icon: string;
  buttonClassName?: string;
  iconClassName?: string;
}

export default function IconButton({
  name,
  icon,
  onClick,
  disabled = false,
  buttonClassName,
  iconClassName,
}: IconButtonProps) {
  return (
    <>
      <button
        className={cn(
          'hover:cursor-pointer focus:outline-none',
          buttonClassName,
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <img src={icon} alt={name} className={cn(iconClassName)} />
      </button>
    </>
  );
}

IconButton.displayName = 'IconButton';
