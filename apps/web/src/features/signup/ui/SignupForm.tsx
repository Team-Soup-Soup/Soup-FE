import React, { useState } from 'react';

import { Button, Checkbox, Input } from '@soup/design-system';

import { FORM } from '~/features/signup/model';
import { type FormItem } from '~/features/signup/types';

export default function SignupForm() {
  return (
    <div className="mt-30 flex flex-col gap-y-7 p-16 pt-0">
      {(Object.keys(FORM) as Array<keyof typeof FORM>).map((key) => (
        <FormUnit key={key} button={FORM[key].button} id={key} />
      ))}
      <FormSubmit />
    </div>
  );
}

interface FormUnitProps {
  id: FormItem;
  button?: string | null;
}

const Description = ({ content }: { content: string }) => (
  <p className="text-light mt-1 p-0 text-sm font-light">{content}</p>
);

function FormUnit({ id, button }: FormUnitProps) {
  if (button)
    return (
      <div>
        <div className="flex w-full items-end">
          <Input
            label={FORM[id].label}
            placeholder={FORM[id].placeholder}
            className="flex-1"
          />
          <Button color="normal" size="sm" className="ml-3 h-[39px]">
            {FORM[id].button}
          </Button>
        </div>
        <Description content={FORM[id].description || ''} />
      </div>
    );
  return (
    <div>
      <Input label={FORM[id].label} placeholder={FORM[id].placeholder} />
      <Description content={FORM[id].description || ''} />
    </div>
  );
}

function FormSubmit() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="absolute bottom-0 left-0 w-full p-16">
      <Checkbox
        id="signup-agreement"
        className="mb-4"
        onChange={() => setChecked((prev) => !prev)}
        label={
          <>
            <span className="text-point">개인정보 처리방침</span>에 따른
            개인정보 수집 및 활용에 동의합니다. (필수)
          </>
        }
      />
      <button
        disabled={!checked} // 유효성 검사도 추가 예정
        className="bg-point hover:bg-point-dark auth-button disabled:bg-main-board-border font-semibold text-white disabled:pointer-events-none"
      >
        회원가입 하기
      </button>
    </div>
  );
}
