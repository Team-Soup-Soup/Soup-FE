import React from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button, Input, Toggle } from '@soup/design-system';

import { Modal } from '~/shared/ui';
import { useModal } from '~/shared/hooks';
import { MODAL, TITLE_MAX_LENGTH } from '~/shared/constants';

import { NoticePostRequest } from '~/features/project-board/types';
import {
  useSubmitBasicPost,
  useSubmitNoticePost,
} from '~/features/project-board/api';

interface CreateNormalPostProps {
  notice?: boolean;
}

export default function CreateNormalPost({
  notice = false,
}: CreateNormalPostProps) {
  const { closeModal } = useModal();
  const { projectId } = useParams();
  const submitBasicPost = useSubmitBasicPost().mutate;
  const submitNoticePost = useSubmitNoticePost().mutate;

  const { register, handleSubmit, watch, setValue } =
    useForm<NoticePostRequest>({
      defaultValues: {
        fixYn: 'N',
        projectId: Number(projectId),
      },
    });

  const isFixed = watch('fixYn') === 'Y';
  const isFormValid =
    watch('content')?.length > 0 && watch('title')?.length > 0;
  const formSubmit = (data: NoticePostRequest) => {
    if (notice) submitNoticePost(data);
    else {
      const temp = data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { fixYn, ...normalData } = temp;
      submitBasicPost(normalData);
    }
    closeModal(MODAL.CREATE_POST);
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)} className="size-full">
        <Modal.Body className="min-w-150 h-full justify-between font-light">
          <div className="flex flex-col gap-8">
            <Modal.Section title="제목">
              <Input
                id="title"
                placeholder="제목 입력"
                value={watch('title') || ''}
                maxLength={TITLE_MAX_LENGTH}
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
                      setValue('fixYn', value);
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
        </Modal.Body>
      </form>
    </>
  );
}
