import { MODAL } from '~/shared/constants';

export const DELETE_MODAL = {
  [MODAL.DELETE_COMMENT]: '댓글',
  [MODAL.DELETE_POST]: '게시글',
  [MODAL.DELETE_SCHEDULE]: '일정',
} as const;

export const DELETE_MODAL_KEYS = Object.keys(DELETE_MODAL);
