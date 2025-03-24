import React from 'react';
import { Checkbox } from '@soup/design-system';
import Profile from './Profile';

export default function UserItem({ id }: { id: string }) {
  return (
    <div className="flex h-10 flex-shrink-0 items-center gap-x-3">
      <Checkbox id={id} checkboxClassName="border-dark size-4.5" />
      <Profile name="칠가이" imageClassName="size-9" />
    </div>
  );
}
