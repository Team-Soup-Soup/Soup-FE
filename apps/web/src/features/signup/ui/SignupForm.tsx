import React from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  checkValidation,
  FORM,
  handleFormSubmit,
  USER,
  useSignupContext,
} from '~/features/signup/model';
import type { SignupInfo, SignupItem } from '~/features/signup/types';
import {
  FormSubmit,
  FormUnit,
  EmailVerification,
  FormUnitWithButton,
} from '~/features/signup/ui';
import {
  fetchEmailCode,
  fetchEmailCodeValidation,
  fetchIdValidation,
} from '~/features/signup/api';

const Description = ({ content }: { content: string }) => (
  <p className="text-light mt-1 p-0 text-sm font-light">{content}</p>
);

export default function SignupForm() {
  const { clicked, setClicked, valid, setValid } = useSignupContext();
  const authId = 0; /**이메일 인증 백엔드 미구현으로 인해 샘플 응답값을 생성했습니다. */
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
      .refine(() => clicked[USER.EMAIL], {
        message: '*이메일 인증 필요',
      })
      .refine(() => valid[USER.EMAIL], { message: '*코드가 틀렸습니다' }),
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
    setError,
  } = useForm<SignupInfo>({
    resolver: zodResolver(schema),
  });

  const isFormValid = (key: SignupItem) => checkValidation(watch(key), key);

  const handleUsernameValidation = async (target: string) => {
    setClicked((prev) => ({
      ...prev,
      [USER.ID]: true,
    }));
    fetchIdValidation(target).then((isValid) => {
      setValid((prev) => ({ ...prev, [USER.ID]: isValid }));
      if (isValid) clearErrors(USER.ID);
      else setError(USER.ID, { message: '*이미 사용중인 아이디입니다' });
    });
  };

  const handleEmailValidation = async (email: string) => {
    setClicked((prev) => ({
      ...prev,
      [USER.EMAIL]: true,
    }));
    fetchEmailCode(email).then((response) => console.log(response));
  };

  const handleEmailCodeValidation = (authCode: string) => {
    fetchEmailCodeValidation(authId, authCode)
      .then((isValid) => {
        setValid((prev) => ({ ...prev, [USER.EMAIL]: isValid }));
        if (isValid) {
          clearErrors(USER.EMAIL);
          setValid((prev) => ({
            ...prev,
            [USER.EMAIL]: true,
          }));
        } else setError(USER.EMAIL, { message: '*코드가 틀렸습니다' });
      })
      .catch(() =>
        setError(USER.EMAIL, {
          message: '*인증에 실패했어요. 다시 시도해 주세요.',
        }),
      );
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
        watch={watch}
      />
      <div>
        <FormUnitWithButton
          id="EMAIL"
          errors={errors}
          valid={valid}
          register={register}
          handler={handleEmailValidation}
          isFormValid={isFormValid}
          watch={watch}
        />
        {clicked[USER.EMAIL] && !valid[USER.EMAIL] && (
          <EmailVerification handler={handleEmailCodeValidation} />
        )}
        <Description content={FORM.EMAIL.description || ''} />
      </div>
      <FormUnit id="PW" errors={errors} register={register} />
      <FormSubmit />
    </form>
  );
}
