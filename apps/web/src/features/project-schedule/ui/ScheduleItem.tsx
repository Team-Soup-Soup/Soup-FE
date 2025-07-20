import React from 'react';
import { MODAL } from '~/shared/constants';
import { useModal } from '~/shared/hooks';
import { Schedule } from '~/shared/types';

interface ScheduleItemProps {
  schedule: Schedule;
}

export default function ScheduleItem({ schedule }: ScheduleItemProps) {
  const { title, content, color } = schedule;
  const { openModal } = useModal();
  const handleEditClick = () => {
    openModal(MODAL.CREATE_SCHEDULE);
  };
  const handleDeleteClick = () => {
    openModal(MODAL.DELETE_SCHEDULE);
  };

  return (
    <div
      className="collapse-arrow border-main-board-border collapse w-full cursor-pointer rounded-[8px] border-[1px]"
      style={{ backgroundColor: color }}
    >
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title font-light">{title}</div>
      <div className="collapse-content bg-white">
        <div className="flex flex-col pt-4">
          <div className="flex items-center pt-4">{content}</div>
          <div className="flex w-full items-center justify-end">
            <div className="flex gap-x-2">
              <button
                className="hover:bg-lock cursor-pointer rounded-sm px-2 py-1 focus:outline-none"
                onClick={handleEditClick}
              >
                수정
              </button>
              <button
                className="hover:bg-lock cursor-pointer rounded-sm px-2 py-1 focus:outline-none"
                onClick={handleDeleteClick}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
