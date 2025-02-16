import { ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function parse(input: string, classNames?: string[]) {
  return input.split('\n').map((val, index) => (
    <p key={index} className={classNames && classNames[index]}>
      {val}
    </p>
  ));
}
