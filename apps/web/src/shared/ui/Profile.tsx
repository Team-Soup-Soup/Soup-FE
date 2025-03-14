import { cn } from '@soup/utils';
import React from 'react';
import type { ProfileLevel } from '../types';
import LevelBadge from './LevelBadge';

interface ProfileProps {
  image: string;
  name: string;
  level?: ProfileLevel;
  className?: string;
  imageClassName?: string;
  nameClassName?: string;
  connecting?: string;
  connectingClassName?: string;
}

export default function Profile({
  image,
  name,
  level,
  className,
  imageClassName,
  nameClassName,
  connecting,
  connectingClassName,
}: ProfileProps) {
  return (
    <div className={cn('flex items-center gap-[10px]', className)}>
      <img
        src={image || '/images/user_profile.webp'}
        alt="프로필"
        width={42}
        height={42}
        className={cn('rounded-full', imageClassName)}
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-[4px]">
          <p
            className={cn(
              'text-dark text-md flex gap-[4px] font-light',
              nameClassName,
            )}
          >
            {name}
          </p>
          {level && <LevelBadge level={level} />}
        </div>
        {connecting && (
          <p
            className={cn('text-light text-sm font-light', connectingClassName)}
          >
            마지막 접속: {connecting}
          </p>
        )}
      </div>
    </div>
  );
}
