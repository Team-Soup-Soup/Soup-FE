import { cn } from '@soup/utils';
import React from 'react';

interface ProfileProps {
  image: string;
  name: string;
  className?: string;
  imageClassName?: string;
  nameClassName?: string;
}

export default function Profile({
  image,
  name,
  className,
  imageClassName,
  nameClassName,
}: ProfileProps) {
  return (
    <div className={cn('flex items-center gap-[10px] pl-[32px]', className)}>
      <img
        src={image || '/images/user_profile.webp'}
        alt="프로필"
        width={42}
        height={42}
        className={cn('rounded-full', imageClassName)}
      />
      <p className={cn('text-dark text-md font-light', nameClassName)}>
        {name}
      </p>
    </div>
  );
}
