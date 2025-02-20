import { InputHTMLAttributes, useRef } from 'react';
import { cn } from '@soup/utils';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  checkboxClassName?: string;
  labelClassName?: string;
}

const Checkbox = ({
  id,
  label,
  checkboxClassName,
  checked,
  labelClassName,
  className,
  onChange,
  ...rest
}: CheckboxProps) => {
  const CheckboxRef = useRef(null);

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <input
        ref={CheckboxRef}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={cn(
          'checked:bg-point checkbox border-main-board-border relative size-[18px] cursor-pointer appearance-none rounded-[2.5px] border-[1px]',
          checkboxClassName,
        )}
        {...rest}
      />
      {label && (
        <label
          htmlFor={id}
          className={cn('text-dark font-light', labelClassName)}
        >
          {label}
        </label>
      )}
    </div>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
