import { Input } from '@soup/design-system';
import React, { ChangeEvent, useCallback, useImperativeHandle } from 'react';
import type { ProfileSettingItem } from '~/shared/types';
import { useForm } from 'react-hook-form';
import {
  PROFILE,
  SETTING_MAX_LENGTH,
  SETTING_MIN_LENGTH,
} from '~/shared/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@soup/utils';

interface ProfileSettingProps {
  ref: React.Ref<{
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  }>;
}

const schema = z
  .object({
    [PROFILE.IMAGE]: z.string(),
    [PROFILE.NAME]: z
      .string()
      .max(
        SETTING_MAX_LENGTH.NAME,
        `이름은 ${SETTING_MAX_LENGTH.NAME}자 이내여야 해요`,
      ),
    [PROFILE.NOW_PASSWORD]: z.string().min(1, '현재 비밀번호를 입력해주세요'),
    [PROFILE.NEW_PASSWORD]: z
      .string()
      .min(SETTING_MIN_LENGTH.PASSWORD, '올바르지 못한 비밀번호예요')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        '올바르지 못한 비밀번호예요',
      ),
    [PROFILE.CHECK_PASSWORD]: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data[PROFILE.NEW_PASSWORD] !== data[PROFILE.CHECK_PASSWORD]) {
      ctx.addIssue({
        path: [PROFILE.NEW_PASSWORD],
        message: '올바르지 못한 비밀번호예요',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export default function ProfileSetting({ ref }: ProfileSettingProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      image: '/images/user_profile.webp',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { image, name } = watch();

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit(onSubmit),
  }));

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setValue('image', '/images/user_profile.webp');
    }
  };

  const onSubmit = useCallback((data: ProfileSettingItem) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[30px]">
        <label htmlFor="file">
          <input
            id="file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageInputChange}
          />
          <img
            id="file"
            src={image}
            alt="프로필"
            width={73}
            height={73}
            className="rounded-full"
          />
        </label>
        <div className="flex flex-col gap-[8px]">
          <Input
            id="name"
            label="이름"
            errorMessage={errors.name?.message}
            value={name || ''}
            maxLength={SETTING_MAX_LENGTH.NAME}
            inputClassName="bg-lock border-none text-md px-[30px]"
            placeholder="이름을 입력해주세요"
            {...register(PROFILE.NAME)}
          />
        </div>
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
              id={PROFILE.NOW_PASSWORD}
              label="현재 비밀번호"
              errorMessage={errors.nowPassword?.message}
              placeholder="현재 비밀번호를 입력해주세요"
              inputClassName="bg-lock border-none text-md px-[30px]"
              showPasswordButton
              {...register(PROFILE.NOW_PASSWORD)}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Input
              id={PROFILE.NEW_PASSWORD}
              label="새 비밀번호"
              errorMessage={errors.newPassword?.message}
              placeholder="새 비밀번호를 입력해주세요"
              inputClassName="bg-lock border-none text-md px-[30px]"
              showPasswordButton
              {...register(PROFILE.NEW_PASSWORD)}
            />
            <Input
              id={PROFILE.CHECK_PASSWORD}
              placeholder="새 비밀번호를 다시 입력해주세요"
              inputClassName="bg-lock border-none text-md px-[30px]"
              showPasswordButton
              {...register(PROFILE.CHECK_PASSWORD)}
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
