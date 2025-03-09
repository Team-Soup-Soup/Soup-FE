import React, { useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { cn } from '@soup/utils';

import { projectList } from '~/mocks';
import { MODAL, PATH } from '~/shared/constants';
import { useModal } from '~/shared/hooks';
import { useProject } from '~/shared/hooks/useProject';
import type { ModalItem } from '~/shared/types';
import { IconButton, Profile } from '~/shared/ui';
import {
  AlarmModal,
  CreateProjectModal,
  LogoutModal,
  SettingModal,
  UpdateModal,
} from '~/widgets/modal/ui';

export default function Sidebar() {
  const { openModal } = useModal();
  const { changeProject } = useProject();
  const navigate = useNavigate();

  const handleProjectClick = (id: string) => {
    changeProject(id);
    navigate(`/project/${id}`);
  };

  const handleModal = (key: ModalItem) => {
    openModal(key);
  };

  const createIdUrl = (root: string, id: string) => {
    return root + '/' + id;
  };

  useEffect(() => {
    if (projectList.length) {
      changeProject(projectList[0].project);
    }
  }, [changeProject]);

  return (
    <>
      <div className="box-shadow border-main-board-border flex h-screen w-[270px] flex-col justify-between border-r py-[32px] text-center">
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
            {projectList.length > 0 ? (
              projectList.map(({ project }) => (
                <NavLink
                  key={project}
                  className={({ isActive }) =>
                    cn(
                      'pl-3 hover:cursor-pointer',
                      isActive &&
                        'border-point border-bold text-point border-l-3',
                    )
                  }
                  to={createIdUrl(PATH.PROJECT, project)}
                  onClick={() => handleProjectClick(project)}
                >
                  <span>{project}</span>
                </NavLink>
              ))
            ) : (
              <p className="text-light mt-[12px]">
                참여중인 프로젝트가 없습니다
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <Profile image="" name="홍길동" />
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
      <CreateProjectModal />
      <LogoutModal />
      <SettingModal />
      <AlarmModal />
      <UpdateModal />
    </>
  );
}
