import React, { HTMLAttributes, useState } from 'react';

import { Checkbox } from '@soup/design-system';

import Profile from './Profile';

interface UserItemProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  checkedHandler: () => void;
  nonCheckedHandler: () => void;
}

export default function UserItem({
  id,
  name,
  nonCheckedHandler,
  checkedHandler,
}: UserItemProps) {
  const [checked, setChecked] = useState(false);
  const handleChecked = () => {
    if (checked) {
      checkedHandler();
      setChecked(false);
    } else {
      nonCheckedHandler();
      setChecked(true);
    }
  };

  return (
    <div className="flex h-10 flex-shrink-0 items-center gap-x-3">
      <Checkbox
        id={id}
        checkboxClassName="border-dark size-4.5"
        onChange={handleChecked}
        checked={checked}
      />
      <Profile name={name} imageClassName="size-9" />
    </div>
  );
}
