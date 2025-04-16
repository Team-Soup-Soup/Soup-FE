import React from 'react';
import { Sidebar } from '~/widgets/menu/ui';

export default function DefaultPage() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar isDefault />
      <div className="flex w-full justify-center">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-center gap-[62px] text-center">
            <img
              src="/images/empty_project.webp"
              width={442}
              height={373}
              alt="빈프로젝트"
            />
            <p className="text-dark text-lg">
              아직 참여 중인 프로젝트가 없어요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
