import React, { useState } from 'react';

import { Button, Checkbox } from '@soup/design-system';
import type {
  BoardItem,
  PeerReviewPost,
  PostType,
  VotePost,
} from '~/shared/types';
import PlusIcon from '~/assets/icons/plus.svg';
import { getDate } from '~/shared/utils';
import { BOARD } from '~/shared/constants';

interface ProjectPostContentProps {
  category: string;
  content: PostType;
}

export default function ProjectPostContent({
  category,
  content,
}: ProjectPostContentProps) {
  const RenderContent = (key: string) => {
    const [addOption, setAddOption] = useState<boolean>(false);
    if (key === '동료평가' || key === '회의플래너') {
      const peer = content as PeerReviewPost;
      return (
        <div className="flex flex-col gap-y-8">
          <p>{key}가 형성되었습니다.</p>
          {key === '동료평가' && (
            <p>
              평가는 익명으로 진행되며, 아래 '{key} 참여하기' 버튼을 눌러
              참여해봐요!
            </p>
          )}
          <p>마감기한 : {getDate(peer.deadLineDt, 'YYYY. MM. DD')}</p>
          <div>
            <Button size="md" color="point" className="font-light">
              {key} 참여하기
            </Button>
          </div>
        </div>
      );
    }
    if (key === '투표') {
      const vote = content as VotePost;
      const voteOptions = {
        duplicateYn: vote.duplicateYn === 'Y' ? true : false,
        optionAddYn: vote.optionAddYn === 'Y' ? true : false,
        anonymousYn: vote.anonymousYn === 'Y' ? true : false,
      };
      return (
        <div className="text-md mt-8 flex flex-col gap-y-2 font-light">
          <p className="flex gap-x-2">
            <span>
              {voteOptions.duplicateYn ? '복수 투표' : '단일 항목 투표'}
            </span>
            ·
            <span>
              {voteOptions.optionAddYn ? '항목 추가 허용' : '항목 추가 불가'}
            </span>
          </p>
          {vote.options.map((option) => (
            <div
              key={option.voteSeq}
              className="rounded-auth border-main-board-border flex w-full gap-x-4 border-[1px] p-4"
            >
              <Checkbox id={`${option.voteSeq + option.option}`} />
              {option.option}
            </div>
          ))}
          {voteOptions.optionAddYn && (
            <React.Fragment>
              {addOption && (
                <div className="rounded-auth bg-lock flex w-full gap-x-4 p-4">
                  <Checkbox id="newitem" disabled={true} />
                  <input
                    type="text"
                    placeholder="항목 입력"
                    className="h-fit w-full rounded-[10px] bg-transparent p-0 font-light focus:outline-none"
                  />
                </div>
              )}
              <button
                className="rounded-auth bg-lock flex w-full cursor-pointer items-center justify-center gap-x-4 p-4"
                onClick={() => setAddOption(true)}
              >
                <img src={PlusIcon} className="size-6" /> 항목 추가
              </button>
              {addOption ? (
                <div className="mb-6 mt-2 flex gap-x-4">
                  <Button color="sub">확인</Button>
                  <Button color="normal" onClick={() => setAddOption(false)}>
                    취소
                  </Button>
                </div>
              ) : (
                <div className="mb-6 mt-2">
                  <Button color="normal" onClick={() => setAddOption(false)}>
                    투표하기
                  </Button>
                </div>
              )}
            </React.Fragment>
          )}
          {!addOption && !voteOptions.optionAddYn && (
            <div className="mb-6 mt-2">
              <Button color="normal" onClick={() => setAddOption(false)}>
                투표하기
              </Button>
            </div>
          )}
          <p>마감기한 : {getDate(vote.endDt, 'YYYY. MM. DD')}</p>
        </div>
      );
    }
  };
  return (
    <div className="mb-25 text-md font-light">
      {'content' in content ? content.content : ''}
      {RenderContent(BOARD[category as BoardItem].title)}
    </div>
  );
}
