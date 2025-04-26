import React from 'react';

import { Button, Checkbox } from '@soup/design-system';
import { cn } from '@soup/utils';

import PlusIcon from '~/assets/icons/plus.svg';

import { VotePost } from '~/shared/types';
import { getDate } from '~/shared/utils';

import { useVoteContent } from '../model';

export default function VoteContent({
  duplicateYn,
  optionAddYn,
  anonymousYn,
  voteId,
  options,
  endDt,
}: VotePost) {
  const {
    isChecked,
    handleAddOption,
    handleCancel,
    handleConfirm,
    handleSelectOption,
    handleSubmitVote,
    addOption,
    option,
    setOption,
  } = useVoteContent({ voteId: voteId });

  const voteOptions = {
    duplicateYn: duplicateYn === 'Y',
    optionAddYn: optionAddYn === 'Y',
    anonymousYn: anonymousYn === 'Y',
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
        {options.map(({ voteSeq, option }) => (
          <button
            key={voteSeq}
            onClick={() => handleSelectOption(voteSeq)}
            className={cn(
              isChecked(voteSeq) ? 'border-point' : 'border-main-board-border',
              'hover:border-point rounded-auth flex w-full cursor-pointer gap-x-4 border-[1px] p-4 focus:outline-none',
            )}
          >
            <Checkbox
              checked={isChecked(voteSeq)}
              onChange={() => handleSelectOption(voteSeq)}
              id={`vote-option-${voteSeq}`}
              aria-label={option}
            />
            <label htmlFor={`vote-option-${voteSeq}`}>{option}</label>
          </button>
        ))}
      </div>

      {voteOptions.optionAddYn && (
        <>
          {addOption ? (
            <div className="rounded-auth bg-lock flex w-full gap-x-4 p-4">
              <Checkbox id="newitem" disabled={true} />
              <input
                type="text"
                placeholder="항목 입력"
                className="h-fit w-full rounded-[10px] bg-transparent p-0 font-light focus:outline-none"
                aria-label="새 항목 입력"
                value={option}
                onChange={(e) => setOption(e.target.value)}
              />
            </div>
          ) : (
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
              <Button color="normal" onClick={handleSubmitVote}>
                투표하기
              </Button>
            </div>
          )}
        </>
      )}

      {!addOption && !voteOptions.optionAddYn && (
        <div className="mb-6 mt-2">
          <Button color="normal" onClick={handleSubmitVote}>
            투표하기
          </Button>
        </div>
      )}

      <p>마감기한 : {getDate(endDt, 'YYYY. MM. DD')}</p>
    </div>
  );
}
