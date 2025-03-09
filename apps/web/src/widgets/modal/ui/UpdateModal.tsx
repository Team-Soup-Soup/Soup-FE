import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import React from 'react';
import { Button } from '@soup/design-system';

export default function UpdateModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.UPDATE });

  return (
    isOpen && (
      <Modal modalKey={MODAL.UPDATE}>
        <Modal.Body className="pt-[32px] font-light">
          <p>변경한 정보로 업데이트 되었습니다.</p>
        </Modal.Body>
        <Modal.Footer className="mt-0 flex justify-end gap-4">
          <Button
            className="w-[100px]"
            color="normal"
            onClick={() => closeModal(MODAL.UPDATE)}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
