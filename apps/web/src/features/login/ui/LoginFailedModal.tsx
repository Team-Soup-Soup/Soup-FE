import React from 'react';
import { useAtomValue } from 'jotai';

import { Button } from '@soup/design-system';

import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import { MODAL } from '~/shared/constants';

import { loginErrorAtom } from '~/features/login/model';

export default function LoginFailedModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.LOGIN_FAILED });
  const { wrongCnt, wrongType } = useAtomValue(loginErrorAtom);

  return (
    isOpen && (
      <Modal
        size="sm"
        modalKey={MODAL.LOGIN_FAILED}
        coloredBg={false}
        className="flex max-h-[200px]"
      >
        <Modal.Body className="min-h-full justify-center font-light">
          <Modal.Header title={`로그인 실패 ${wrongCnt}/5`} />
          <u>잘못된 {wrongType}</u>
          <p>4회 이상 추가 실패 시 30분 잠금</p>
          <Modal.Footer className="m-0 flex justify-end">
            <Button
              className="w-[100px]"
              color="normal"
              onClick={() => closeModal(MODAL.LOGIN_FAILED)}
            >
              확인
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    )
  );
}
