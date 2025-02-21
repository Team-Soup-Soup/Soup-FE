import { InputHTMLAttributes, useRef } from 'react';
import { cn } from '@soup/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  isSearch?: boolean;
}

const Input = ({
  id,
  label,
  labelClassName,
  inputClassName,
  isSearch,
  required,
  className,
  children,
  placeholder,
  ...rest
}: InputProps) => {
  const inputRef = useRef(null);

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn('text-md text-dark mb-2 font-light', labelClassName)}
        >
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <div className="relative inline-flex items-center">
        <input
          id={id}
          ref={inputRef}
          className={cn(
            'border-main-board-border focus:border-point size-full rounded-[10px] border p-[10px] font-light focus:outline-none',
            isSearch && 'pl-[44px]',
            inputClassName,
          )}
          placeholder={placeholder || '검색어를 입력하세요'}
          {...rest}
        />
        {isSearch && (
          <img
            className="absolute left-3 top-1/2 -translate-y-1/2 transform"
            src="/search.svg"
            alt="search"
            style={{
              filter:
                'invert(69%) sepia(81%) saturate(3097%) hue-rotate(3deg) brightness(106%) contrast(105%)',
              width: '24px',
              height: '24px',
            }}
          />
        )}
      </div>
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
