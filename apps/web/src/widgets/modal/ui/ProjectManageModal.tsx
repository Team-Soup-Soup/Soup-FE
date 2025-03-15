import React, { useEffect } from 'react';
import { userList } from '~/mocks';
import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { ProfileLevel } from '~/shared/types';
import { Profile } from '~/shared/ui';

interface ManageButtonProps {
  content: string;
  onClick?: () => void;
}

export default function ProjectManageModal() {
  const { isOpen } = useModalState({ key: MODAL.MANAGE_PROJECT });
  const { closeModal } = useModal();

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
            {userList.map(({ name, profile, connecting, level }) => (
              <Profile
                key={name}
                name={name}
                image={profile}
                connecting={connecting}
                level={level as ProfileLevel}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div>초대하기</div>
          <ManageButton content="이메일로 초대하기" />
        </div>
        <div className="flex flex-col gap-[12px]">
          <div>기타</div>
          <div className="flex flex-col">
            <ManageButton content="멤버별 편집" />
            <ManageButton content="프로젝트 이름/설명 변경하기" />
            <ManageButton content=" 프로젝트 나가기" />
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
