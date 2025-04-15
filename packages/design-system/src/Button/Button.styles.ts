import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'font-regular border duration-300 ease-in-out rounded-[43px]',
  {
    variants: {
      color: {
        point:
          'bg-point text-white border-point hover:bg-point-dark font-semibold',
        sub: 'bg-sub text-point border-point hover:bg-sub-dark',
        normal:
          'bg-normal hover:bg-normal-dark border-main-board-border text-dark',
      },
      size: {
        lg: 'py-[12px] px-[28px]',
        md: 'py-[8px] px-[20px]',
        sm: 'px-[12px] text-sm',
      },
      locked: {
        true: 'cursor-not-allowed bg-lock text-light hover:bg-lock',
      },
      loading: {
        true: 'relative cursor-wait',
      },
    },
    defaultVariants: {
      color: 'point',
      size: 'md',
      locked: false,
      loading: false,
    },
  },
);
