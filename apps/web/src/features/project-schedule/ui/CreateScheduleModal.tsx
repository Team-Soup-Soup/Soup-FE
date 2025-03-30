import React, { useState } from 'react';

import { Button, Input, Radio, Toggle } from '@soup/design-system';

import {
  REPEAT_OPTION,
  repeatOptionKeys,
} from '~/features/project-schedule/model';
import type { RepeatOptionItem } from '~/features/project-schedule/types';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { DatePicker, Modal } from '~/shared/ui';

export default function CreateScheduleModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.CREATE_SCHEDULE });

  const [repeated, setRepeated] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedRepeatOption, setRepeatOption] = useState<RepeatOptionItem>(
    repeatOptionKeys[0],
  );

  const handleButtonClick = () => closeModal(MODAL.CREATE_SCHEDULE);

  return (
    isOpen && (
      <Modal size="md" title="일정 추가하기" modalKey={MODAL.CREATE_SCHEDULE}>
        <Modal.Header title="일정 추가하기" />
        <Modal.Body className="w-250 h-full font-light">
          <form className="h-full w-full">
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
                  <ColorPicker />
                </div>
                <div className="flex h-fit w-full items-center gap-x-8">
                  일시
                  <div className="flex items-center gap-x-4">
                    <DatePicker date={startDate} setDate={setStartDate} />-
                    <DatePicker date={endDate} setDate={setEndDate} />
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
                        {repeatOptionKeys.map((option) => (
                          <Radio
                            id={option}
                            key={option}
                            label={
                              REPEAT_OPTION[option as RepeatOptionItem].title
                            }
                            checked={selectedRepeatOption === option}
                            onChange={() => setRepeatOption(option)}
                          />
                        ))}
                      </div>
                      {REPEAT_OPTION[selectedRepeatOption].element}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
          <Modal.Footer className="justify-end">
            <Button size="lg" color="normal" onClick={handleButtonClick}>
              생성하기
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    )
  );
}

const ColorPicker = () => (
  <div className="flex gap-x-6">
    <div className="size-6 rounded-full bg-red-500/30" />
    <div className="size-6 rounded-full bg-blue-500/30" />
    <div className="size-6 rounded-full bg-green-500/30" />
    <div className="size-6 rounded-full bg-yellow-500/30" />
    <div className="size-6 rounded-full bg-purple-500/30" />
  </div>
);
