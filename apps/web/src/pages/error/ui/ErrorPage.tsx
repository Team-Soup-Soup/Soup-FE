import { Button } from '@soup/design-system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/shared/constants';
import { Header } from '~/widgets/menu/ui';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col text-center">
      <Header />
      <div className="my-auto flex flex-col items-center justify-center gap-[24px]">
        <img src="/images/error.webp" width={440} height={440} />
        <p>
          <span className="text-lg">404 Not Found!</span>
          <br />
          페이지를 찾을 수 없어요.
        </p>
        <Button color="normal" onClick={() => navigate(PATH.HOME)}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
