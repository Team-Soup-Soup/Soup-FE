import React, { useState } from 'react';

import { Button, Input, Radio, Toggle } from '@soup/design-system';
import { cn } from '@soup/utils';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { DatePicker, Modal } from '~/shared/ui';
import { getDate } from '~/shared/utils';
import { RepeatOption } from './create-schedule';

export default function CreateScheduleModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.CREATE_SCHEDULE });
  const repeatOption = ['week', 'month', 'year'] as const;
  type RepeatOption = (typeof repeatOption)[number];
  const repeatOptionObject = {
    week: { title: '매주', element: <RepeatOption.Week /> },
    month: { title: '매달', element: <RepeatOption.Month /> },
    year: { title: '매년', element: <RepeatOption.Year /> },
  };

  const [repeated, setRepeated] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [repeat, setRepeat] = useState<RepeatOption>(repeatOption[0]);

  const handleButtonClick = () => closeModal(MODAL.CREATE_SCHEDULE);

  return (
    isOpen && (
      <Modal title="일정 추가하기" modalKey={MODAL.CREATE_PROJECT}>
        <Modal.Header title="일정 추가하기" />
        <Modal.Body className="w-250 h-230 flex font-light">
          <form className="h-210 w-full">
            <div className="flex size-full gap-x-10">
              <div className="flex h-full flex-1 flex-col gap-y-8">
                <Modal.Section title="제목">
                  <Input
                    id="title"
                    placeholder="제목을 입력해주세요."
                    inputClassName="bg-lock h-[42px] w-full border-none p-6"
                  />
                </Modal.Section>
                <Modal.Section title="내용" className="flex-1">
                  <textarea
                    id="content"
                    placeholder="내용을 입력해주세요."
                    className="bg-lock h-full w-full resize-none rounded-[10px] p-6 font-light focus:outline-none"
                  />
                </Modal.Section>
              </div>
              <div className="flex flex-1 flex-col gap-y-8">
                <div className="mt-12 flex h-fit w-full items-center gap-x-8">
                  색상
                  <div className="flex gap-x-6">
                    <div className="size-6 rounded-full bg-red-500/30" />
                    <div className="size-6 rounded-full bg-blue-500/30" />
                    <div className="size-6 rounded-full bg-green-500/30" />
                    <div className="size-6 rounded-full bg-yellow-500/30" />
                    <div className="size-6 rounded-full bg-purple-500/30" />
                  </div>
                </div>
                <div className="flex h-fit w-full items-center gap-x-8">
                  일시
                  <div className="flex items-center gap-x-4">
                    <span
                      className={cn(
                        visible && 'border-point',
                        'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] px-5 py-2',
                      )}
                      onClick={() => setVisible((prev) => !prev)}
                    >
                      {getDate(startDate.toLocaleDateString(), 'YYYY. MM. DD')}
                      {visible && (
                        <DatePicker date={startDate} setDate={setStartDate} />
                      )}
                    </span>
                    -
                    <span
                      className={cn(
                        visible && 'border-point',
                        'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] px-5 py-2',
                      )}
                      onClick={() => setVisible((prev) => !prev)}
                    >
                      {getDate(endDate.toLocaleDateString(), 'YYYY. MM. DD')}
                      {visible && (
                        <DatePicker date={endDate} setDate={setEndDate} />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex h-fit w-full items-center justify-between gap-x-8">
                    반복
                    <Toggle
                      id="schedule-repeat"
                      checked={repeated}
                      onChange={() => setRepeated((prev) => !prev)}
                    />
                  </div>
                  {repeated && (
                    <div className="mt-4 flex w-full flex-col gap-y-2">
                      <div className="flex gap-x-11">
                        {repeatOption.map((option) => (
                          <Radio
                            id={option}
                            key={option}
                            label={
                              repeatOptionObject[option as RepeatOption].title
                            }
                            checked={repeat === option}
                            onChange={() => setRepeat(option)}
                          />
                        ))}
                      </div>
                      {repeatOptionObject[repeat].element}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer className="justify-end">
              <Button size="lg" color="normal" onClick={handleButtonClick}>
                생성하기
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    )
  );
}
