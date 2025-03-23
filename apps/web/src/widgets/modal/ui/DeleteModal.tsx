import React from 'react';

import { Button } from '@soup/design-system';

import { useModal, useModalKeyState, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import { DELETE_MODAL_KEYS, DELETE_MODAL } from '~/widgets/modal/model';
import { DeleteModalItem } from '~/widgets/modal/types';

export default function DeleteCommentModal() {
  const { closeModal } = useModal();
  const openedModal = useModalKeyState();
  const modalKey = DELETE_MODAL_KEYS.filter((modal) =>
    openedModal.includes(modal),
  )[0] as DeleteModalItem;

  const { isOpen } = useModalState({ key: modalKey });

  return (
    isOpen && (
      <Modal modalKey={modalKey} coloredBg={false}>
        <Modal.Body className="pt-[32px] font-light">
          <p>정말 {DELETE_MODAL[modalKey]}을 삭제 하시겠습니까?</p>
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
