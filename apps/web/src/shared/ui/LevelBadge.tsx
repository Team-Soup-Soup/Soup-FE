import React, { useEffect, useState } from 'react';
import type { ProfileLevel } from '../types';
import { cn } from '@soup/utils';

interface LevelBadgeProps {
  level: ProfileLevel;
}

export default function LevelBadge({ level }: LevelBadgeProps) {
  const [backgroundColor, setBackgroundColor] = useState('');
  const [badgeText, setBadgeText] = useState('');

  useEffect(() => {
    switch (level) {
      case 'master':
        setBackgroundColor('bg-notice-section');
        break;
      case 'subMaster':
        setBackgroundColor('bg-peer-review-section');
        break;
      case 'classic':
        setBackgroundColor('bg-free-section');
        break;
    }
    setBadgeText(level[0].toUpperCase());
  }, [level]);

  return (
    <>
      <div
        className={cn(
          'flex h-[16px] w-[24px] items-center justify-center text-sm font-light',
          backgroundColor,
        )}
      >
        {badgeText}
      </div>
    </>
  );
}

LevelBadge.displayName = 'LevelBadge';
