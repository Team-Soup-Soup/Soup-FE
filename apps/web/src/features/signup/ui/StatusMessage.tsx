import { cn } from '@soup/utils';
import type { FormItem, VerificationStatus } from '~/features/signup/types';

const getStatusText = (
  clicked: boolean,
  validStatus: boolean,
  id: FormItem,
) => {
  if (id === 'EMAIL') {
    if (!clicked) return;
    return validStatus ? '*인증 완료' : '*코드가 틀렸습니다';
  }
  if (id === 'ID') {
    if (!clicked) return '*아이디 중복 확인 필요';
    return validStatus ? '*사용 가능' : '*아이디 중복 확인';
  }
};

export default function StatusMessage({
  id,
  isFieldValid,
  verificationStatus,
}: {
  id: string;
  isFieldValid: boolean;
  verificationStatus: VerificationStatus;
}) {
  const { isIdVerified, isEmailVerified, isMainSubmitted, isSubSubmitted } =
    verificationStatus;

  const messageByType = {
    ID: getStatusText(isMainSubmitted, isIdVerified, 'ID'),
    EMAIL: getStatusText(isSubSubmitted, isEmailVerified, 'EMAIL'),
  };

  return (
    <p
      className={cn('absolute left-14 top-[1px] text-sm font-light', {
        hidden: !isFieldValid,
        'text-point': isIdVerified || isEmailVerified,
        'text-important': !isIdVerified && !isEmailVerified,
      })}
    >
      {messageByType[id as keyof typeof messageByType] ?? null}
    </p>
  );
}
