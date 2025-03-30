import { CREATE_PROJECT_MAX_LENGTH, MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import React, { useEffect, useState } from 'react';
import { Button, Input } from '@soup/design-system';

export default function CreateProjectModal() {
  const { closeModal } = useModal();
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

  const handleCreateButtonClick = () => {
    closeModal(MODAL.CREATE_PROJECT);
    setProjectName('');
    setProjectDescription('');
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
      <Modal size="sm" title="프로젝트 생성" modalKey={MODAL.CREATE_PROJECT}>
        <Modal.Header title="프로젝트 생성" />
        <Modal.Body className="flex flex-col gap-8 font-light">
          <div className="flex flex-col gap-2">
            <p>프로젝트 이름</p>
            <div>
              <Input
                id="projectName"
                name="projectName"
                value={projectName}
                maxLength={CREATE_PROJECT_MAX_LENGTH.NAME}
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
                maxLength={CREATE_PROJECT_MAX_LENGTH.DESCRIPTION}
                onChange={handleInputChange}
                placeholder="한 줄 소개를 적어주세요."
                inputClassName="bg-lock h-[42px] w-[520px] border-none"
              />
            </div>
          </div>
          <Modal.Footer className="justify-end">
            <Button
              size="lg"
              color="normal"
              onClick={handleCreateButtonClick}
              locked={!isValidProject}
            >
              생성하기
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    )
  );
}
