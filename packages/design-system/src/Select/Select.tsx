import { SelectHTMLAttributes, useRef, useState } from 'react';
import { cn } from '@soup/utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<string>;
  className?: string;
  initValue?: string;
  disabled?: boolean;
  boxContentClassName?: string;
  optionClassName?: string;
}

const Select = ({
  options,
  className,
  initValue,
  disabled = false,
  boxContentClassName,
  optionClassName,
  ...rest
}: SelectProps) => {
  const selectRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(initValue || options[0]);

  const handleClickedSelect = () => {
    setClicked(!clicked);
  };
  const handleOptionClick = (option: string) => {
    setValue(option);
    setClicked(false);
  };

  return (
    <div className={cn('min-w-[154px] font-light', className)} ref={selectRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={handleClickedSelect}
        className={cn(
          'focus:border-point border-main-board-border flex w-full items-center justify-between rounded-[10px] border p-[12px]',
          disabled && 'bg-lock',
          boxContentClassName,
        )}
      >
        {value}
        <img
          src={clicked ? '/icons/chevron_up.svg' : '/icons/chevron_down.svg'}
          alt="down"
          width={24}
          height={24}
        />
      </button>
      <div className="relative w-full">
        <ul
          className={cn(
            'border-main-board-border mt-[6px] flex w-full flex-col gap-[10px] rounded-[10px] border bg-white p-[4px]',
            clicked ? 'absolute z-10' : 'hidden',
            optionClassName,
          )}
        >
          {options.map((option) => (
            <li>
              <button
                onClick={() => handleOptionClick(option)}
                key={option}
                type="button"
                className="hover:bg-lock w-full rounded-[8px] p-[8px] text-left"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Select.displayName = 'Select';

export default Select;
