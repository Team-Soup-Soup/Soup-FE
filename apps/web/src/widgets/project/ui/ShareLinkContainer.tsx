import React from 'react';

import LinkAddIcon from '~/assets/icons/share-link-add.svg';
import LinkDeleteIcon from '~/assets/icons/share-link-delete.svg';

export default function ShareLinkContainer() {
  return (
    <div className="rounded-auth box-shadow-inner bg-lock h-menu-height mt-6 flex basis-full flex-col px-6 py-4 2xl:mt-0 2xl:flex-1">
      <div className="mb-4 flex items-center justify-between font-light">
        <span className="text-md">공유링크</span>
        <span className="flex gap-x-2">
          <img src={LinkDeleteIcon} className="cursor-pointer" />
          <img src={LinkAddIcon} className="cursor-pointer" />
        </span>
      </div>
      <div className="flex size-full items-center justify-center">
        <p className="text-md text-light font-light">
          등록된 공유 링크가 없습니다.
        </p>
      </div>
    </div>
  );
}
