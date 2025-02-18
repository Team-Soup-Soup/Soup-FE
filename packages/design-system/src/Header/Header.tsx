import { HTMLAttributes } from 'react';
import { cn } from '@soup/utils';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {}

export interface HeaderItemProps extends HTMLAttributes<HTMLElement> {
  selected?: boolean;
}

const Header = ({ className, children, ...rest }: HeaderProps) => {
  return (
    <ul
      className={cn('text-dark flex items-center gap-[12px]', className)}
      {...rest}
    >
      {children}
    </ul>
  );
};

const HeaderItem = ({
  selected,
  className,
  children,
  ...rest
}: HeaderItemProps) => {
  return (
    <li
      className={cn('text-sm', selected && 'text-point', className)}
      {...rest}
    >
      {children}
    </li>
  );
};

Header.displayName = 'Header';
HeaderItem.displayName = 'HeaderItem';

Header.Item = HeaderItem;

export default Header;
