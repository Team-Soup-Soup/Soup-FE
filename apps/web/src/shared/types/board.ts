import { BOARD } from '~/shared/constants';

export type BoardItem = keyof typeof BOARD;
export type BoardItemValue = (typeof BOARD)[keyof typeof BOARD]['title'];

export type BoardContent = {
  postId: number;
  category: string;
  title: string;
  createBy: string;
  createAt: string;
  commentCnt: number;
};

export type DetailedBoardContent = {
  title: string;
  category: string;
  createdBy: string;
  createAt: string;
  updateBy: string;
  updateAt: string;
  comments: Comment[];
  content: string /*일단 String, 다른 타입 사용 예정*/;
};

export type Comment = {
  commentId: number;
  content: string;
  parentId: number;
  createAt: string;
};
