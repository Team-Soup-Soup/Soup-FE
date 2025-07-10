import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@soup/design-system';

import { CREATE_PROJECT_MAX_LENGTH, MODAL } from '~/shared/constants';
import { useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';

import { CreateProjectRequest } from '~/features/menu/types';
import { useCreateProject } from '~/features/menu/model';

export default function CreateProjectModal({
  refetch,
}: {
  refetch: () => void;
}) {
  const { isOpen } = useModalState({ key: MODAL.CREATE_PROJECT });

  const { register, handleSubmit, watch, reset } =
    useForm<CreateProjectRequest>({
      defaultValues: { name: '', description: '' },
    });

  const { formSubmit, isValidProject } = useCreateProject({
    reset: reset,
    watch: watch,
    refetch: refetch,
  });

  const { name, description } = watch();

  return (
    isOpen && (
      <Modal size="md" title="프로젝트 생성" modalKey={MODAL.CREATE_PROJECT}>
        <Modal.Header title="프로젝트 생성" />
        <Modal.Body className="size-full">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex size-full flex-col justify-between font-light"
          >
            <div className="flex flex-col gap-8">
              <Modal.Section title="프로젝트 이름">
                <Input
                  id="projectName"
                  value={name}
                  maxLength={CREATE_PROJECT_MAX_LENGTH.NAME}
                  placeholder="프로젝트 이름을 입력해주세요."
                  inputClassName="bg-lock h-[42px] w-[520px] border-none"
                  {...register('name', { required: true })}
                />
              </Modal.Section>
              <Modal.Section title="프로젝트 한 줄 소개">
                <Input
                  id="projectDescription"
                  value={description}
                  maxLength={CREATE_PROJECT_MAX_LENGTH.DESCRIPTION}
                  placeholder="한 줄 소개를 적어주세요."
                  inputClassName="bg-lock h-[42px] w-[520px] border-none"
                  {...register('description', { required: true })}
                />
              </Modal.Section>
            </div>
            <Modal.Footer className="mt-[54px] justify-end">
              <Button
                size="lg"
                color="normal"
                type="submit"
                locked={!isValidProject}
              >
                생성하기
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    )
  );
}
