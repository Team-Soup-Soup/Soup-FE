import React from 'react';

import { useForm } from 'react-hook-form';

import { Button, Input, Toggle } from '@soup/design-system';

import { Modal } from '~/shared/ui';
import { BasicPostRequest, NoticePostRequest } from '~/widgets/modal/types';
import { useModal } from '~/shared/hooks';
import { MODAL } from '~/shared/constants';

interface CreateNormalPostProps {
  notice?: boolean;
}

export default function CreateNormalPost({
  notice = false,
}: CreateNormalPostProps) {
  const { closeModal } = useModal();
  const { register, handleSubmit, watch, setValue } =
    useForm<NoticePostRequest>({
      defaultValues: {
        fixedYn: 'N',
        projectId: 1 /** 차후 프로젝트 id 받아와 넣을 예정입니다 */,
      },
    });
  const isFixed = watch('fixedYn') === 'Y';
  const isFormValid =
    watch('content')?.length > 0 && watch('title')?.length > 0;
  const formSubmit = (data: NoticePostRequest) => {
    if (notice) console.log(data);
    else {
      const temp = data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { fixedYn, ...normalData } = temp;
      console.log(normalData as BasicPostRequest);
    }
    closeModal(MODAL.CREATE_POST);
  };

  return (
    <>
      <Modal.Body className="min-w-256 h-fit font-light">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="flex flex-col gap-8">
            <Modal.Section title="제목">
              <Input
                id="title"
                placeholder="제목 입력"
                value={watch('title') || ''}
                maxLength={20}
                inputClassName="bg-lock h-[42px] p-6 border-none"
                {...register('title', { required: '제목을 입력해 주세요' })}
              />
            </Modal.Section>
            <div className="flex flex-1 flex-col gap-y-4">
              <div className="flex items-center justify-between">
                <div className="text-md text-light flex gap-x-4 font-semibold">
                  <span className="hover:text-dark cursor-pointer">h1</span>
                  <span className="hover:text-dark cursor-pointer">h2</span>
                </div>
                {notice && (
                  <Toggle
                    labelLeft
                    id="fixedNotice"
                    label={
                      <p>
                        게시판 상단 고정{' '}
                        <span className="text-light">(추후 변경 불가)</span>
                      </p>
                    }
                    checked={isFixed}
                    onChange={(e) => {
                      const value = e.target.checked ? 'Y' : 'N';
                      setValue('fixedYn', value);
                    }}
                  />
                )}
              </div>
              <textarea
                className="bg-lock h-120 w-full resize-none rounded-[10px] p-6 font-light focus:outline-none"
                placeholder="본문을 입력해주세요."
                {...register('content', { required: '본문을 입력해주세요' })}
              />
            </div>
          </div>
          <Modal.Footer className="justify-end">
            <Button
              size="lg"
              color="normal"
              type="submit"
              locked={!isFormValid}
            >
              게시하기
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </>
  );
}
