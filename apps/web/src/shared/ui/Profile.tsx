import { cn } from '@soup/utils';
import React from 'react';
import type { ProfileLevel } from '../types';
import LevelBadge from './LevelBadge';

interface ProfileProps {
  image?: string;
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
  const imageUrl =
    image === '-'
      ? '/icons/icon-profile.svg'
      : !image
        ? '/icons/icon-profile.svg'
        : ` http://student-p.p-e.kr/download/${image}`;

  return (
    <div className={cn('flex items-center gap-[10px]', className)}>
      <img
        src={imageUrl}
        alt="프로필"
        className={cn(
          'border-sub size-[42px] overflow-hidden rounded-full border object-cover object-center',
          imageClassName,
        )}
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
