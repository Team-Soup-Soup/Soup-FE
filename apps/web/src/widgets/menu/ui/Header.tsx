import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/shared/constants';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="border-light top-0 flex w-full py-[1px]">
      <button
        className="ml-32"
        type="button"
        onClick={() => navigate(PATH.HOME)}
      >
        <img
          src="/logos/logo_onlysymbol.png"
          alt="logo"
          width={80}
          height={80}
          className="hover:cursor-pointer"
        />
      </button>
    </header>
  );
}
