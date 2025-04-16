import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { z, ZodError } from 'zod';

import { useModal } from '~/shared/hooks';
import { MODAL } from '~/shared/constants';
import { submitUserInvitation } from '~/features/project/api';

export default function useInviteProject() {
  const { projectId } = useParams();
  const { closeModal } = useModal();

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

  const handleSubmit = async () => {
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
      console.log(inviteEmails, projectId);
      await submitUserInvitation(inviteEmails, Number(projectId));
      closeModal(MODAL.INVITE_PROJECT);
      setInviteEmails(['']);
    }
  };
  return {
    handleChange,
    handleEmailInput,
    handleSubmit,
    emailErrors,
    inviteEmails,
  };
}
