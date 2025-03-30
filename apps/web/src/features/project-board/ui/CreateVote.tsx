import React, { useState } from 'react';

import {
  useForm,
  type UseFormSetValue,
  type UseFormWatch,
} from 'react-hook-form';

import { Button, Checkbox, Input } from '@soup/design-system';

import { DatePicker, Modal, TimePicker } from '~/shared/ui';
import { getDate } from '~/shared/utils';
import type {
  VotePostRequest,
  VoteSettingOption,
} from '~/features/project-board/types';
import PlusIcon from '~/assets/icons/plus.svg';
import { useModal } from '~/shared/hooks';
import { MODAL, TITLE_MAX_LENGTH } from '~/shared/constants';
import { VOTE, VOTE_SETTING_OPTIONS } from '../model';

interface SettingCheckBoxProps {
  option: VoteSettingOption;
  setValue: UseFormSetValue<VotePostRequest>;
  watch: UseFormWatch<VotePostRequest>;
}

export default function CreateVote() {
  const { closeModal } = useModal();
  const [options, setOption] = useState<number[]>([1, 2, 3]);
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<VotePostRequest>({
    defaultValues: {
      startDt: new Date().toLocaleDateString(),
      endDt: '',
      duplicateYn: 'N',
      anonymousYn: 'N',
      optionAddYn: 'N',
      options: [{ option: '' }, { option: '' }, { option: '' }],
    },
  });

  const isFormValid =
    watch('title')?.length > 0 &&
    watch('content')?.length > 0 &&
    watch('options.1.option')?.length > 0 &&
    watch('options.0.option')?.length > 0;

  const handleAddButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOption((prev) => [...prev, prev.length + 1]);
  };

  const formSubmit = (data: VotePostRequest) => {
    const formattedData = {
      ...data,
      endDt: date.toLocaleDateString(),
      options: data.options.filter((option) => option.option.trim().length > 0),
    };
    console.log(formattedData);
    closeModal(MODAL.CREATE_POST);
  };

  return (
    <>
      <Modal.Body className="min-w-150 h-230 font-light">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="flex flex-col gap-y-8">
            <Modal.Section title="제목">
              <Input
                id="title"
                placeholder="제목을 입력해주세요."
                value={watch('title') || ''}
                maxLength={TITLE_MAX_LENGTH}
                inputClassName="bg-lock h-[42px] p-6 border-none"
                {...register('title', { required: '제목을 입력해 주세요' })}
              />
            </Modal.Section>
            <Modal.Section title="내용">
              <textarea
                id="content"
                className="bg-lock h-40 w-full resize-none rounded-[10px] p-6 font-light focus:outline-none"
                placeholder="본문을 입력해주세요."
                {...register('content', { required: '제목을 입력해 주세요' })}
              />
              <p className="text-light text-end">
                생성/완료된 투표는 <u>게시판으로 자동 게시</u>되며,
                <u>수정 불가능</u>
                합니다.
              </p>
            </Modal.Section>
            <Modal.Section title="마감 기한">
              <div className="flex gap-x-2">
                <DatePicker key="createVote" date={date} setDate={setDate} />
                <span
                  className="border-main-board-border rounded-auth relative cursor-pointer border-[1px] px-5 py-2"
                  onClick={() => setVisible((prev) => !prev)}
                >
                  {getDate(new Date().toLocaleDateString(), 'HH: MM')}
                  {visible && <TimePicker />}
                </span>
              </div>
            </Modal.Section>
            <Modal.Section title="항목">
              <div className="h-58 scrollbar-hide flex flex-col gap-y-[1px] overflow-scroll">
                {options.map((option) => (
                  <Input
                    id={`option${option}`}
                    key={`option${option}`}
                    placeholder="항목 입력"
                    inputClassName="bg-lock h-[42px] p-6 border-none"
                    {...register(`options.${option - 1}.option`)}
                  />
                ))}
                <AddOptionButton onClick={handleAddButton} />
              </div>
              <div className="mt-1 flex gap-x-[42px]">
                {VOTE_SETTING_OPTIONS.map((option) => (
                  <SettingCheckBox
                    key={option}
                    option={option}
                    setValue={setValue}
                    watch={watch}
                  />
                ))}
              </div>
            </Modal.Section>
          </div>
          <Modal.Footer className="justify-end">
            <Button
              size="lg"
              color="normal"
              locked={!isFormValid}
              type="submit"
            >
              게시하기
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </>
  );
}

const SettingCheckBox = ({ option, setValue, watch }: SettingCheckBoxProps) => (
  <Checkbox
    id={option}
    label={VOTE[option]}
    checked={watch(option) === 'Y'}
    onChange={(e) => {
      const value = e.target.checked ? 'Y' : 'N';
      setValue(option, value);
    }}
  />
);

const AddOptionButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => (
  <button
    className="text-light rounded-auth border-main-board-border mt-2 flex h-[42px] flex-shrink-0 cursor-pointer items-center justify-center border-[1px] focus:outline-none"
    onClick={onClick}
  >
    <img src={PlusIcon} className="size-6" />
    항목 추가
  </button>
);
