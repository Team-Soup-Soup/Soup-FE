import { BOARD } from '~/shared/constants';

export type BoardItem = keyof typeof BOARD;
export type BoardItemValue = (typeof BOARD)[keyof typeof BOARD]['title'];

export type BoardContent = {
  postId: number;
  category: BoardItem;
  title: string;
  createBy: string;
  createAt: string;
  commentCnt: number;
};

export type DetailedBoardContent = Omit<
  BoardContent,
  'commentCnt' | 'postId'
> & {
  updateBy: string;
  updateAt: string;
  comments: Comment[];
  content: PostType;
};

export type Comment = {
  commentId: number;
  content: string;
  parentId: number;
  createAt: string;
};

export type PostType =
  | BasicPost
  | NoticePost
  | VotePost
  | PeerReviewPost
  | MeetingPost;

export type BasicPost = {
  content: string;
};

export type NoticePost = BasicPost & {
  fixYn: 'Y' | 'N';
};

export type VotePost = BasicPost & {
  voteId: number;
  title: string;
  duplicateYn: 'Y' | 'N';
  optionAddYn: 'Y' | 'N';
  anonymousYn: 'Y' | 'N';
  startDt: string;
  endDt: string;
  createBy: string;
  createAt: string;
  options: VoteOption[];
};

export type VoteOption = {
  voteSeq: number;
  option: string;
};

export type MeetingPost = {
  title: string;
  deadLineDt: string;
  joinYn: string;
  createBy: string;
  createAt: string;
};

export type PeerReviewPost = MeetingPost & {
  reviewComments?: PeerReviewComment[];
};

export type PeerReviewComment = {
  reviewId: number;
  reviewee: string;
  competent: number;
  promise: number;
  collaboration: number;
  reviewComment: string;
};
