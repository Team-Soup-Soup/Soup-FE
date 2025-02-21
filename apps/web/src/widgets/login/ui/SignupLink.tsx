import React from 'react';
import { Link } from 'react-router-dom';

export default function SignupLink() {
  return (
    <div className="text-light absolute bottom-0 left-0 w-fit font-light">
      <span className="mr-8">계정이 없으신가요?</span>
      <Link to="/signup" className="hover:text-point cursor-pointer">
        <u>회원가입하기</u>
      </Link>
    </div>
  );
}
