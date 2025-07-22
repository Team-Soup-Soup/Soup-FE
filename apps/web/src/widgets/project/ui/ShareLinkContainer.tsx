import { cn } from '@soup/utils';
import React, { useReducer, useState } from 'react';

import LinkAddIcon from '~/assets/icons/share-link-add.svg';
import LinkDeleteIcon from '~/assets/icons/share-link-delete.svg';

import { useFetchShareLink } from '~/features/project/api';
import { AddShareLinkModal } from '~/features/project/ui';

import { MODAL } from '~/shared/constants';
import { useModal, useProjectId } from '~/shared/hooks';
import { IconButton } from '~/shared/ui';
import { useDeleteSharedLink } from '../api';
import type { ShareLink } from '~/features/project/types';

export default function ShareLinkContainer() {
  const [isEditMode, setIsEditMode] = useReducer(
    (prev: boolean) => !prev,
    false,
  );
  const [selectedLink, setSelectedLink] = useState<ShareLink | undefined>(
    undefined,
  );

  const projectId = useProjectId();
  const { openModal } = useModal();
  const { data, refetch: refetchShareLink } = useFetchShareLink(projectId);
  const { mutate: deleteSharedLink } = useDeleteSharedLink();

  const handleAddClick = () => {
    openModal(MODAL.CREATE_SHARE_LINK);
  };

  const handleUpdateLink = (link: ShareLink) => {
    setSelectedLink(link);
    openModal(MODAL.CREATE_SHARE_LINK);
  };

  const handleDeleteClick = () => setIsEditMode();

  const handleDeleteLink = (linkId: number) => {
    deleteSharedLink(
      { linkId, projectId },
      { onSuccess: () => refetchShareLink() },
    );
  };

  return (
    <div className="rounded-auth box-shadow-inner bg-lock h-menu-height flex basis-full flex-col px-6 py-4 2xl:mt-0 2xl:flex-1">
      <div className="mb-4 flex items-center justify-between font-light">
        <span className="text-md">공유링크</span>
        <span className="flex gap-x-2">
          <IconButton
            name="del-link"
            icon={LinkDeleteIcon}
            onClick={handleDeleteClick}
          />
          <IconButton
            name="add-link"
            icon={LinkAddIcon}
            onClick={handleAddClick}
          />
        </span>
      </div>

      {data?.length === 0 ? (
        <div className="flex size-full items-center justify-center">
          <p className="text-md text-light font-light">
            등록된 공유 링크가 없습니다.
          </p>
        </div>
      ) : (
        <div className="flex size-full flex-wrap gap-4">
          {data?.map((item) => (
            <div className="relative size-[36px]" key={item.linkId}>
              {isEditMode && (
                <button
                  onClick={() => handleDeleteLink(item.linkId)}
                  className="border-main-board-border absolute -right-1 -top-1 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full border-[1px] bg-white"
                >
                  <img
                    src="/icons/icon-plus.svg"
                    alt="delete"
                    className="size-full"
                  />
                </button>
              )}
              <button
                onClick={() => {
                  if (isEditMode) {
                    handleUpdateLink(item);
                  } else {
                    window.open(item.link, '_blank');
                  }
                }}
                title={item.linkTitle}
                className={cn(
                  'border-main-board-border size-[36px] cursor-pointer overflow-hidden rounded-[4px] border-[1px] bg-white outline-none',
                  isEditMode && 'shake',
                )}
              >
                <img
                  src={`http://student-p.p-e.kr/download/${item.files.url}`}
                  alt="share-link"
                  className="size-full object-cover"
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <AddShareLinkModal
        isEditMode={isEditMode}
        setEditMode={setIsEditMode}
        defaultValues={selectedLink}
        setSelectedLink={setSelectedLink}
      />
    </div>
  );
}
