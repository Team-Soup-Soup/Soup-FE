import { InputHTMLAttributes, useRef } from 'react';
import { cn } from '@soup/utils';

export interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const Toggle = ({
  id,
  label,
  className,
  checked,
  onChange,
  ...rest
}: ToggleProps) => {
  const toggleRef = useRef(null);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <label
        id={id}
        ref={toggleRef}
        className="relative inline-flex cursor-pointer items-center"
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...rest}
        />
        <span
          className={cn(
            'relative inline-flex h-[23.4px] w-[49.4px] cursor-pointer appearance-none items-center rounded-full border-[0.6px] px-[4px] shadow-inner outline-none',
            checked ? 'bg-point border-lock' : 'bg-toggle border-normal-dark',
          )}
        >
          <span
            className={cn(
              'inline-block size-[16px] rounded-full bg-white transition-all',
              checked && 'translate-x-6',
            )}
          />
        </span>
      </label>
      <label
        htmlFor={id}
        className="text-dark cursor-pointer text-sm font-light"
      >
        {label}
      </label>
    </div>
  );
};

Toggle.displayName = 'Toggle';

export default Toggle;
