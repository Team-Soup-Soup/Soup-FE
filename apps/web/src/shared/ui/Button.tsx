import { cn } from '@soup/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  className?: string;
}

const ButtonVariants = cva(
  'disabled:border-lock font-regular disabled:cursor-not-allowed disabled:bg-lock disabled:text-light cursor-pointer border duration-300 text-md ease-in-out rounded-[43px]',
  {
    variants: {
      intent: {
        squared: 'rounded-[10px]',
        primary: '',
        shareLink: 'font-extralight disabled:border-main-2-2',
      },
      status: {
        point:
          'bg-point text-white border-point hover:bg-point-dark font-semibold',
        sub: 'bg-sub text-point border-point hover:bg-sub-dark',
        normal:
          'bg-normal hover:bg-normal-dark border-main-board-border text-dark',
        locked: 'cursor-not-allowed bg-lock text-light hover:bg-lock',
      },
      size: {
        lg: 'py-[12px] px-[28px]',
        md: 'py-[8px] px-[20px]',
        sm: 'px-[12px] text-sm',
      },
    },
    defaultVariants: {
      intent: 'primary',
      status: 'point',
      size: 'md',
    },
  },
);

export default function Button({
  intent,
  status,
  size,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(ButtonVariants({ intent, status, size, className }))}
      {...rest}
    >
      {children}
    </button>
  );
}
