import React, { useEffect } from 'react';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { ProfileLevel, User } from '~/shared/types';
import { Profile } from '~/shared/ui';

interface ManageButtonProps {
  content: string;
  onClick?: () => void;
}

export default function ProjectManageModal({ data }: { data: User[] }) {
  const { isOpen } = useModalState({ key: MODAL.MANAGE_PROJECT });
  const { openModal, closeModal } = useModal();

  const LEVEL: Record<'M' | 'S' | 'C', ProfileLevel> = {
    M: 'master',
    S: 'subMaster',
    C: 'classic',
  };

  useEffect(() => {
    const escKeyModalClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal(MODAL.MANAGE_PROJECT);
        console.log('Escape');
      }
    };
    document.addEventListener('keydown', escKeyModalClose);

    return () => document.removeEventListener('keydown', escKeyModalClose);
  }, [closeModal]);

  return (
    isOpen && (
      <div className="border-main-board-border box-shadow absolute right-8 top-[98px] z-20 flex flex-col gap-[30px] rounded-[10px] border bg-white p-[24px]">
        <div className="flex flex-col gap-[8px]">
          <div>멤버</div>
          <div className="flex flex-col gap-[24px]">
            {data.map(({ username, userId, userRole }) => (
              <Profile
                key={userId}
                name={username}
                connecting={'얼마 전 접속'}
                level={LEVEL[userRole]}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div>초대하기</div>
          <ManageButton
            content="이메일로 초대하기"
            onClick={() => openModal(MODAL.INVITE_PROJECT)}
          />
        </div>
        <div className="flex flex-col gap-[12px]">
          <div>기타</div>
          <div className="flex flex-col">
            <ManageButton
              content="멤버별 편집"
              onClick={() => openModal(MODAL.MANAGE_MEMBER)}
            />
            <ManageButton
              content="프로젝트 이름/설명 변경하기"
              onClick={() => openModal(MODAL.UPDATE_PROJECT)}
            />
            <ManageButton
              content=" 프로젝트 나가기"
              onClick={() => openModal(MODAL.LEVEL_PROJECT)}
            />
          </div>
        </div>
      </div>
    )
  );
}

const ManageButton = ({ content, onClick }: ManageButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-normal-dark flex h-[42px] place-items-center rounded-[10px] p-[10px] text-start text-sm font-light hover:cursor-pointer"
    >
      {content}
    </button>
  );
};
