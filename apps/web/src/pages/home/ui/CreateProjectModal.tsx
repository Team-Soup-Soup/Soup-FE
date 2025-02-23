import { CREATE_PROJECT_MAX_LENGTH, MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import React, { useEffect, useState } from 'react';
import { Button, Input } from '@soup/design-system';

export default function CreateProjectModal() {
  const { closeModal } = useModal({ key: MODAL.CREATE_PROJECT });
  const { isOpen } = useModalState({ key: MODAL.CREATE_PROJECT });
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isValidProject, setIsValidProject] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'projectName':
        setProjectName(e.target.value);
        break;
      case 'projectDescription':
        setProjectDescription(e.target.value);
        break;
    }
  };

  useEffect(() => {
    setIsValidProject(
      projectName.length > 0 &&
        projectName.length <= CREATE_PROJECT_MAX_LENGTH.NAME &&
        projectDescription.length > 0 &&
        projectDescription.length <= CREATE_PROJECT_MAX_LENGTH.DESCRIPTION,
    );
  }, [projectDescription, projectName]);

  return (
    isOpen && (
      <Modal title="프로젝트 생성" closeModal={closeModal}>
        <Modal.Body className="text-dark flex flex-col gap-8 font-light">
          <div className="flex flex-col gap-2">
            <p>프로젝트 이름</p>
            <div>
              <Input
                id="projectName"
                name="projectName"
                value={projectName}
                length={`${projectName.length}/${CREATE_PROJECT_MAX_LENGTH.NAME}자`}
                onChange={handleInputChange}
                placeholder="프로젝트 이름을 입력해주세요."
                inputClassName="bg-lock h-[42px] w-[520px] border-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>프로젝트 한줄 소개</p>
            <div>
              <Input
                id="projectDescription"
                name="projectDescription"
                value={projectDescription}
                length={`${projectDescription.length}/${CREATE_PROJECT_MAX_LENGTH.DESCRIPTION}자`}
                onChange={handleInputChange}
                placeholder="한 줄 소개를 적어주세요."
                inputClassName="bg-lock h-[42px] w-[520px] border-none"
              />
            </div>
          </div>
          <div className="mt-[24px] flex justify-end">
            <Button
              size="lg"
              color="normal"
              onClick={closeModal}
              locked={!isValidProject}
            >
              생성하기
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  );
}
