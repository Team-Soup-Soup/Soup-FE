import React from 'react';
import { useForm } from 'react-hook-form';

import { FORM, FORM_LABELS, handleFormSubmit } from '~/features/signup/model';

import type { FormUnitProps, SignupInfo } from '~/features/signup/types';
import {
  FormSubmit,
  FormUnitWithButton,
  FormUnitWithoutButton,
} from '~/features/signup/ui';

export default function SignupForm() {
  const { register, handleSubmit, watch } = useForm<SignupInfo>();

  return (
    <form
      className="mt-30 flex flex-col gap-y-7 p-16 pt-0"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {FORM_LABELS.map((key) => (
        <FormUnit
          key={key}
          button={typeof FORM[key].button === 'string'} // 버튼의 존재 여부를 확인해요
          id={key}
          register={register}
          watch={watch}
        />
      ))}
      <FormSubmit />
    </form>
  );
}

function FormUnit({ id, button, register, watch }: FormUnitProps) {
  const props = { id: id, register: register };
  return button ? (
    <FormUnitWithButton {...props} watch={watch} />
  ) : (
    <FormUnitWithoutButton {...props} />
  );
}
