import React from 'react';

import { Button } from '@soup/design-system';

import { useModal, useModalKeyState, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import { DELETE_MODAL_KEYS, DELETE_MODAL } from '~/shared/constants';
import { DeleteModalItem } from '~/shared/types';

interface DeleteModalProps {
  deleteHandler?: Partial<Record<DeleteModalItem, () => void>>;
}

export default function DeleteCommentModal({
  deleteHandler,
}: DeleteModalProps) {
  const { closeModal } = useModal();
  const openedModal = useModalKeyState();

  const modalKey = DELETE_MODAL_KEYS.filter((modal) =>
    openedModal.includes(modal),
  )[0] as DeleteModalItem;

  const { isOpen } = useModalState({ key: modalKey });

  const handleDelete = () => {
    if (deleteHandler && deleteHandler[modalKey]) deleteHandler[modalKey]();
    closeModal(modalKey);
  };

  return (
    isOpen && (
      <Modal
        size="sm"
        modalKey={modalKey}
        coloredBg={false}
        className="max-h-[200px]"
      >
        <Modal.Body className="h-full justify-center gap-y-20 font-light">
          <p>정말 {DELETE_MODAL[modalKey]}을 삭제 하시겠습니까?</p>
          <Modal.Footer className="mt-0 flex justify-end gap-4">
            <Button className="w-[100px]" color="normal" onClick={handleDelete}>
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
        </Modal.Body>
      </Modal>
    )
  );
}
