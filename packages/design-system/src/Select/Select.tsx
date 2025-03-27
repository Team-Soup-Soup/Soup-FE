import { SelectHTMLAttributes, useRef, useState } from 'react';
import { cn } from '@soup/utils';

type OptionItem = {
  name: string;
  image?: string;
};

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<OptionItem>;
  className?: string;
  initValue?: OptionItem;
  disabled?: boolean;
  boxContentClassName?: string;
  optionClassName?: string;
  onChangeValue: (value: string) => void;
}

const Select = ({
  options,
  className,
  initValue,
  disabled = false,
  boxContentClassName,
  onChangeValue,
  optionClassName,
}: SelectProps) => {
  const selectRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState<OptionItem>(initValue || options[0]);

  const handleClickedSelect = () => {
    setClicked(!clicked);
  };
  const handleOptionClick = (option: OptionItem) => {
    setValue(option);
    onChangeValue(option.name);
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
        <div className="flex w-full items-center gap-[12px]">
          {value.image && (
            <img
              className="rounded-full object-cover"
              src={value.image}
              alt={value.name}
              width={32}
              height={32}
            />
          )}
          {value.name}
        </div>
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
          {options.map((option: OptionItem) => (
            <li key={option.name}>
              <button
                onClick={() => handleOptionClick(option)}
                type="button"
                className="hover:bg-lock flex w-full items-center gap-[12px] rounded-[8px] p-[8px] text-left"
              >
                {option.image && (
                  <img
                    className="rounded-full object-cover"
                    src={option.image}
                    alt={option.name}
                    width={32}
                    height={32}
                  />
                )}
                {option.name}
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
