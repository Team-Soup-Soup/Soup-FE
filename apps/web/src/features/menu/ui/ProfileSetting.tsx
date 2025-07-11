import { Input } from '@soup/design-system';
import React, { ChangeEvent, useCallback, useImperativeHandle } from 'react';
import type { ProfileSettingItem } from '~/shared/types';
import { useForm } from 'react-hook-form';
import { PROFILE, SETTING_MAX_LENGTH } from '~/shared/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '~/shared/ui';
import { getCookie } from '~/shared/utils';

interface ProfileSettingProps {
  ref: React.Ref<{
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    isValid: boolean;
  }>;
}

const schema = z.object({
  [PROFILE.IMAGE]: z.string(),
  [PROFILE.NAME]: z
    .string()
    .max(
      SETTING_MAX_LENGTH.NAME,
      `이름은 ${SETTING_MAX_LENGTH.NAME}자 이내여야 해요`,
    ),
});

export default function ProfileSetting({ ref }: ProfileSettingProps) {
  const imageUrl =
    getCookie('USER_PROFILE') === '-'
      ? '/icons/icon-profile.svg'
      : !getCookie('USER_PROFILE')
        ? '/icons/icon-profile.svg'
        : ` http://student-p.p-e.kr/download/${getCookie('USER_PROFILE')}`;

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      image: imageUrl,
      name: getCookie('USER_NAME') || '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { image, name } = watch();

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit(onSubmit),
    isValid,
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

  const onSubmit = useCallback(
    (data: ProfileSettingItem) => {
      reset();
      console.log(data);
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.success(
          '[프로필 변경] 변경된 정보로 업데이트 되었습니다.',
        );
      }
    },
    [reset],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[30px]">
        <div className="flex w-full justify-center">
          <div className="flex flex-col items-center gap-[24px]">
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
                className="size-[185px] overflow-hidden rounded-full object-cover object-center"
              />
            </label>
            <Button
              status="normal"
              onClick={() => {
                document.getElementById('file')?.click();
              }}
              type="button"
              className="w-fit"
            >
              프로필 변경
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <Input
            id="name"
            label="이름"
            errorMessage={errors.name?.message}
            value={name || ''}
            maxLength={SETTING_MAX_LENGTH.NAME}
            inputClassName="bg-lock border-none text-md px-[30px]"
            {...register(PROFILE.NAME)}
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <Input
            id="id"
            value={getCookie('USER_ID') || '아이디'}
            label="아이디"
            inputClassName="px-[30px] border-main-board-border text-light bg-main-board size-full rounded-[10px] border font-light"
            disabled
          />
        </div>

        <button type="submit" className="hidden" disabled={!isValid} />
      </div>
    </form>
  );
}
