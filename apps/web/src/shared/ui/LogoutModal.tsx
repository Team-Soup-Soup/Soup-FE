import React from 'react';

import { Button } from '@soup/design-system';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';

export default function LogoutModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.LOGOUT });

  return (
    isOpen && (
      <Modal size="sm" modalKey={MODAL.LOGOUT} className="max-h-[200px]">
        <Modal.Body className="h-full justify-center gap-y-20 font-light">
          <p>정말 로그아웃 하시겠습니까?</p>
          <Modal.Footer className="mt-0 flex justify-end gap-4">
            <Button
              className="w-[100px]"
              color="normal"
              onClick={() => closeModal(MODAL.LOGOUT)}
            >
              네
            </Button>
            <Button
              className="w-[100px]"
              color="normal"
              onClick={() => closeModal(MODAL.LOGOUT)}
            >
              아니요
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    )
  );
}
