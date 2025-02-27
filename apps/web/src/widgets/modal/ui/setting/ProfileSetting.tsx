import { Input, Toggle } from '@soup/design-system';
import React, { ChangeEvent, useCallback, useImperativeHandle } from 'react';
import type { ProfileSettingItem } from '~/shared/types';
import { useForm, Controller } from 'react-hook-form';
import { SETTING_MAX_LENGTH } from '~/shared/constants';

interface ProfileSettingProps {
  ref: React.Ref<{
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  }>;
}

export default function ProfileSetting({ ref }: ProfileSettingProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      image: '/images/user_profile.webp',
      name: '',
      toggles: {
        postComment: true,
        boardComment: false,
        boardQuestion: true,
        questionComment: true,
      },
    },
    mode: 'onChange',
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
      <div className="flex flex-col gap-[42px]">
        <div className="flex items-center gap-[32px]">
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
              width={120}
              height={120}
              className="rounded-full"
            />
          </label>
          <p className="font-light">프로필 변경하기</p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <Input
            id="name"
            label="이름"
            value={name || ''}
            maxLength={SETTING_MAX_LENGTH.NAME}
            inputClassName="bg-lock border-none text-md px-[30px]"
            placeholder="이름을 입력해주세요"
            {...register('name', {
              required: '이름은 필수 입력값이에요',
              maxLength: {
                value: SETTING_MAX_LENGTH.NAME,
                message: `이름은 ${SETTING_MAX_LENGTH.NAME}자 이내여야 해요`,
              },
            })}
          />
          {errors.name && (
            <p className="text-important text-end text-sm">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <p className="text-md mb-2 flex items-center gap-[10px] font-light">
            알림 설정
            <span className="text-light text-sm">
              멘션 알림은 해제할 수 없습니다.
            </span>
          </p>
          <div className="bg-lock h-[290px] w-full rounded-[10px]">
            <div className="flex flex-col gap-[24px] rounded-[10px] p-[30px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-light text-sm">내 게시글</label>
                <div className="text-md flex w-full justify-between">
                  <p>댓글 알림</p>
                  <Controller
                    name="toggles.postComment"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        id="postComment"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <label className="text-light text-sm">내 보드</label>
                <div className="text-md flex w-full justify-between">
                  <p>댓글 알림</p>
                  <Controller
                    name="toggles.boardComment"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        id="boardComment"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="text-md flex w-full justify-between">
                  <p>질문 알림</p>
                  <Controller
                    name="toggles.boardQuestion"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        id="boardQuestion"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <label className="text-light text-sm">내 질문</label>
                <div className="text-md flex w-full justify-between">
                  <p>답글 알림</p>
                  <Controller
                    name="toggles.questionComment"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        id="questionComment"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="hidden" disabled={!isValid} />
      </div>
    </form>
  );
}
