import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import React from 'react';
import { Button } from '@soup/design-system';

export default function LogoutModal() {
  const { closeModal } = useModal({ key: MODAL.LOGOUT });
  const { isOpen } = useModalState({ key: MODAL.LOGOUT });

  const handleLogoutConfirm = () => {
    closeModal();
  };

  return (
    isOpen && (
      <Modal closeModal={closeModal}>
        <Modal.Body className="text-dark pt-[32px] font-light">
          <p>정말 로그아웃 하시겠습니까?</p>
          <div className="mt-auto flex justify-end gap-4">
            <Button
              className="w-[100px]"
              color="normal"
              onClick={handleLogoutConfirm}
            >
              네
            </Button>
            <Button className="w-[100px]" color="normal" onClick={closeModal}>
              아니요
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  );
}
