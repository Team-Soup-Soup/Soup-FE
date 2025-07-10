import React from 'react';

import { Button } from '@soup/design-system';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import { logout } from '~/shared/utils';

export default function LogoutModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.LOGOUT });

  return (
    isOpen && (
      <Modal
        coloredBg={false}
        size="sm"
        modalKey={MODAL.LOGOUT}
        className="max-h-[200px]"
      >
        <Modal.Body className="justify-between font-light">
          <p>정말 로그아웃 하시겠습니까?</p>
          <Modal.Footer className="mt-0 flex justify-end gap-4">
            <Button
              className="w-[100px]"
              color="normal"
              onClick={() => logout()}
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
