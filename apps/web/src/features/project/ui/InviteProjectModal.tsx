import React from 'react';

import { Input } from '@soup/design-system';

import { MODAL } from '~/shared/constants';
import { useModalState } from '~/shared/hooks';
import { Button, IconButton, Modal } from '~/shared/ui';

import { useInviteProject } from '~/features/project/model';

export default function InviteProjectModal() {
  const { isOpen } = useModalState({ key: MODAL.INVITE_PROJECT });
  const {
    inviteEmails,
    handleChange,
    handleEmailInput,
    handleSubmit,
    emailErrors,
  } = useInviteProject();

  return (
    isOpen && (
      <Modal size="md" modalKey={MODAL.INVITE_PROJECT}>
        <Modal.Header title="초대하기" intent="shareLink" />
        <Modal.Body className="gap-[8px]">
          <p className="font-light">이메일</p>
          <div className="scrollbar-hide flex flex-col gap-[8px] overflow-scroll">
            {inviteEmails.map((email, index) => (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2" key={index}>
                  <Input
                    className="w-full"
                    inputClassName="bg-main-2-1 border-main-2-1 focus:border-main-2-1"
                    key={index}
                    value={email}
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                  <IconButton
                    name={index == inviteEmails.length - 1 ? 'plus' : 'minus'}
                    icon={
                      index == inviteEmails.length - 1
                        ? '/icons/plus.svg'
                        : '/icons/minus.svg'
                    }
                    onClick={() => handleEmailInput(index)}
                  />
                </div>
                {emailErrors[index] && (
                  <p className="text-error text-sm font-light">
                    {emailErrors[index]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="mt-8 flex justify-end">
          <Button
            size="lg"
            type="submit"
            status="normal"
            intent="shareLink"
            onClick={handleSubmit}
            disabled={inviteEmails.length === 0}
          >
            전송하기
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
