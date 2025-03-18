import React from 'react';

import type {
  BoardItem,
  PeerReviewPost,
  PostType,
  VotePost,
} from '~/shared/types';
import { BOARD } from '~/shared/constants';
import { PeerReviewContent, VoteContent } from '~/features/project-board/ui';

interface ProjectPostContentProps {
  category: string;
  content: PostType;
}

const isPeerReviewPost = (content: PostType): content is PeerReviewPost => {
  return 'deadLineDt' in content;
};

const isVotePost = (content: PostType): content is VotePost => {
  return 'options' in content && 'duplicateYn' in content;
};

export default function ProjectPostContent({
  category,
  content,
}: ProjectPostContentProps) {
  const boardTitle = BOARD[category as BoardItem]?.title || '';
  const textContent = 'content' in content ? content.content : '';

  const renderContentByType = () => {
    if (isPeerReviewPost(content)) {
      return <PeerReviewContent content={content} contentType={boardTitle} />;
    } else if (isVotePost(content)) {
      return <VoteContent content={content} />;
    }
    return null;
  };

  return (
    <div className="mb-25 text-md font-light">
      {textContent}
      {renderContentByType()}
    </div>
  );
}
