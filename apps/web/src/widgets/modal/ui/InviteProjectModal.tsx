import React, { useState } from 'react';

import { Button, Input } from '@soup/design-system';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { IconButton, Modal } from '~/shared/ui';
import { z, ZodError } from 'zod';

export default function InviteProjectModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.INVITE_PROJECT });
  const [inviteEmails, setInviteEmails] = useState<string[]>(['']);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);

  const schema = z.string().email({ message: '유효한 이메일을 입력해주세요.' });

  const handleChange = (index: number, value: string) => {
    setInviteEmails((prev: Array<string>) => {
      const newEmails = [...prev];
      newEmails[index] = value;
      return newEmails;
    });
  };

  const handleEmailInput = (index: number) => {
    if (index == inviteEmails.length - 1) {
      setInviteEmails((prev) => [...prev, '']);
    } else {
      setInviteEmails((prev) => {
        const newEmails = [...prev];
        newEmails.splice(index, 1);
        return newEmails;
      });
    }
  };

  const handleSubmit = () => {
    const errors = [''];

    inviteEmails.forEach((email, index) => {
      if (email.trim() === '') {
        errors[index] = '';
      } else {
        try {
          schema.parse(email);
          errors[index] = '';
        } catch (err) {
          if (err instanceof ZodError) {
            errors[index] = err.errors[0].message;
          }
        }
      }
    });

    setEmailErrors(errors);

    if (errors.every((error) => error === '')) {
      closeModal(MODAL.INVITE_PROJECT);
      setInviteEmails(['']);
    }
  };

  return (
    isOpen && (
      <Modal modalKey={MODAL.INVITE_PROJECT}>
        <Modal.Header title="초대하기" />
        <Modal.Body className="gap-[8px]">
          <p className="font-light">이메일</p>
          <div className="scrollbar-hide flex h-60 flex-col gap-[8px] overflow-scroll">
            {inviteEmails.map((email, index) => (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2" key={index}>
                  <Input
                    className="w-full"
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
            type="submit"
            className="w-[100px]"
            color="normal"
            onClick={handleSubmit}
          >
            전송하기
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
