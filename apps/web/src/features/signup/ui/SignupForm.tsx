import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  checkValidation,
  clickedState,
  FORM,
  handleFormSubmit,
  validState,
} from '~/features/signup/model';
import type {
  formState,
  SignupInfo,
  SignupInfoProp,
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
  const [clicked, setClicked] = useState<formState>(clickedState);
  const [valid, setValid] = useState<formState>(validState);
  const schema = z.object({
    userId: z.string().min(1, '*'),
    username: z
      .string()
      .min(1, '*')
      .refine(() => clicked.username, {
        message: '*중복 확인 필요',
      })
      .refine(() => valid.username, { message: '*이미 사용중인 아이디입니다' }),
    email: z
      .string()
      .min(1, '*')
      .refine(() => clicked.email, {
        message: '*이메일 인증 필요',
      })
      .refine(() => valid.email, { message: '*코드가 틀렸습니다' }),
    password: z
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

  const isFormValid = (key: SignupInfoProp) => checkValidation(watch(key), key);

  const handleUsernameValidation = () => {
    setClicked((prev) => ({
      ...prev,
      username: true,
    }));
    setValid((prev) => ({ ...prev, username: true }));
    clearErrors('username');
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
    clearErrors('email');
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
      <FormUnit id={'PW'} errors={errors} register={register} />
      <FormSubmit />
    </form>
  );
}
