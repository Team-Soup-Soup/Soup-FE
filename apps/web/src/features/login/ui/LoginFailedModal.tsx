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
  const { wrongCnt } = useAtomValue(loginErrorAtom);

  return (
    isOpen && (
      <Modal
        size="sm"
        modalKey={MODAL.LOGIN_FAILED}
        coloredBg={false}
        className="flex max-h-[200px]"
        intent="loginFailed"
      >
        <Modal.Body className="font-light">
          <Modal.Header
            title={`로그인 실패 ${wrongCnt}/5`}
            intent="loginFailed"
          />
          <u>잘못된 아이디 또는 비밀번호</u>
          <p>4회 이상 추가 실패 시 30분 잠금</p>
        </Modal.Body>
        <Modal.Footer className="m-0 flex justify-end">
          <Button
            className="w-[100px]"
            color="normal"
            onClick={() => closeModal(MODAL.LOGIN_FAILED)}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
