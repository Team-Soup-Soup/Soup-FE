import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import React from 'react';
import { Button } from '@soup/design-system';

export default function DeletePostModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.DELETE_POST });

  return (
    isOpen && (
      <Modal modalKey={MODAL.DELETE_POST} coloredBg={false}>
        <Modal.Body className="pt-[32px] font-light">
          <p>정말 게시글을 삭제 하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer className="mt-0 flex justify-end gap-4">
          <Button
            className="w-[100px]"
            color="normal"
            onClick={() => closeModal(MODAL.DELETE_POST)}
          >
            네
          </Button>
          <Button
            className="w-[100px]"
            color="normal"
            onClick={() => closeModal(MODAL.DELETE_POST)}
          >
            아니요
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
