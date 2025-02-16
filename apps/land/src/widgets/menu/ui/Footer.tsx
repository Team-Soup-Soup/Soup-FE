import React from 'react';

export default function Footer() {
  return (
    <div className="h-51 bg-sub box-border flex w-full items-center justify-center p-4">
      <div className="flex w-[60%] justify-between">
        <div className="text-text-light flex-col">
          <p className="logo mb-4 text-xl">soup</p>
          <p>Designed by Freepik</p>
          <a href="www.freepik.com">
            <u>www.freepik.com</u>
          </a>
        </div>
      </div>
    </div>
  );
}
