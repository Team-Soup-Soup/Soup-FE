import React from 'react';

import { Button } from '@soup/design-system';

import { getDate } from '~/shared/utils';
import { PeerReviewPost } from '~/shared/types';

export default function PeerReviewContent({
  content,
  contentType,
}: {
  content: PeerReviewPost;
  contentType: string;
}) {
  return (
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
        <Button size="md" color="point" className="font-light">
          {contentType} 참여하기
        </Button>
      </div>
    </div>
  );
}
