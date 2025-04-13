import React from 'react';
import { Loader } from '~/assets/images';

export default function LoadingPage() {
  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="text-point flex flex-col items-center gap-6">
        <img src={Loader} className="h-26 w-24" />
        <p className="font-semibold">스프를 끓여 오는 중...</p>
        <p>잠시만 기다려 주세요</p>
      </div>
    </div>
  );
}
