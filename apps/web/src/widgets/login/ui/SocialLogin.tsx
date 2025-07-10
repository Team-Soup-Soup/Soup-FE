import React from 'react';
import Kakao from '~/assets/icons/kakao.svg';

export default function SocialLogin() {
  return (
    <>
      <div className="text-light mb-4 mt-16 flex items-center justify-between space-x-4 text-center font-light">
        <hr className="border-light w-1/3" />
        간편 로그인&nbsp;&nbsp;&nbsp;&nbsp;
        <hr className="border-light w-1/3" />
      </div>
      <button
        className="bg-kakao hover:bg-kakao-dark text-dark auth-button px-7 py-4 font-light duration-300 ease-in-out"
        onClick={() => {
          window.location.href =
            'http://student-p.p-e.kr/api/oauth2/authorization/kakao';
        }}
      >
        <img src={Kakao} className="mr-4 h-[20px] w-[20px]" />
        카카오톡 간편 로그인
      </button>
    </>
  );
}
