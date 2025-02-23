import React from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@soup/design-system';

import { UserInfo } from '~/features/find-account/types';
import { handleFormSubmit } from '~/features/find-account/model';

interface FindAccountFormProp {
  id: 'ID' | 'PW';
}

export default function FindAccountForm({ id }: FindAccountFormProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>();

  return (
    <div className="mt-30 gap-y-30 flex flex-col">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="relative flex flex-col gap-y-16"
      >
        <div className="flex flex-col gap-y-7">
          {id === 'PW' && (
            <Input
              label="아이디"
              placeholder="아이디를 입력해주세요"
              {...register('username', {
                required: true,
              })}
            />
          )}
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '유효한 이메일 주소를 입력해주세요.',
              },
            })}
          />
        </div>
        {/* {sent && (
          <p className="bottom-18 text-point absolute font-light">
            메일이 전송되었습니다.
          </p>
        )} */}
        {/* 전역상태 사용해서 검증이후 표시 필요할듯*/}
        {errors && (
          <p className="bottom-18 text-important absolute font-light">
            {errors.email?.message}
          </p>
        )}
        <input
          className="auth-button bg-point hover:bg-point-dark text-white"
          type="submit"
          value="전송"
        />
      </form>
    </div>
  );
}
