import React, { useState } from 'react';

import { Button, Checkbox, Input } from '@soup/design-system';

import {
  DatePicker,
  MeetingTimeSelector,
  Modal,
  TimePicker,
} from '~/shared/ui';
import { getDate } from '~/shared/utils';
import { useForm } from 'react-hook-form';
import { MeetingPostRequest } from '~/widgets/modal/types';
import { cn } from '@soup/utils';

export default function CreateMeeting() {
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<MeetingPostRequest>({
    defaultValues: {
      projectId: 1,
    },
  });

  const formSubmit = (data: MeetingPostRequest) => {
    const formattedData = {
      ...data,
      deadLineDt: date.toLocaleDateString(),
    };
    console.log(formattedData);
  };

  return (
    <Modal.Body className="min-w-256 h-200 font-light">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="flex h-[85%] gap-x-8">
          <div className="flex flex-1 flex-col gap-y-8">
            <Modal.Section title="제목">
              <Input
                id="title"
                placeholder="제목 입력"
                inputClassName="relative bg-lock h-[42px] p-6 border-none"
                {...register('title', { required: '제목을 입력해주세요' })}
              />
            </Modal.Section>
            <Modal.Section title="마감 기한">
              <div className="flex gap-x-2">
                <span
                  className={cn(
                    visible && 'border-point',
                    'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] px-5 py-2',
                  )}
                  onClick={() => setVisible((prev) => !prev)}
                >
                  {getDate(date.toLocaleDateString(), 'YYYY. MM. DD')}
                  {visible && <DatePicker date={date} setDate={setDate} />}
                </span>
                <TimePickerWrapper />
              </div>
            </Modal.Section>
            <Modal.Section title="시작 시간">
              <TimePickerWrapper />
            </Modal.Section>
            <Modal.Section title="참여 멤버" className="flex-1">
              <div className="text-light flex flex-col gap-y-1 text-sm font-light">
                <p>결과는 모든 대상이 참여 완료 후,</p>
                <p>게시판에 자동 기재되며 누구나 확인 가능합니다.</p>
              </div>
              <div className="rounded-auth bg-lock scrollbar-hide h-63 mt-2 box-border flex w-full flex-col gap-y-6 overflow-y-scroll p-6">
                <UserItem />
                {/** 해당부분은 유저값이 어떻게 나올지 확정되면 타입
              생성 후 수정 예정입니다! 현재 유저 이미지 속성이 없어서 일단 보류해 두었습니다*/}
              </div>
            </Modal.Section>
          </div>
          <div className="scrollbar-hide h-full flex-1 overflow-scroll">
            <MeetingTimeSelector />
          </div>
        </div>
        <Modal.Footer className="justify-end">
          <Button size="lg" color="normal" type="submit">
            게시하기
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Body>
  );
}

const UserItem = () => (
  <div className="flex h-8 items-center gap-x-3">
    <Checkbox id="user1" checkboxClassName="border-dark size-4.5" />
    <div className="size-8 rounded-[50%] bg-black bg-cover bg-center" />
    <span>칠가이</span>
  </div>
);
/** 해당부분 또한 유저값이 어떻게 나올지 확정되면 타입
생성 후 수정 예정입니다! */

const TimePickerWrapper = () => {
  const [visible, setVisible] = useState<boolean>(false);
  //   const selectedTime = watch(name);

  return (
    <span
      className={cn(
        visible && 'border-point',
        'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] px-5 py-2',
      )}
      onClick={() => setVisible((prev) => !prev)}
    >
      {getDate(new Date().toLocaleDateString(), 'HH: MM')}
      {visible && <TimePicker />}
    </span>
  );
};
