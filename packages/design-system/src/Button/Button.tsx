import { ButtonHTMLAttributes, useRef } from 'react';
import { ButtonColorVariant, ButtonSizeVariant } from './Button.types';
import { buttonVariants } from './Button.styles';
import { cn } from '@soup/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColorVariant;
  size?: ButtonSizeVariant;
  locked?: boolean;
  loading?: boolean;
}

const Button = ({
  color,
  size,
  locked,
  loading,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const buttonRef = useRef(null);

  return (
    <button
      ref={buttonRef}
      className={cn(
        buttonVariants({ color, size, locked, loading }),
        className,
        'cursor-pointer',
      )}
      disabled={loading || locked}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
