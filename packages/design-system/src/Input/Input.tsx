import { InputHTMLAttributes, useRef, useState } from 'react';
import { cn } from '@soup/utils';
import { Eye, EyeOff, Search } from '../assets/svg';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  isSearch?: boolean;
  maxLength?: number;
  searchHandler?: () => void;
  errorMessage?: string;
  showPasswordButton?: boolean;
}

const Input = ({
  id,
  label,
  value,
  labelClassName,
  inputClassName,
  isSearch,
  maxLength,
  errorMessage,
  showPasswordButton,
  required,
  className,
  children,
  placeholder,
  searchHandler,
  ...rest
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="mb-2 flex gap-2">
        {label && (
          <label
            htmlFor={id}
            className={cn('text-dark font-light', labelClassName)}
          >
            {label}
            {required && <span className="text-important ml-0.5">*</span>}
          </label>
        )}
        {errorMessage && (
          <span className="text-important font-light">* {errorMessage}</span>
        )}
      </div>
      <div className="relative inline-flex items-center">
        {maxLength && (
          <span className="text-light absolute right-[10px] place-items-center">
            {String(value).length}/{maxLength}자
          </span>
        )}
        {showPasswordButton && (
          <button
            type="button"
            className="absolute right-[10px] place-items-center outline-none hover:cursor-pointer"
            tabIndex={-1}
            onClick={handlePasswordToggle}
          >
            {showPassword ? (
              <Eye width={20} height={20} />
            ) : (
              <EyeOff width={20} height={20} />
            )}
          </button>
        )}
        <input
          id={id}
          ref={inputRef}
          value={value}
          type={showPasswordButton && !showPassword ? 'password' : 'text'}
          className={cn(
            'border-main-board-border focus:border-point size-full rounded-[10px] border p-[14px] font-light focus:outline-none',
            isSearch && 'pl-[44px]',
            inputClassName,
          )}
          placeholder={placeholder || '검색어를 입력하세요'}
          {...rest}
        />
        {isSearch && (
          <Search
            width={20}
            height={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 transform"
            style={{
              filter:
                'invert(69%) sepia(81%) saturate(3097%) hue-rotate(3deg) brightness(106%) contrast(105%)',
              width: '24px',
              height: '24px',
            }}
            onClick={searchHandler}
          />
        )}
      </div>
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
