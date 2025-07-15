import React from 'react';

import { NavLink } from 'react-router-dom';

import { cn } from '@soup/utils';

import { MODAL, PATH } from '~/shared/constants';
import { useModal } from '~/shared/hooks';
import type { ModalItem } from '~/shared/types';
import { IconButton, LogoutModal, Profile } from '~/shared/ui';
import { getCookie, getPath, useFetchJoinedRoom } from '~/shared/utils';
import {
  AlarmModal,
  CreateProjectModal,
  SettingModal,
} from '~/features/menu/ui';

export default function Sidebar({
  isDefault = false,
}: {
  isDefault?: boolean;
}) {
  const { openModal } = useModal();

  const handleModal = (key: ModalItem) => {
    openModal(key);
  };

  const { data, isFetched, isLoading, refetch } = useFetchJoinedRoom();

  return (
    <>
      <div className="box-shadow border-main-board-border z-30 flex h-screen w-[270px] flex-col justify-between border-r py-[32px] text-center">
        <div>
          <div className="ml-[174px] flex gap-[16px]">
            <IconButton
              name="프로젝트 생성"
              icon="/icons/project_plus.svg"
              onClick={() => handleModal(MODAL.CREATE_PROJECT)}
            />
            <IconButton
              name="알람"
              icon="/icons/bell_activate.svg"
              onClick={() => handleModal(MODAL.ALARM)}
            />
          </div>
          <div className="bg-lock mx-[8px] mt-[42px] flex h-[42px] w-[254px] items-center gap-[10px] rounded-[10px] p-[10px]">
            <img src="/icons/project.svg" alt="프로젝트" />
            <span>프로젝트</span>
          </div>
          <div className="text-md mx-[32px] my-[16px] flex flex-col items-start gap-4 font-light">
            {isLoading && <span></span>}
            {isFetched &&
              data!.length > 0 &&
              data!.data.map(({ projectId, projectName }) => (
                <NavLink
                  tabIndex={-1}
                  key={projectId}
                  className={({ isActive }) =>
                    cn(
                      'pl-3 outline-none hover:cursor-pointer',
                      isActive &&
                        'border-point border-bold text-point border-l-3',
                    )
                  }
                  to={getPath(PATH.PROJECT, `${projectId}`)}
                >
                  <span>{projectName}</span>
                </NavLink>
              ))}
            {isDefault && (
              <p className="text-light mt-[12px] text-sm">
                참여중인 프로젝트가 없습니다
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <Profile
            image={getCookie('USER_PROFILE') || ''}
            name={decodeURIComponent(getCookie('USER_NAME') || '')}
            className="pl-[32px]"
          />
          <div className="flex justify-end gap-[16px] pr-[32px]">
            <button
              className="text-light hover:text-dark text-sm hover:cursor-pointer"
              onClick={() => handleModal(MODAL.SETTING)}
            >
              설정
            </button>
            <button
              className="text-light hover:text-dark text-sm hover:cursor-pointer"
              onClick={() => handleModal(MODAL.LOGOUT)}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
      <CreateProjectModal refetch={refetch} />
      <LogoutModal />
      <SettingModal />
      <AlarmModal />
    </>
  );
}
