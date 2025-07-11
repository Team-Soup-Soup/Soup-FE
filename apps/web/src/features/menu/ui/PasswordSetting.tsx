import { Input } from '@soup/design-system';
import React, { useCallback, useImperativeHandle, useState } from 'react';
import type { PasswordSettingItem } from '~/shared/types';
import { useForm } from 'react-hook-form';
import { PASSWORD, SETTING_MIN_LENGTH } from '~/shared/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@soup/utils';
import { useSubmitNewPassword } from '../api';

interface PasswordSettingProps {
  ref: React.Ref<{
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    isValid: boolean;
  }>;
}

const schema = z
  .object({
    [PASSWORD.NOW_PASSWORD]: z.string().min(1, '현재 비밀번호를 입력해주세요'),
    [PASSWORD.NEW_PASSWORD]: z
      .string()
      .min(SETTING_MIN_LENGTH.PASSWORD, '올바르지 못한 비밀번호예요')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        '올바르지 못한 비밀번호예요',
      ),
    [PASSWORD.CHECK_PASSWORD]: z.string().min(SETTING_MIN_LENGTH.PASSWORD),
  })
  .refine(
    (data) => {
      return (
        !data[PASSWORD.CHECK_PASSWORD] ||
        data[PASSWORD.NEW_PASSWORD] === data[PASSWORD.CHECK_PASSWORD]
      );
    },
    {
      message: '비밀번호가 일치하지 않아요',
      path: [PASSWORD.NEW_PASSWORD],
    },
  );

export default function PasswordSetting({ ref }: PasswordSettingProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { mutate: submitNewPassword } = useSubmitNewPassword();
  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined,
  );

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit(onSubmit),
    isValid,
  }));

  const onSubmit = useCallback(
    (data: PasswordSettingItem) => {
      submitNewPassword(
        {
          currentPassword: data.nowPassword,
          newPassword: data.newPassword,
        },
        {
          onError: () => {
            reset();
            setErrorMessage('현재 비밀번호가 일치하지 않아요');
          },
          onSuccess: () => {
            reset();
            setErrorMessage(undefined);
          },
        },
      );
    },
    [reset, submitNewPassword],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[8px]">
            <Input
              id={PASSWORD.NOW_PASSWORD}
              label="현재 비밀번호"
              errorMessage={errors.nowPassword?.message || errorMessage}
              placeholder="현재 비밀번호를 입력해주세요"
              inputClassName="bg-lock border-none text-md px-[30px]"
              showPasswordButton
              {...register(PASSWORD.NOW_PASSWORD)}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Input
              id={PASSWORD.NEW_PASSWORD}
              label="새 비밀번호"
              errorMessage={errors.newPassword?.message}
              placeholder="새 비밀번호를 입력해주세요"
              inputClassName="bg-lock border-none text-md px-[30px]"
              showPasswordButton
              {...register(PASSWORD.NEW_PASSWORD)}
            />
            <Input
              id={PASSWORD.CHECK_PASSWORD}
              placeholder="새 비밀번호를 다시 입력해주세요"
              inputClassName="bg-lock border-none text-md px-[30px]"
              showPasswordButton
              {...register(PASSWORD.CHECK_PASSWORD)}
            />
            <p className={cn('text-light text-start text-sm font-light')}>
              영어 + 특수문자 + 숫자 조합으로 8자 이상 작성해주세요
            </p>
          </div>
        </div>
        <button type="submit" className="hidden" disabled={!isValid} />
      </div>
    </form>
  );
}
