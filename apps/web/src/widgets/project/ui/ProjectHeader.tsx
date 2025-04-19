import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { fetchJoinedUser } from '~/features/project/api';
import {
  UpdateProjectModal,
  InviteProjectModal,
  LeaveProjectModal,
  ProjectManageModal,
  ProjectMemberManageModal,
} from '~/features/project/ui';
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
  const { projectId } = useParams();
  const { openModal, closeModal } = useModal();
  const [openManageModal, setOpenManageModal] = useState(false);
  const { data } = useQuery({
    queryKey: [`project${projectId}JoinedUser`],
    queryFn: () => fetchJoinedUser(Number(projectId)),
    retry: 2,
    initialData: [],
  });

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
            {data.map(({ username }) => (
              <div className="avatar" key={username}>
                <div className="w-12">
                  <img src={''} alt={username} />
                  {/*이미지 추가시 추가예정**/}
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
      <ProjectManageModal data={data} />
      <ProjectMemberManageModal />
      <InviteProjectModal />
      <UpdateProjectModal />
      <LeaveProjectModal />
    </>
  );
}
