import React from 'react';

export default function HomeContainer() {
  return (
    <div className="flex flex-col items-center gap-[62px] text-center">
      <img
        src="/images/empty_project.webp"
        width={442}
        height={373}
        alt="빈프로젝트"
      />
      <p className="text-dark text-lg">아직 참여 중인 프로젝트가 없어요</p>
    </div>
  );
}
