import React from 'react';

import { useForm } from 'react-hook-form';

import { Button, Input } from '@soup/design-system';

import { CREATE_PROJECT_MAX_LENGTH, MODAL } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';

export default function ChangeProjectModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.CHANGE_PROJECT });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleSave = () => {
    closeModal(MODAL.CHANGE_PROJECT);
  };

  return (
    isOpen && (
      <Modal size="sm" modalKey={MODAL.CHANGE_PROJECT}>
        <Modal.Header title="프로젝트 이름/설명 변경하기" />
        <Modal.Body className="h-full justify-between">
          <div className="flex flex-col gap-[12px]">
            <Input
              id="name"
              maxLength={CREATE_PROJECT_MAX_LENGTH.NAME}
              value={watch('name') || ''}
              placeholder="프로젝트 이름을 입력해주세요."
              inputClassName="bg-lock border-none"
              label="프로젝트 이름"
              {...register('name', {
                required: '프로젝트 이름을 작성해주세요.',
                maxLength: {
                  value: CREATE_PROJECT_MAX_LENGTH.NAME,
                  message: `프로젝트 이름은 최대 ${CREATE_PROJECT_MAX_LENGTH.NAME}자까지 입력 가능해요`,
                },
              })}
            />
            {errors.name && (
              <p className="text-important text-sm">{errors.name.message}</p>
            )}
            <Input
              id="description"
              maxLength={CREATE_PROJECT_MAX_LENGTH.DESCRIPTION}
              value={watch('description') || ''}
              placeholder="한 줄 소개를 적어주세요."
              inputClassName="bg-lock border-none"
              label="프로젝트 한줄 소개"
              {...register('description', {
                required: '프로젝트 소개를 작성해주세요.',
                maxLength: {
                  value: CREATE_PROJECT_MAX_LENGTH.DESCRIPTION,
                  message: `프로젝트 소개는 최대 ${CREATE_PROJECT_MAX_LENGTH.DESCRIPTION}자까지 입력 가능해요.`,
                },
              })}
            />
            {errors.description && (
              <p className="text-important text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <Modal.Footer className="mt-[44px] flex justify-end">
            <Button
              type="submit"
              className="w-[100px]"
              color="normal"
              onClick={handleSubmit(handleSave)}
            >
              저장하기
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    )
  );
}
