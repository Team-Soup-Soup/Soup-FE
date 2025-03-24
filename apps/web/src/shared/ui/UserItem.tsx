import React from 'react';
import { Checkbox } from '@soup/design-system';

export default function UserItem({ id }: { id: string }) {
  return (
    <div className="flex h-10 flex-shrink-0 items-center gap-x-3">
      <Checkbox id={id} checkboxClassName="border-dark size-4.5" />
      <div className="size-8 rounded-[50%] bg-black bg-cover bg-center" />
      <span>칠가이</span>
    </div>
  );
}
