import React from 'react';

import { Button } from '@soup/design-system';
import { cn } from '@soup/utils';

import { FORM, USER } from '~/features/signup/model';
import type {
  FormState,
  FormUnitProps,
  SignupItem,
} from '~/features/signup/types';
import { FormInput } from '~/features/signup/ui';

interface ButtonedUnitProps extends FormUnitProps {
  valid: FormState;
  handler: () => void;
  isFormValid: (key: SignupItem) => boolean;
}

export default function FormUnitWithButton({
  id,
  errors,
  valid,
  register,
  handler,
  isFormValid,
}: ButtonedUnitProps) {
  const formId = USER[id] as 'username' | 'email';
  return (
    <div className="relative flex w-full items-end">
      <p
        className={cn(
          'font-light, absolute left-14 top-[1px] text-sm',
          valid[formId] ? 'text-point' : 'text-important',
        )}
      >
        {errors[USER[id]]
          ? errors[USER[id]]?.message
          : valid[formId] && '*인증 완료'}
      </p>
      <FormInput id={id} register={register} />
      <Button
        color="normal"
        size="sm"
        className="ml-3 h-[39px]"
        locked={!isFormValid(USER[id])}
        type="button"
        onClick={handler}
      >
        {FORM[id].button}
      </Button>
    </div>
  );
}
