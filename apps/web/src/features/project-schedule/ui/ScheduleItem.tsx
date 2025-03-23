import React from 'react';
import { MODAL } from '~/shared/constants';
import { useModal } from '~/shared/hooks';

export default function ScheduleItem() {
  const { openModal } = useModal();
  const handleEditClick = () => {};
  const handleDeleteClick = () => {
    openModal(MODAL.DELETE_SCHEDULE);
  };

  return (
    <div className="collapse-arrow border-main-board-border collapse w-full cursor-pointer rounded-[8px] border-[1px] bg-red-300/20">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title font-light">1차 와프</div>
      <div className="collapse-content bg-white">
        <div className="flex flex-col pt-4">
          <div className="flex items-center pt-4">
            줌회의
            <br />
            URL: ASD7-w386-df39
          </div>
          <div className="flex w-full items-center justify-end">
            <div className="flex gap-x-2">
              <span
                className="hover:bg-lock cursor-pointer rounded-sm px-2 py-1"
                onClick={handleEditClick}
              >
                수정
              </span>
              <span
                className="hover:bg-lock cursor-pointer rounded-sm px-2 py-1"
                onClick={handleDeleteClick}
              >
                삭제
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
