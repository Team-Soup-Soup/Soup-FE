import React from 'react';

import { Button } from '@soup/design-system';

import { getDate } from '~/shared/utils';
import { PeerReviewPost } from '~/shared/types';
import { useModal } from '~/shared/hooks';
import { BOARD_MODAL } from '~/shared/constants';

export default function PeerReviewContent({
  content,
  contentType,
}: {
  content: PeerReviewPost;
  contentType: '동료평가' | '회의플래너';
}) {
  const { openModal } = useModal();
  const { deadLineDt } = content;

  const isEnded = deadLineDt ? new Date(deadLineDt) < new Date() : false;

  const handleButtonClick = () => {
    if (isEnded) {
      if (contentType === '동료평가') openModal(BOARD_MODAL.PEER_REVIEW_RESULT);
      if (contentType === '회의플래너') openModal(BOARD_MODAL.MEETING_RESULT);
    } else {
      if (contentType === '동료평가') openModal(BOARD_MODAL.PEER_REVIEW_JOIN);
      if (contentType === '회의플래너') openModal(BOARD_MODAL.MEETING_JOIN);
    }
  };

  return (
    <div className="mb-25 text-md font-light">
      <div className="flex flex-col gap-y-8">
        <p>{contentType}가 형성되었습니다.</p>
        {contentType === '동료평가' && (
          <p>
            평가는 익명으로 진행되며, 아래 '{contentType} 참여하기' 버튼을 눌러
            참여해봐요!
          </p>
        )}
        <p>마감기한 : {getDate(content.deadLineDt, 'YYYY. MM. DD')}</p>
        <div>
          <Button
            size="md"
            color="point"
            className="font-light"
            onClick={handleButtonClick}
          >
            {contentType} 참여하기
          </Button>
        </div>
      </div>
    </div>
  );
}
