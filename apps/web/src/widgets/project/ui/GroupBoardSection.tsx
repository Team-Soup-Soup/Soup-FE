import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AddIcon from '~/assets/icons/plus.svg';
import { CreateGroupBoardModal } from '~/features/project/ui';
import { MODAL } from '~/shared/constants';
import { useModal, useProjectId } from '~/shared/hooks';
import type { Role } from '~/shared/types';
import { getCookie, getPath } from '~/shared/utils';

export default function GroupBoardSection() {
  const groupBoard = ['제네럴프론트'];
  const { openModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = useProjectId();
  const projectAuth = getCookie(`projectAuth${projectId}`) as Role;

  return (
    <>
      <div className="max-w-[calc(100vw-334px)] overflow-hidden pb-8">
        <div className="mt-23">
          <p className="text-lg">우리들의 보드</p>
        </div>
        {groupBoard.length === 0 ? (
          <div className="h-menu-height mt-6 grid w-full place-items-center">
            <p className="text-light text-md font-light">
              생성된 보드가 없습니다.
            </p>
          </div>
        ) : (
          <div className="h-menu-height scrollbar-hide mt-6 flex gap-x-4 overflow-scroll py-[1px]">
            {groupBoard.map((board) => (
              <div
                key={board}
                className="rounded-auth border-main-board-border box-shadow-4 relative h-full w-[450px] flex-shrink-0 cursor-pointer border-[1px] bg-white"
                onClick={() => navigate(getPath(location.pathname, board))}
              >
                <div className="rounded-tl-auth rounded-br-auth bg-sub absolute left-0 top-0 px-8 py-2">
                  {board}
                </div>
              </div>
            ))}
            {projectAuth === 'M' && (
              <div
                className="rounded-auth border-main-board-border box-shadow-4 bg-normal-dark grid h-full w-[450px] flex-shrink-0 cursor-pointer place-items-center border-[1px]"
                onClick={() => openModal(MODAL.CREATE_GROUP_BOARD)}
              >
                <img src={AddIcon} className="size-15" />
              </div>
            )}
          </div>
        )}
      </div>
      <CreateGroupBoardModal />
    </>
  );
}
