import React, {
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import { useForm } from 'react-hook-form';

import { Input } from '@soup/design-system';

import { MODAL, SHARE_LINK_MAX_LENGTH } from '~/shared/constants';
import { useModal, useModalState, useProjectId } from '~/shared/hooks';
import { Button, Modal } from '~/shared/ui';

import ImageIcon from '~/assets/icons/image.svg';
import {
  useFetchShareLink,
  useSubmitShareLink,
  useUpdateSharedLink,
} from '../api';
import type { ShareLink } from '../types';

interface AddShareLinkModalProps {
  defaultValues?: ShareLink;
  isEditMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setSelectedLink: Dispatch<SetStateAction<ShareLink | undefined>>;
}

export default function AddShareLinkModal({
  defaultValues,
  isEditMode,
  setEditMode,
  setSelectedLink,
}: AddShareLinkModalProps) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const { closeModal } = useModal();
  const { isOpen } = useModalState({
    key: MODAL.CREATE_SHARE_LINK,
  });

  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const { name, image, link } = watch();
  const projectId = useProjectId();

  useEffect(() => {
    if (isOpen && defaultValues) {
      setValue('name', defaultValues.linkTitle);
      setValue('link', defaultValues.link);
      setValue('image', defaultValues.files?.url ?? '');
      setFile(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, defaultValues]);

  const { refetch: refetchShareLink } = useFetchShareLink(projectId);
  const { mutate: submitShareLink } = useSubmitShareLink(projectId);
  const { mutate: updateShareLink } = useUpdateSharedLink();

  const isFormValid = Boolean(
    name &&
      name.length > 0 &&
      image &&
      image.length > 0 &&
      link &&
      link.length > 0,
  );

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setValue('image', null);
    }
  };

  const formUpdate = () => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('title', name!);
    formData.append('link', link!);
    formData.append('projectId', `${projectId}`);
    formData.append('linkId', `${defaultValues?.linkId}`);
    updateShareLink(formData, {
      onSuccess: () => {
        refetchShareLink();
        closeModal(MODAL.CREATE_SHARE_LINK);
        setEditMode(false);
        setSelectedLink(undefined);
        reset();
      },
    });
  };

  const formSubmit = () => {
    const formData = new FormData();
    formData.append('file', file!);
    formData.append('name', name!);
    formData.append('link', link!);
    formData.append('projectId', `${projectId}`);
    submitShareLink(formData, {
      onSuccess: () => {
        closeModal(MODAL.CREATE_SHARE_LINK);
        refetchShareLink();
        setSelectedLink(undefined);
        reset();
      },
    });
  };

  return isOpen ? (
    <Modal size="md" modalKey={MODAL.CREATE_SHARE_LINK}>
      <form
        className="flex size-full flex-col"
        onSubmit={handleSubmit(isEditMode ? formUpdate : formSubmit)}
      >
        <Modal.Header title="공유링크" intent="shareLink" />
        <Modal.Body className="flex-1 justify-between">
          <div className="flex flex-col gap-y-[8px]">
            <Modal.Section>
              <label htmlFor="file">
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleImageInputChange}
                  className="hidden"
                />
                <div className="flex h-full cursor-pointer items-center gap-x-3 pb-4">
                  {image ? (
                    image.startsWith('data:image') ? (
                      <div
                        className="size-12 bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                    ) : (
                      <img
                        src={`http://student-p.p-e.kr/download/${image}`}
                        alt="이미지"
                        className="size-12 object-cover object-center"
                      />
                    )
                  ) : (
                    <img src={ImageIcon} alt="이미지" className="size-12" />
                  )}
                  <span className="text-light font-light">
                    이미지 {image ? '변경하기' : '등록하기'}
                  </span>
                </div>
              </label>
            </Modal.Section>
            <Modal.Section title="이름">
              <Input
                id="name"
                value={watch('name') || ''}
                maxLength={SHARE_LINK_MAX_LENGTH}
                inputClassName="bg-lock h-[42px] p-6 border-none"
                placeholder="링크의 이름을 입력해주세요."
                {...register('name', {
                  required: '링크의 이름을 입력해 주세요',
                })}
              />
            </Modal.Section>
            <Modal.Section title="링크">
              <Input
                id="link"
                value={watch('link') || ''}
                inputClassName="bg-lock h-[42px] p-6 border-none"
                placeholder="URL을 복사 + 붙여넣기 해 주세요."
                {...register('link', { required: 'URL을 입력해 주세요' })}
              />
            </Modal.Section>
          </div>
          <Modal.Footer className="mt-8 flex justify-end">
            <Button
              status={isFormValid ? 'normal' : 'locked'}
              intent="shareLink"
              disabled={!isFormValid}
              type="submit"
              size="lg"
            >
              저장하기
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </form>
    </Modal>
  ) : null;
}
