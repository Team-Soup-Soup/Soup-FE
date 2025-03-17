import React, { useState } from 'react';

import { Button, Input, Radio, Toggle } from '@soup/design-system';

import { MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';

export default function CreateScheduleModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.CREATE_SCHEDULE });
  const handleButtonClick = () => closeModal(MODAL.CREATE_SCHEDULE);
  const [repeated, setRepeated] = useState<boolean>(false);
  return (
    isOpen && (
      <Modal title="일정 추가하기" modalKey={MODAL.CREATE_PROJECT}>
        <Modal.Header title="일정 추가하기" />
        <Modal.Body className="w-250 h-230 flex font-light">
          <div className="flex size-full gap-x-10">
            <div className="flex h-full flex-1 flex-col gap-y-8">
              <div className="flex flex-col gap-y-2">
                <p>제목</p>
                <div>
                  <Input
                    id="title"
                    placeholder="제목을 입력해주세요."
                    inputClassName="bg-lock h-[42px] w-full border-none p-6"
                  />
                </div>
              </div>
              <div className="flex h-full flex-col gap-2">
                <p>내용</p>
                <textarea
                  id="content"
                  placeholder="내용을 입력해주세요."
                  className="bg-lock h-full w-full resize-none rounded-[10px] p-6 font-light focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-y-8">
              <div className="mt-12 flex h-fit w-full items-center gap-x-8">
                색상
              </div>
              <div className="flex h-fit w-full items-center gap-x-8">일시</div>
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
                      <Radio id="everyweek" label="매주" />
                      <Radio id="everymonth" label="매달" />
                      <Radio id="everyyear" label="매년" />
                    </div>
                    <div className="bg-lock rounded-auth h-45 w-full"></div>
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
        </Modal.Body>
      </Modal>
    )
  );
}
