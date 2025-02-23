import { Button, Input } from '@soup/design-system';
import { handleButtonSubmit } from '../model';
import { useState } from 'react';
import { VerificationStatus } from '../types';

interface EmailVerificationProps {
  isValid: boolean;
  setState: React.Dispatch<React.SetStateAction<VerificationStatus>>;
}

export default function EmailValidation({ setState }: EmailVerificationProps) {
  const [value, setValue] = useState('');
  async function handleClick() {
    const status = await handleButtonSubmit(value);
    setState((prev) => {
      return { ...prev, isSubSubmitted: true, isEmailVerified: status };
    });
  }
  return (
    <div className="relative mt-1 flex w-full items-end">
      <Input
        id="emailVerification"
        placeholder="인증코드를 입력해주세요"
        className="flex-1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        color="normal"
        size="sm"
        className="ml-3 h-[39px]"
        onClick={handleClick}
      >
        인증 확인
      </Button>
    </div>
  );
}
