import React, { useState } from 'react';
import {
  ChangeProjectModal,
  InviteProjectModal,
  LeaveProjectModal,
  ProjectManageModal,
  ProjectMemberManageModal,
} from '~/features/project/ui';
import { userList } from '~/mocks';
import { MODAL } from '~/shared/constants';
import { useModal } from '~/shared/hooks';
import { IconButton } from '~/shared/ui';

interface ProjectHeaderProps {
  description: string;
  name: string;
}

export default function ProjectHeader({
  description,
  name,
}: ProjectHeaderProps) {
  const { openModal, closeModal } = useModal();
  const [openManageModal, setOpenManageModal] = useState(false);

  const handleManageModal = () => {
    if (!openManageModal) {
      setOpenManageModal(true);
      openModal(MODAL.MANAGE_PROJECT);
    } else {
      setOpenManageModal(false);
      closeModal(MODAL.MANAGE_PROJECT);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="mb-10">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-light text-lg font-light">{description}</p>
          <div className="flex items-center">
            <div className="bg-lock mr-3 h-[6px] w-[540px] rounded-sm"></div>0%
          </div>
        </div>
        <div className="flex h-fit gap-[12px]">
          <div className="avatar-group -space-x-6">
            {userList.map(({ profile, name }) => (
              <div className="avatar" key={name}>
                <div className="w-12">
                  <img src={profile} alt={name} />
                </div>
              </div>
            ))}
          </div>
          <IconButton
            name="manageModal"
            icon="/icons/more_vertical.svg"
            onClick={handleManageModal}
          />
        </div>
      </div>
      <ProjectManageModal />
      <ProjectMemberManageModal />
      <InviteProjectModal />
      <ChangeProjectModal />
      <LeaveProjectModal />
    </>
  );
}
