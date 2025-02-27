import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  checkValidation,
  clickedState,
  FORM,
  handleFormSubmit,
  USER,
  validState,
} from '~/features/signup/model';
import type {
  FormState,
  SignupInfo,
  SignupItem,
} from '~/features/signup/types';
import {
  FormSubmit,
  FormUnit,
  EmailVerification,
  FormUnitWithButton,
} from '~/features/signup/ui';

const Description = ({ content }: { content: string }) => (
  <p className="text-light mt-1 p-0 text-sm font-light">{content}</p>
);

export default function SignupForm() {
  const [clicked, setClicked] = useState<FormState>(clickedState);
  const [valid, setValid] = useState<FormState>(validState);
  const schema = z.object({
    [USER.NAME]: z.string().min(1, '*'),
    [USER.ID]: z
      .string()
      .min(1, '*')
      .refine(() => clicked[USER.ID], {
        message: '*중복 확인 필요',
      })
      .refine(() => valid[USER.ID], { message: '*이미 사용중인 아이디입니다' }),
    [USER.EMAIL]: z
      .string()
      .min(1, '*')
      .refine(() => clicked.email, {
        message: '*이메일 인증 필요',
      })
      .refine(() => valid.email, { message: '*코드가 틀렸습니다' }),
    [USER.PW]: z
      .string()
      .min(8, '*')
      .refine(
        (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password),
        {
          message: '*올바르지 않은 비밀번호',
        },
      ),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<SignupInfo>({
    resolver: zodResolver(schema),
  });

  const isFormValid = (key: SignupItem) => checkValidation(watch(key), key);

  const handleUsernameValidation = () => {
    setClicked((prev) => ({
      ...prev,
      username: true,
    }));
    setValid((prev) => ({ ...prev, username: true }));
    clearErrors(USER.ID);
  };

  const handleEmailValidation = () => {
    setClicked((prev) => ({
      ...prev,
      email: true,
    }));
  };

  const handleEmailCodeValidation = () => {
    setValid((prev) => ({
      ...prev,
      email: true,
    }));
    clearErrors(USER.EMAIL);
  };

  return (
    <form
      className="mt-30 flex flex-col gap-y-7 p-16 pt-0"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <FormUnit id="NAME" errors={errors} register={register} />
      <FormUnitWithButton
        id="ID"
        errors={errors}
        valid={valid}
        register={register}
        handler={handleUsernameValidation}
        isFormValid={isFormValid}
      />
      <div>
        <FormUnitWithButton
          id="EMAIL"
          errors={errors}
          valid={valid}
          register={register}
          handler={handleEmailValidation}
          isFormValid={isFormValid}
        />
        {clicked.email && !valid.email && (
          <EmailVerification handler={handleEmailCodeValidation} />
        )}
        <Description content={FORM.EMAIL.description || ''} />
      </div>
      <FormUnit id="PW" errors={errors} register={register} />
      <FormSubmit />
    </form>
  );
}
