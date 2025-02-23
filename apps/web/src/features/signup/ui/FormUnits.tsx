import { useState } from 'react';

import { Button } from '@soup/design-system';

import {
  FormInput,
  EmailValidation,
  StatusMessage,
} from '~/features/signup/ui';
import type {
  FormUnitProps,
  VerificationStatus,
} from '~/features/signup/types';
import {
  checkValidation,
  FORM,
  handleButtonSubmit,
  UserProperty,
} from '~/features/signup/model';

const Description = ({ content }: { content: string }) => (
  <p className="text-light mt-1 p-0 text-sm font-light">{content}</p>
);

export function FormUnitWithButton({ id, register, watch }: FormUnitProps) {
  const [vertStatus, setVerificationStatus] = useState<VerificationStatus>({
    /* 아이디와 이메일의 검증 상태 관리 */
    isMainSubmitted: false,
    isSubSubmitted: false,
    isIdVerified: false,
    isEmailVerified: false,
  });
  const fieldValue = watch!(UserProperty[id]);
  const isFieldFormatValid = fieldValue
    ? checkValidation(fieldValue, UserProperty[id]) // 프론트엔드 자체 검증 (아이디는 5자이상, 이메일은 이메일 형식)
    : false;
  const isFieldVerified =
    id === 'ID' ? vertStatus.isIdVerified : vertStatus.isEmailVerified;

  async function handleClick() {
    const status = await handleButtonSubmit(fieldValue);
    setVerificationStatus((prev) => {
      return { ...prev, isMainSubmitted: true, isIdVerified: status };
    });
  }

  return (
    <div>
      <div className="relative flex w-full items-end">
        <StatusMessage
          id={id}
          isFieldValid={isFieldFormatValid}
          verificationStatus={vertStatus}
        />
        <FormInput id={id} register={register} disabled={isFieldVerified} />
        <Button
          color="normal"
          size="sm"
          className="ml-3 h-[39px]"
          locked={!isFieldFormatValid || isFieldVerified}
          onClick={handleClick}
        >
          {FORM[id].button}
        </Button>
      </div>
      {UserProperty[id] === 'email' &&
        vertStatus.isMainSubmitted &&
        !vertStatus.isEmailVerified && (
          <EmailValidation
            isValid={isFieldVerified}
            setState={setVerificationStatus}
          />
        )}
      <Description content={FORM[id].description || ''} />
    </div>
  );
}

export function FormUnitWithoutButton({ id, register }: FormUnitProps) {
  return (
    <div>
      <FormInput id={id} register={register} />
      <Description content={FORM[id].description || ''} />
    </div>
  );
}
