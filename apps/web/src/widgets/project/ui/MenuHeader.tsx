import React, { useState } from 'react';

import { cn } from '@soup/utils';

export default function MenuHeader() {
  const [selected, setSelected] = useState('홈');
  function HeaderButton({ name }: { name: string }) {
    return (
      <span
        className={cn(
          'text-light w-24 cursor-pointer pb-3 text-center',
          selected === name && 'text-dark border-dark border-b-[4px]',
        )}
        onClick={() => setSelected(name)}
      >
        {name}
      </span>
    );
  }
  return (
    <div className="border-lock mb-10 h-fit border-b-[2px]">
      <div className="flex gap-x-8 text-lg">
        <HeaderButton name="홈" />
        <HeaderButton name="활동기록" />
      </div>
    </div>
  );
}
