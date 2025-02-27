import { Input } from '@soup/design-system';
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { cn } from '@soup/utils';
import { SETTING_MIN_LENGTH } from '~/shared/constants';
import type { SecuritySettingItem } from '~/shared/types';

interface SecuritySettingProps {
  isClickedSaveButton: boolean;
  setIsClickedSaveButton: (state: boolean) => void;
}

export default function SecuritySetting({
  isClickedSaveButton,
  setIsClickedSaveButton,
}: SecuritySettingProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      nowPassword: '',
      newPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: SecuritySettingItem) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    if (isClickedSaveButton) {
      if (isValid) {
        handleSubmit(onSubmit)();
      } else {
        setIsClickedSaveButton(false);
      }
    }
  }, [isClickedSaveButton]);

  return (
    <form>
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
              id="nowPassword"
              label="현재 비밀번호"
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              {...register('nowPassword', {
                required: '비밀번호는 필수 입력값이에요.',
              })}
            />
            {errors.nowPassword && (
              <p className="text-end text-sm text-red-500">
                {errors.nowPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-[8px]">
            <Input
              id="newPassword"
              label="새 비밀번호"
              type="password"
              placeholder="새 비밀번호를 입력해주세요"
              {...register('newPassword', {
                required: true,
                minLength: SETTING_MIN_LENGTH.PASSWORD,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: '영어 + 특수문자 + 숫자 조합으로 최소 8자',
                },
              })}
            />
            <p
              className={cn(
                'text-light text-end text-sm font-light',
                errors.newPassword && 'text-red-500',
              )}
            >
              영어 + 특수문자 + 숫자 조합으로 최소 8자
            </p>
          </div>
        </div>
        <button type="submit" className="hidden" disabled={!isValid} />
      </div>
    </form>
  );
}
