import React, { useState } from 'react';

import { Button, Input } from '@soup/design-system';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';

export default function InviteProjectModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.INVITE_PROJECT });

  const [inviteEmails, setInviteEmails] = useState<string[]>(['', '', '', '']);
  const handleChange = (index: number, value: string) => {
    setInviteEmails((prev: Array<string>) => {
      const newEmails = [...prev];
      newEmails[index] = value;
      return newEmails;
    });
  };

  return (
    isOpen && (
      <Modal modalKey={MODAL.INVITE_PROJECT}>
        <Modal.Header title="초대하기" />
        <Modal.Body className="gap-[8px]">
          <p className="font-light">이메일</p>
          <div className="flex flex-col gap-[8px]">
            {inviteEmails.map((email, index) => (
              <Input
                key={index}
                value={email}
                placeholder="이메일을 입력해주세요."
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="mt-8 flex justify-end">
          <Button
            className="w-[100px]"
            color="normal"
            onClick={() => closeModal(MODAL.INVITE_PROJECT)}
          >
            전송하기
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
