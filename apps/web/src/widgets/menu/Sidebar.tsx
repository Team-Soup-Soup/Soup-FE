import React from 'react';
import { CreateProjectModal, LogoutModal, SettingModal } from '~/pages/home/ui';
import { MODAL } from '~/shared/constants';
import { useModal } from '~/shared/hooks';

export default function Sidebar() {
  const { openModal: createProjectModal } = useModal({
    key: MODAL.CREATE_PROJECT,
  });
  const { openModal: logoutModal } = useModal({ key: MODAL.LOGOUT });
  const { openModal: settingModal } = useModal({ key: MODAL.SETTING });

  return (
    <>
      <div className="box-shadow border-main-board-border flex h-screen w-[270px] flex-col justify-between border-r py-[32px] text-center">
        <div>
          <div className="ml-[174px] flex gap-[16px]">
            <button
              className="hover:cursor-pointer"
              onClick={createProjectModal}
            >
              <img src="/icons/project_plus.svg" alt="프로젝트 생성" />
            </button>
            <button>
              <img src="/icons/bell_activate.svg" alt="알람" />
            </button>
          </div>
          <div className="bg-lock mx-[8px] mt-[42px] flex h-[42px] w-[254px] items-center gap-[10px] rounded-[10px] p-[10px]">
            <img src="/icons/project.svg" alt="프로젝트 생성" />
            <span>프로젝트</span>
          </div>
          <p className="text-light mt-[12px]">참여중인 프로젝트가 없습니다</p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-[10px] pl-[32px]">
            <img
              src=""
              alt="프로필"
              width={42}
              height={42}
              className="rounded-full"
            />
            <p className="text-dark text-md font-light">홍길동</p>
          </div>
          <div className="flex justify-end gap-[16px] pr-[32px]">
            <button
              className="text-light text-sm hover:cursor-pointer"
              onClick={settingModal}
            >
              설정
            </button>
            <button
              className="text-light text-sm hover:cursor-pointer"
              onClick={logoutModal}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
      <CreateProjectModal />
      <LogoutModal />
      <SettingModal />
    </>
  );
}
