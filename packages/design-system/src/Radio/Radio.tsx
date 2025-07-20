import { InputHTMLAttributes, useRef } from 'react';
import { cn } from '@soup/utils';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  radioClassname?: string;
  name?: string;
  multiple?: boolean;
}

const Radio = ({
  id,
  label,
  radioClassname,
  name,
  className,
  checked,
  onChange,
  multiple = false,
  ...rest
}: RadioProps) => {
  const radioRef = useRef(null);

  return (
    <div className={cn('flex flex-shrink-0 items-center gap-2', className)}>
      <input
        ref={radioRef}
        id={id}
        name={name}
        type={multiple ? 'checkbox' : 'radio'}
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
