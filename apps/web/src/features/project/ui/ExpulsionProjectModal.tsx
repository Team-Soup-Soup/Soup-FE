import React from 'react';

import { Button } from '@soup/design-system';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';

interface ExpulsionProjectModalProps {
  name: string;
}

export default function ExpulsionProjectModal({
  name,
}: ExpulsionProjectModalProps) {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.EXPULSION_PROJECT });

  return (
    isOpen && (
      <Modal
        size="sm"
        modalKey={MODAL.EXPULSION_PROJECT}
        className="max-h-[200px]"
      >
        <Modal.Body className="h-full justify-center gap-y-20 font-light">
          <p>'{name}'님을 정말 퇴출 시키겠습니까?</p>
          <Modal.Footer className="mt-0 flex justify-end gap-4">
            <Button
              className="w-[100px]"
              color="normal"
              onClick={() => closeModal(MODAL.EXPULSION_PROJECT)}
            >
              네
            </Button>
            <Button
              className="w-[100px]"
              color="normal"
              onClick={() => closeModal(MODAL.EXPULSION_PROJECT)}
            >
              아니요
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    )
  );
}
