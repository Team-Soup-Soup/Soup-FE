import React, { useState } from 'react';

import { Button, Checkbox } from '@soup/design-system';

import PlusIcon from '~/assets/icons/plus.svg';
import { VotePost } from '~/shared/types';
import { getDate } from '~/shared/utils';

export default function VoteContent({ content }: { content: VotePost }) {
  const [addOption, setAddOption] = useState<boolean>(false);

  const voteOptions = {
    duplicateYn: content.duplicateYn === 'Y',
    optionAddYn: content.optionAddYn === 'Y',
    anonymousYn: content.anonymousYn === 'Y',
  };

  const handleAddOption = () => {
    setAddOption(true);
  };

  const handleCancel = () => {
    setAddOption(false);
  };

  const handleConfirm = () => {
    setAddOption(false);
  };

  return (
    <div className="text-md mt-8 flex flex-col gap-y-2 font-light">
      <p className="flex gap-x-2">
        <span>{voteOptions.duplicateYn ? '복수 투표' : '단일 항목 투표'}</span>·
        <span>
          {voteOptions.optionAddYn ? '항목 추가 허용' : '항목 추가 불가'}
        </span>
      </p>

      <div className="flex flex-col gap-y-2">
        {content.options.map((option) => (
          <div
            key={option.voteSeq}
            className="rounded-auth border-main-board-border flex w-full gap-x-4 border-[1px] p-4"
          >
            <Checkbox
              id={`vote-option-${option.voteSeq}`}
              aria-label={option.option}
            />
            <label htmlFor={`vote-option-${option.voteSeq}`}>
              {option.option}
            </label>
          </div>
        ))}
      </div>

      {voteOptions.optionAddYn && (
        <>
          {addOption && (
            <div className="rounded-auth bg-lock flex w-full gap-x-4 p-4">
              <Checkbox id="newitem" disabled={true} />
              <input
                type="text"
                placeholder="항목 입력"
                className="h-fit w-full rounded-[10px] bg-transparent p-0 font-light focus:outline-none"
                aria-label="새 항목 입력"
              />
            </div>
          )}

          {!addOption && (
            <button
              className="rounded-auth bg-lock flex w-full cursor-pointer items-center justify-center gap-x-4 p-4"
              onClick={handleAddOption}
              aria-label="항목 추가"
            >
              <img src={PlusIcon} className="size-6" alt="추가" /> 항목 추가
            </button>
          )}

          {addOption ? (
            <div className="mb-6 mt-2 flex gap-x-4">
              <Button color="sub" onClick={handleConfirm}>
                확인
              </Button>
              <Button color="normal" onClick={handleCancel}>
                취소
              </Button>
            </div>
          ) : (
            <div className="mb-6 mt-2">
              <Button color="normal">투표하기</Button>
            </div>
          )}
        </>
      )}

      {!addOption && !voteOptions.optionAddYn && (
        <div className="mb-6 mt-2">
          <Button color="normal">투표하기</Button>
        </div>
      )}

      <p>마감기한 : {getDate(content.endDt, 'YYYY. MM. DD')}</p>
    </div>
  );
}
