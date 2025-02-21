import React from 'react';

export default function Sidebar() {
  return (
    <div className="box-shadow border-main-board-border flex h-screen w-[270px] flex-col justify-between border-r py-[32px] text-center">
      <div>
        <div className="ml-[174px] flex gap-[16px]">
          <img src="/icons/project_plus.svg" alt="프로젝트 생성" />
          <img src="/icons/bell_activate.svg" alt="알람" />
        </div>
        <div className="bg-lock mx-[8px] mt-[42px] flex h-[42px] w-[254px] items-center gap-[10px] rounded-[10px] p-[10px]">
          <img src="/icons/project.svg" alt="프로젝트 생성" />
          <span>프로젝트</span>
        </div>
        <p className="text-light mt-[12px]">참여중인 프로젝트가 없습니다</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-[10px] pl-[32px]">
          <img
            src=""
            alt="프로필"
            width={42}
            height={42}
            className="rounded-full"
          />
          <p className="text-dark text-md font-light">홍길동</p>
        </div>
        <div className="flex justify-end gap-[16px] pr-[32px]">
          <button className="text-light text-sm">설정</button>
          <button className="text-light text-sm">로그아웃</button>
        </div>
      </div>
    </div>
  );
}
