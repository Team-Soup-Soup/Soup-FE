import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Button, Input } from '@soup/design-system';
import { cn } from '@soup/utils';

import {
  DatePicker,
  MeetingTimeSelector,
  Modal,
  TimePicker,
  UserItem,
} from '~/shared/ui';
import { getDate, getPostDate } from '~/shared/utils';
import { useModal } from '~/shared/hooks';
import { MODAL, TITLE_MAX_LENGTH } from '~/shared/constants';

import { useSubmitMeetingPost } from '~/features/project-board/api';
import { MeetingPostRequest } from '~/features/project-board/types';
import { useFetchJoinedUser } from '~/widgets/project/api';

export default function CreateMeeting() {
  const [date, setDate] = useState(new Date());

  const { projectId } = useParams();
  const { closeModal } = useModal();
  const { mutate, isPending } = useSubmitMeetingPost();
  const { data } = useFetchJoinedUser();

  const { register, handleSubmit, watch, setValue } =
    useForm<MeetingPostRequest>({
      defaultValues: {
        projectId: Number(projectId!),
        participants: [],
      },
    });

  const { participants, title } = watch();

  const isFormValid = participants.length > 0 && title.length > 0;

  const formSubmit = (data: MeetingPostRequest) => {
    const formattedData = {
      ...data,
      deadLineDt: getPostDate(date),
    };
    mutate(formattedData);
    closeModal(MODAL.CREATE_POST);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} className="size-full">
      <Modal.Body className="min-w-256 h-full justify-between font-light">
        <div className="flex h-[85%] gap-x-8">
          <div className="flex flex-1 flex-col gap-y-8">
            <Modal.Section title="제목">
              <Input
                id="title"
                placeholder="제목 입력"
                value={title || ''}
                maxLength={TITLE_MAX_LENGTH}
                inputClassName="bg-lock h-[42px] p-6 border-none"
                {...register('title', { required: '제목을 입력해주세요' })}
              />
            </Modal.Section>
            <Modal.Section title="마감 기한">
              <div className="flex gap-x-2">
                <DatePicker key="createMeeting" date={date} setDate={setDate} />
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
                {data.map(({ participantId, userId, username }) => (
                  <UserItem
                    key={participantId}
                    id={userId}
                    name={username}
                    nonCheckedHandler={() =>
                      setValue('participants', [...participants, participantId])
                    }
                    checkedHandler={() =>
                      setValue(
                        'participants',
                        participants.filter((val) => val !== participantId),
                      )
                    }
                  />
                ))}
              </div>
            </Modal.Section>
          </div>
          <div className="scrollbar-hide h-full flex-1 overflow-scroll">
            <MeetingTimeSelector />
          </div>
        </div>
        <Modal.Footer className="justify-end">
          <Button
            size="lg"
            color="normal"
            type="submit"
            locked={!isFormValid || isPending}
          >
            게시하기
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </form>
  );
}

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
