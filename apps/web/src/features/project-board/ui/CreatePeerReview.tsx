import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { cn } from '@soup/utils';
import { Button, Input } from '@soup/design-system';

import { DatePicker, Modal, TimePicker } from '~/shared/ui';
import { getDate } from '~/shared/utils';
import { useModal } from '~/shared/hooks';
import { MODAL, TITLE_MAX_LENGTH } from '~/shared/constants';

import { useSubmitPeerReviewPost } from '~/features/project-board/api';
import { PeerReviewPostRequest } from '~/features/project-board/types';

export default function CreatePeerReview() {
  const { closeModal } = useModal();
  const { mutate, isPending } = useSubmitPeerReviewPost();
  const [date, setDate] = useState(new Date());
  const { register, handleSubmit, watch } = useForm<PeerReviewPostRequest>({
    defaultValues: {
      projectId: 1,
    },
  });
  const isFormValid = watch('title')?.length > 0;
  const formSubmit = (data: PeerReviewPostRequest) => {
    const formattedData = {
      ...data,
      deadLineDt: date.toLocaleDateString(),
    };
    console.log(formattedData);
    mutate(formattedData);
    closeModal(MODAL.CREATE_POST);
  };

  return (
    <>
      <Modal.Body className="min-w-150 h-full font-light">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="flex flex-col gap-8">
            <Modal.Section title="제목">
              <Input
                id="title"
                placeholder="제목 입력"
                value={watch('title') || ''}
                maxLength={TITLE_MAX_LENGTH}
                inputClassName="bg-lock h-[42px] p-6 border-none"
                {...register('title', { required: '제목을 입력해주세요' })}
              />
            </Modal.Section>
            <Modal.Section title="마감 기한">
              <div className="flex gap-x-2">
                <DatePicker
                  key="createPeerReview"
                  date={date}
                  setDate={setDate}
                />
                <TimePickerWrapper />
              </div>
              <p className="text-light">
                생성/완료된 동료평가는 <u>게시판으로 자동 게시</u>되며,{' '}
                <u>수정 불가능</u> 합니다.
              </p>
            </Modal.Section>
          </div>
          <Modal.Footer className="justify-end">
            <Button size="lg" color="normal" locked={!isFormValid || isPending}>
              게시하기
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </>
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
