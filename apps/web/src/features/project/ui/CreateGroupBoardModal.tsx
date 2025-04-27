import React, { ChangeEvent } from 'react';

import { useForm } from 'react-hook-form';

import { Button, Input } from '@soup/design-system';

import { Modal } from '~/shared/ui';
import { useModal, useModalState } from '~/shared/hooks';
import { MODAL, TITLE_MAX_LENGTH } from '~/shared/constants';
import { TEMPLATE } from '~/features/project/model';

import ImageIcon from '~/assets/icons/image.svg';

export default function CreateGroupBoardModal() {
  const { closeModal } = useModal();
  const { isOpen } = useModalState({ key: MODAL.CREATE_GROUP_BOARD });
  const { register, handleSubmit, watch, setValue } = useForm();
  const { title, image } = watch();
  const isFormValid = title?.length > 0;

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    closeModal(MODAL.CREATE_GROUP_BOARD);
  };

  return (
    isOpen && (
      <Modal size="md" title="대시보드" modalKey={MODAL.CREATE_GROUP_BOARD}>
        <Modal.Header title="대시보드" />
        <Modal.Body className="h-fit min-w-[826px] font-light">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-col gap-8">
              <Modal.Section>
                <label htmlFor="file">
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageInputChange}
                    className="hidden"
                  />
                  <div
                    className="h-30 border-main-board-border grid w-[206px] cursor-pointer place-content-center rounded-md border-[1px] border-dotted bg-cover bg-center"
                    style={{ backgroundImage: `url(${image ?? ''})` }}
                  >
                    {!image && (
                      <button className="flex flex-col items-center focus:outline-none">
                        <img src={ImageIcon} alt="이미지" className="size-14" />
                        <span className="text-sm">이미지 업로드</span>
                      </button>
                    )}
                  </div>
                </label>
              </Modal.Section>
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
              <Modal.Section title="템플릿">
                <div className="w-[calc(826px - 80px)] scrollbar-hide flex h-[230px] gap-x-4 overflow-scroll px-6">
                  {TEMPLATE.map(({ title, image, description }) => (
                    <div
                      key={title}
                      className="rounded-auth hover:bg-lock flex h-full w-[180px] flex-shrink-0 cursor-pointer flex-col gap-y-[14px] p-2"
                    >
                      <div
                        className="border-main-board-border rounded-auth h-[142px] w-full border-[1px] bg-cover"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                      <div className="flex flex-col">
                        {title}
                        <span className="text-light text-sm">
                          {description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Modal.Section>
              <Modal.Section
                title="편집 가능한 멤버 선택"
                description="클래식 등급의 멤버만 표시됩니다."
              >
                <div className="h-31 rounded-auth bg-lock scrollbar-hide grid w-full grid-cols-3 gap-3 overflow-y-scroll p-[14px]">
                  {/** UserItem 추가예정.. */}
                </div>
              </Modal.Section>
            </div>
            <Modal.Footer className="mt-4 justify-end">
              <Button size="lg" color="normal" locked={!isFormValid}>
                생성하기
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    )
  );
}
