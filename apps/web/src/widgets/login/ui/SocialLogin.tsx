import React from 'react';
import Kakao from '~/assets/icons/kakao.svg';

export default function SocialLogin() {
  return (
    <>
      <div className="text-main-board-border mb-4 mt-16 flex items-center justify-between space-x-4 text-center font-light">
        <hr className="border-main-board-border w-1/3" />
        간편 로그인
        <hr className="border-main-board-border w-1/3" />
      </div>
      <button className="bg-kakao hover:bg-kakao-dark text-dark auth-button font-light">
        <img src={Kakao} className="mr-4 h-[20px] w-[20px]" />
        카카오톡 간편 로그인
      </button>
    </>
  );
}
