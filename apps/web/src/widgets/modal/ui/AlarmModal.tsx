import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Header, Radio } from '@soup/design-system';
import { alarmList, projectList } from '~/mocks';

export default function AlarmModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.ALARM });

  const sort = ['전체', ...projectList.map(({ project }) => project)];

  const [view, setView] = useState(sort[0]);
  const sortedAlarmList =
    view !== sort[0]
      ? alarmList.filter((alarm) => alarm.project === view)
      : alarmList;

  const handleSortRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setView(e.target.name);
  };

  useEffect(() => {
    const escKeyModalClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal(MODAL.ALARM);
      }
    };
    document.addEventListener('keydown', escKeyModalClose);

    return () => document.removeEventListener('keydown', escKeyModalClose);
  }, [closeModal]);

  return (
    isOpen && (
      <div className="border-main-board-border box-shadow absolute left-[214px] top-[60px] z-10 h-[400px] min-w-[600px] max-w-[626px] rounded-[20px] border bg-white px-[40px]">
        <p className="text-light py-[20px] text-start">알림</p>
        <div className="font-light">
          <div className="mb-[20px] flex gap-[42px]">
            {sort.map((item) => (
              <Radio
                id={item}
                name={item}
                label={item}
                checked={view === item}
                onChange={handleSortRadioChange}
              />
            ))}
          </div>
          <div className="scrollbar-hide flex h-[258px] flex-col overflow-scroll">
            {alarmList.length ? (
              sortedAlarmList.map(({ project, sort, content, createdAt }) => (
                <div className="border-light flex h-[68px] w-full flex-col gap-[2px] border-b py-[8px]">
                  <Header className="text-light">
                    <Header.Item>{project}</Header.Item>
                    <Header.Item>/</Header.Item>
                    <Header.Item>{sort}</Header.Item>
                  </Header>
                  <div className="flex justify-between font-light">
                    <p>{content}</p>
                    <p className="text-light">{createdAt}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-light">알람이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
