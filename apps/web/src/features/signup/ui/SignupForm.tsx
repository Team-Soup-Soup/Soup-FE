import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  checkValidation,
  FORM,
  USER,
  useSignupContext,
  useSignupHandlers,
  useSignupSchema,
} from '~/features/signup/model';
import type { SignupInfo, SignupItem } from '~/features/signup/types';
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
  const { clicked, setClicked, valid, setValid } = useSignupContext();
  const schema = useSignupSchema({ clicked, valid });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<SignupInfo>({
    resolver: zodResolver(schema),
    defaultValues: {
      [USER.NAME]: '',
      [USER.ID]: '',
      [USER.EMAIL]: '',
      [USER.PW]: '',
    },
  });
  const {
    handleUsernameValidation,
    handleEmailValidation,
    handleEmailCodeValidation,
    handleFormSubmit,
  } = useSignupHandlers({ setClicked, setValid, clearErrors, setError });

  const isFormValid = (key: SignupItem) => checkValidation(watch(key), key);

  const formProps = {
    errors: errors,
    valid: valid,
    register: register,
    isFormValid: isFormValid,
    watch: watch,
  };

  return (
    <form
      className="mt-30 flex flex-col gap-y-7 p-16 pt-0"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <FormUnit id="NAME" errors={errors} register={register} />
      <FormUnitWithButton
        id="ID"
        handler={handleUsernameValidation}
        {...formProps}
      />
      <div>
        <FormUnitWithButton
          id="EMAIL"
          handler={handleEmailValidation}
          {...formProps}
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
