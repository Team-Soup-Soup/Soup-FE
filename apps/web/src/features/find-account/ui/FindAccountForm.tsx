import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@soup/design-system';

import { Button } from '~/shared/ui';
import { UserInfo } from '~/features/find-account/types';
import { handleFormSubmit } from '~/features/find-account/model';
import { useFetchFindId, useFetchFindPw } from '../api';
import { useQueryClient } from '@tanstack/react-query';

interface FindAccountFormProp {
  id: 'ID' | 'PW';
}

export default function FindAccountForm({ id }: FindAccountFormProp) {
  const queryClient = useQueryClient();
  const [errorPw, setErrorPw] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserInfo>();

  const { refetch: fetchFindId, isSuccess: sent } = useFetchFindId(
    watch('email'),
  );

  const {
    mutate: fetchFindPw,
    isSuccess: sentPw,
    reset,
  } = useFetchFindPw(watch('username'), watch('email'));

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['findId'] });
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderError = () => {
    if (errors) {
      return (
        <p className="bottom-18 text-important absolute font-light">
          {errors.email?.message}
        </p>
      );
    } else if (errorPw) {
      return (
        <p className="bottom-18 text-important absolute font-light">
          아이디 또는 이메일이 올바르지 않습니다
        </p>
      );
    }
  };

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
        {sent ||
          (sentPw && (
            <p className="bottom-18 text-point absolute font-light">
              메일이 전송되었습니다.
            </p>
          ))}

        {renderError()}

        <Button
          size="lg"
          status="point"
          disabled={sent || sentPw}
          intent="squared"
          onClick={() => {
            if (id === 'ID') {
              fetchFindId();
            } else {
              fetchFindPw(undefined, { onError: () => setErrorPw(true) });
            }
          }}
        >
          전송
        </Button>
      </form>
    </div>
  );
}
