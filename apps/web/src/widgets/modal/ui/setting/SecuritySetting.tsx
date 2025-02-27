import { Input } from '@soup/design-system';
import { useForm } from 'react-hook-form';
import React, { useCallback, useImperativeHandle } from 'react';
import { cn } from '@soup/utils';
import { SECURITY } from '~/shared/constants';
import type { SecuritySettingItem } from '~/shared/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface SecuritySettingProps {
  ref: React.Ref<{
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  }>;
}

const schema = z.object({
  [SECURITY.NOW_PASSWORD]: z.string().min(1, '현재 비밀번호를 입력해주세요'),
  [SECURITY.NEW_PASSWORD]: z
    .string()
    .min(8)
    .refine((password) =>
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password),
    ),
});

export default function SecuritySetting({ ref }: SecuritySettingProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit(onSubmit),
  }));

  const onSubmit = useCallback(
    (data: SecuritySettingItem) => {
      console.log(data);
      reset();
    },
    [reset],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[62px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="id">아이디</label>
          <p
            id="id"
            className="border-main-board-border text-light bg-main-board size-full rounded-[10px] border p-[10px] font-light"
          >
            userId
          </p>
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[8px]">
            <Input
              id={SECURITY.NOW_PASSWORD}
              label="현재 비밀번호"
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              {...register(SECURITY.NOW_PASSWORD)}
            />
            {errors.nowPassword && (
              <p className="text-important text-end text-sm">
                {errors.nowPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-[8px]">
            <Input
              id={SECURITY.NEW_PASSWORD}
              label="새 비밀번호"
              type="password"
              placeholder="새 비밀번호를 입력해주세요"
              {...register(SECURITY.NEW_PASSWORD)}
            />
            <p
              className={cn(
                'text-light text-end text-sm font-light',
                errors.newPassword && 'text-important',
              )}
            >
              영어 + 특수문자 + 숫자 조합으로 8자 이상 작성해주세요
            </p>
          </div>
        </div>
        <button type="submit" className="hidden" disabled={!isValid} />
      </div>
    </form>
  );
}
