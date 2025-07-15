import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { setCookie } from '~/shared/utils';
import { LoginContainer } from '~/widgets/login/ui';

export default function InvitePage() {
  const [searchParams] = useSearchParams();
  const signature = searchParams.get('signature');
  const email = searchParams.get('email');
  const projectId = searchParams.get('projectId');
  const expiredAt = searchParams.get('expiredAt');

  setCookie(
    'invitation',
    JSON.stringify({
      signature,
      email,
      projectId,
      expiredAt,
    }),
  );

  return (
    <div className="grid h-screen grid-cols-1 overflow-hidden xl:grid-cols-2">
      <div className="relative hidden size-full xl:block">
        <img
          src="/images/login-signup-image.png"
          className="absolute inset-0 size-full bg-cover bg-center"
          loading="eager"
        />
        <div className="border-main-2-2 absolute left-1/2 top-1/2 grid h-[376px] w-[462px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[20px] border bg-white">
          <p className="text-center text-2xl font-light">
            <span className="font-medium">{email}</span>님이 <br />
            프로젝트에 초대되었습니다.
            <br />
            프로젝트에 참여하려면 로그인해주세요.
          </p>
        </div>
      </div>

      <div className="grid size-full place-items-center py-20">
        <div className="border-dash-board-border w-170 rounded-auth box-shadow box-border h-full border-[1px]">
          <div className="flex size-full flex-col p-16">
            <p className="logo mb-8 text-center">soup</p>
            <LoginContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
