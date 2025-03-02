import React, { Dispatch, useState } from 'react';

import { cn } from '@soup/utils';
import { SetStateAction } from 'jotai';

export default function MenuHeader() {
  const [selected, setSelected] = useState('홈');

  return (
    <div className="border-lock mb-10 h-fit border-b-[2px]">
      <div className="flex gap-x-8 text-lg">
        <HeaderButton name="홈" selected={selected} setSelected={setSelected} />
        <HeaderButton
          name="활동기록"
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
}

interface HeaderButtonProps {
  name: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

function HeaderButton({ name, selected, setSelected }: HeaderButtonProps) {
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
