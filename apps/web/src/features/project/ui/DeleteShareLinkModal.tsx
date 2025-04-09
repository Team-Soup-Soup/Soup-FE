import React, { ChangeEvent, useState } from 'react';

import { useForm } from 'react-hook-form';

import { Button, Input } from '@soup/design-system';

import { MODAL, SHARE_LINK_MAX_LENGTH } from '~/shared/constants';
import { useModal, useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';

import ImageIcon from '~/assets/icons/image.svg';

export default function DeleteShareLinkModal() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.DELETE_SHARE_LINK });
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const { name, image } = watch();

  const isFormValid = name?.length > 0;

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

  const formSubmit = () => {
    const formData = new FormData();
    formData.append('file', file!);
    closeModal(MODAL.DELETE_SHARE_LINK);
    reset();
  };

  return (
    isOpen && (
      <Modal
        size="sm"
        className="min-h-[400px]"
        modalKey={MODAL.DELETE_SHARE_LINK}
      >
        <form
          className="flex size-full flex-col"
          onSubmit={handleSubmit(formSubmit)}
        >
          <Modal.Header title="공유링크" />
          <Modal.Body className="flex-1 justify-between">
            <div className="flex flex-col gap-y-2">
              <Modal.Section>
                <label htmlFor="file">
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageInputChange}
                    className="hidden"
                  />
                  <div className="flex h-full cursor-pointer items-center gap-x-2 pb-4">
                    {image ? (
                      <div
                        className="size-8 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                      />
                    ) : (
                      <img src={ImageIcon} alt="이미지" className="size-8" />
                    )}
                    <span className="text-light font-light">이미지 업로드</span>
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
            <Modal.Footer className="flex justify-end">
              <Button
                color="normal"
                className="focus:outline-none"
                locked={!isFormValid}
                type="submit"
              >
                확인
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    )
  );
}
