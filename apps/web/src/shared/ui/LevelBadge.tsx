import React from 'react';
import type { ProfileLevel } from '../types';
import { cn } from '@soup/utils';

interface LevelBadgeProps {
  level: ProfileLevel;
}

const levelStyle = {
  master: 'bg-notice-section',
  subMaster: 'bg-peer-review-section',
  classic: 'bg-free-section',
};

export default function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <>
      <div
        className={cn(
          'flex h-[16px] w-[24px] items-center justify-center text-sm font-light',
          levelStyle[level],
        )}
      >
        {level[0].toUpperCase()}
      </div>
    </>
  );
}

LevelBadge.displayName = 'LevelBadge';
