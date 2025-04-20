export type CommentRequestType = {
  postId: number;
  commentParentId: number;
  content: string;
};

export type CommentUpdateRequestType = {
  commentId: number;
  content: string;
};
