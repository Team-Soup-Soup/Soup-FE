import React from 'react';

import LinkAddIcon from '~/assets/icons/share-link-add.svg';
import LinkDeleteIcon from '~/assets/icons/share-link-delete.svg';

export default function ShareLinkContainer() {
  return (
    <div className="rounded-auth box-shadow-inner bg-lock h-menu-height mt-6 flex basis-full flex-col px-6 py-4 2xl:mt-0 2xl:flex-1">
      <div className="mb-2 flex justify-between font-light">
        <span>공유링크</span>
        <span className="flex gap-x-2">
          <img src={LinkDeleteIcon} className="cursor-pointer" />
          <img src={LinkAddIcon} className="cursor-pointer" />
        </span>
      </div>
    </div>
  );
}
