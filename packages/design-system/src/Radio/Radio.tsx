import { InputHTMLAttributes, useRef } from 'react';
import { cn } from '@soup/utils';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  radioClassname?: string;
  name?: string;
}

const Radio = ({
  id,
  label,
  radioClassname,
  name,
  className,
  checked,
  onChange,
  ...rest
}: RadioProps) => {
  const radioRef = useRef(null);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        ref={radioRef}
        id={id}
        name={name}
        type="radio"
        checked={checked}
        onChange={onChange}
        className={cn(
          'border-lock size-[16px] cursor-pointer appearance-none rounded-full border-[3px] outline-none',
          checked && '!bg-point',
          radioClassname,
        )}
        {...rest}
      />
      <label
        htmlFor={id}
        className="text-dark cursor-pointer text-sm font-light"
      >
        {label}
      </label>
    </div>
  );
};

Radio.displayName = 'Radio';

export default Radio;
