import { cn } from '@soup/utils';
import React, { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  icon: string;
  hoverIcon?: string;
  buttonClassName?: string;
  iconClassName?: string;
}

export default function IconButton({
  name,
  icon,
  hoverIcon,
  onClick,
  disabled = false,
  buttonClassName,
  iconClassName,
}: IconButtonProps) {
  return (
    <>
      <button
        className={cn(
          'group hover:cursor-pointer focus:outline-none',
          buttonClassName,
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <img
          src={icon}
          alt={name}
          className={cn(iconClassName, hoverIcon && 'group-hover:hidden')}
        />
        {hoverIcon && (
          <img
            src={hoverIcon}
            alt={name}
            className={cn(iconClassName, 'hidden group-hover:block')}
          />
        )}
      </button>
    </>
  );
}

IconButton.displayName = 'IconButton';
