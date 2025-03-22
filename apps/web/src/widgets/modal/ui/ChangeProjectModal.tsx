import React, { useState } from 'react';

import { Button, Input } from '@soup/design-system';

import { CREATE_PROJECT_MAX_LENGTH, MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';

export default function ChangeProjectModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.CHANGE_PROJECT });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);

  const handleSave = () => {
    if (
      name.length > 0 &&
      name.length <= CREATE_PROJECT_MAX_LENGTH.NAME &&
      description.length > 0 &&
      description.length <= CREATE_PROJECT_MAX_LENGTH.DESCRIPTION
    ) {
      closeModal(MODAL.CHANGE_PROJECT);
      setName('');
      setDescription('');
    } else {
      setError(true);
    }
  };

  return (
    isOpen && (
      <Modal modalKey={MODAL.CHANGE_PROJECT}>
        <Modal.Header title="프로젝트 이름/설명 변경하기" />
        <Modal.Body className="gap-[12px]">
          <Input
            id="name"
            name="name"
            value={name}
            maxLength={CREATE_PROJECT_MAX_LENGTH.NAME}
            onChange={(e) => setName(e.target.value)}
            placeholder="프로젝트 이름을 입력해주세요."
            inputClassName="bg-lock border-none"
            label="프로젝트 이름"
          />
          <Input
            id="description"
            name="description"
            value={description}
            maxLength={CREATE_PROJECT_MAX_LENGTH.DESCRIPTION}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="한 줄 소개를 적어주세요."
            inputClassName="bg-lock border-none"
            label="프로젝트 한줄 소개"
          />
          {error && (
            <p className="text-important text-sm">글자수를 확인해주세요</p>
          )}
        </Modal.Body>
        <Modal.Footer className="mt-[44px] flex justify-end">
          <Button
            type="submit"
            className="w-[100px]"
            color="normal"
            onClick={handleSave}
          >
            저장하기
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
