import React from 'react';
import ArrowLeft from '~/assets/icons/chevron-left.svg';

interface AuthHeaderProp {
  title: string;
}

export default function AuthHeader({ title }: AuthHeaderProp) {
  return (
    <div className="text-dark absolute left-4 top-4 flex items-center gap-x-4 font-light">
      <img
        src={ArrowLeft}
        className="size-10 cursor-pointer"
        onClick={() => window.history.back()}
      />
      {title}
    </div>
  );
}
