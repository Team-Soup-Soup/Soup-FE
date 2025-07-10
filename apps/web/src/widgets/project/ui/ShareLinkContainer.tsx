import React from 'react';

import LinkAddIcon from '~/assets/icons/share-link-add.svg';
import LinkDeleteIcon from '~/assets/icons/share-link-delete.svg';
import { useFetchShareLink } from '~/features/project/api';
import { AddShareLinkModal } from '~/features/project/ui';
import { MODAL } from '~/shared/constants';
import { useModal, useProjectId } from '~/shared/hooks';
import { IconButton } from '~/shared/ui';

export default function ShareLinkContainer() {
  const { openModal } = useModal();
  const projectId = useProjectId();
  const { data } = useFetchShareLink(projectId);
  const handleAddClick = () => {
    openModal(MODAL.CREATE_SHARE_LINK);
  };
  const handleDeleteClick = () => {
    openModal(MODAL.DELETE_SHARE_LINK);
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
        <div className="flex size-full flex-col flex-wrap gap-4">
          {data?.map((item) => (
            <div
              onClick={() => {
                window.open(item.link, '_blank');
              }}
              className="border-main-board-border size-[36px] overflow-hidden border-[1px] bg-white"
              key={item.linkId}
            >
              {/* <img
                src={`${process.env.REACT_APP_FILE_URL}/${item.files.url}`}
                alt="share-link"
                className="size-full object-cover"
              /> */}
              {item.files.url}
            </div>
          ))}
        </div>
      )}

      <AddShareLinkModal />
    </div>
  );
}
