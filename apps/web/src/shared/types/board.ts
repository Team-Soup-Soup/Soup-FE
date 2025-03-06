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
