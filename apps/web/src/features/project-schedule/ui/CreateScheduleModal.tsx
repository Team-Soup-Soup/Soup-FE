import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Input, Radio, Toggle } from '@soup/design-system';

import {
  REPEAT_OPTION,
  repeatOptionKeys,
} from '~/features/project-schedule/model';
import type { RepeatOptionItem } from '~/features/project-schedule/types';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { DatePicker, Modal } from '~/shared/ui';
import { useSubmitNewSchedule } from '../api';
import { PostSchedule } from '~/shared/types';
import { useForm } from 'react-hook-form';

export default function CreateScheduleModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.CREATE_SCHEDULE });
  const { mutate: submitNewSchedule } = useSubmitNewSchedule();
  const { projectId } = useParams();

  const [repeated, setRepeated] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedRepeatOption, setRepeatOption] = useState<RepeatOptionItem>(
    repeatOptionKeys[0],
  );
  const [selectedColor, setSelectedColor] = useState('#DD8CFF');

  const { register, handleSubmit, setValue } = useForm<PostSchedule>({
    defaultValues: {
      title: '',
      content: '',
      color: selectedColor,
      startDt: startDate.toISOString(),
      endDt: endDate.toISOString(),
      routhinCycle: repeated ? 'WEEK' : 'NONE',
      routhinValue: 'MONDAY',
      projectId: Number(projectId),
    },
  });

  // 날짜가 변경될 때마다 폼 값 업데이트
  useEffect(() => {
    setValue('startDt', startDate.toISOString());
    setValue('endDt', endDate.toISOString());
  }, [startDate, endDate, setValue]);

  useEffect(() => {
    setValue('color', selectedColor);
  }, [selectedColor, setValue]);

  // 반복 옵션이 변경될 때마다 폼 값 업데이트
  useEffect(() => {
    setValue('routhinCycle', repeated ? selectedRepeatOption : 'NONE');
    setValue(
      'routhinValue',
      repeated ? REPEAT_OPTION[selectedRepeatOption].value : '',
    );
  }, [repeated, selectedRepeatOption, setValue]);

  const handleButtonClick = (data: PostSchedule) => {
    submitNewSchedule(data, {
      onSuccess: () => {
        closeModal(MODAL.CREATE_SCHEDULE);
      },
    });
  };

  return (
    isOpen && (
      <Modal size="md" title="일정 추가하기" modalKey={MODAL.CREATE_SCHEDULE}>
        <form onSubmit={handleSubmit(handleButtonClick)}>
          <Modal.Header title="일정 추가하기" />
          <Modal.Body className="w-250 h-full font-light">
            <div className="h-full w-full">
              <div className="flex size-full gap-x-10">
                <div className="flex h-full flex-1 flex-col gap-y-8">
                  <Modal.Section title="제목">
                    <Input
                      id="title"
                      placeholder="제목을 입력해주세요."
                      inputClassName="bg-lock h-[42px] w-full border-none p-6"
                      {...register('title')}
                    />
                  </Modal.Section>
                  <Modal.Section title="내용" className="flex-1">
                    <textarea
                      id="content"
                      placeholder="내용을 입력해주세요."
                      className="bg-lock h-full w-full resize-none rounded-[10px] p-6 font-light focus:outline-none"
                      {...register('content')}
                    />
                  </Modal.Section>
                </div>
                <div className="flex flex-1 flex-col gap-y-8">
                  <div className="mt-12 flex h-fit w-full items-center gap-x-8">
                    색상
                    <ColorPicker
                      selectedColor={selectedColor}
                      setSelectedColor={setSelectedColor}
                    />
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
            </div>
            <Modal.Footer className="justify-end">
              <Button size="lg" color="normal" type="submit">
                생성하기
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    )
  );
}

const ColorPicker = ({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}) => {
  const colors = [
    { color: '#DD8CFF', bg: 'bg-[#DD8CFF]' },
    { color: '#8CAFFF', bg: 'bg-[#8CAFFF]' },
    { color: '#F6B396', bg: 'bg-[#F6B396]' },
    { color: '#A6F696', bg: 'bg-[#A6F696]' },
    { color: '#FFF07E', bg: 'bg-[#FFF07E]' },
  ];

  return (
    <div className="flex gap-x-6">
      {colors.map(({ color, bg }) => (
        <div
          key={color}
          className={`size-6 cursor-pointer rounded-full ${bg} ${
            selectedColor === color ? 'ring-2 ring-[#9F9C95] ring-offset-2' : ''
          }`}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>
  );
};
