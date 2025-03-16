import React from 'react';

import { BOARD, MODAL } from '~/shared/constants';
import { useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import type { BoardItem } from '~/shared/types';
import {
  CreateMeeting,
  CreateNormalPost,
  CreatePeerReview,
  CreateVote,
} from '~/widgets/modal/ui/create-post';

export default function CreatePostModal({ type }: { type: BoardItem }) {
  const { isOpen } = useModalState({ key: MODAL.CREATE_POST });
  const title = BOARD[type].title;
  const components = {
    공지: <CreateNormalPost notice />,
    투표: <CreateVote />,
    회의플래너: <CreateMeeting />,
    동료평가: <CreatePeerReview />,
    자유글: <CreateNormalPost />,
  };

  return (
    isOpen && (
      <Modal title={title} modalKey={MODAL.CREATE_POST}>
        <Modal.Header title={title} />
        {components[title]}
      </Modal>
    )
  );
}
