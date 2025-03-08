import React from 'react';

import { Button } from '@soup/design-system';

import { MODAL } from '~/shared/constants';
import { useModal, useModalKeyState, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import { DELETE_MODAL_TEXT } from '~/widgets/modal/model';

export default function DeleteCommentModal() {
  const { closeModal } = useModal();
  const openedModal = useModalKeyState();
  const modalKey = openedModal.includes(MODAL.DELETE_COMMENT)
    ? MODAL.DELETE_COMMENT
    : MODAL.DELETE_POST;
  const { isOpen } = useModalState({ key: modalKey });

  return (
    isOpen && (
      <Modal modalKey={modalKey} coloredBg={false}>
        <Modal.Body className="pt-[32px] font-light">
          <p>정말 {DELETE_MODAL_TEXT[modalKey]}을 삭제 하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer className="mt-0 flex justify-end gap-4">
          <Button
            className="w-[100px]"
            color="normal"
            onClick={() => closeModal(modalKey)}
          >
            네
          </Button>
          <Button
            className="w-[100px]"
            color="normal"
            onClick={() => closeModal(modalKey)}
          >
            아니요
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
