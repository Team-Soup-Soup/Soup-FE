import React from 'react';

import { Button } from '@soup/design-system';

import { BOARD_MODAL } from '~/shared/constants';
import { useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';

export default function PeerReviewModal() {
  const { isOpen: join } = useModalState({ key: BOARD_MODAL.PEER_REVIEW_JOIN });
  const { isOpen: result } = useModalState({
    key: BOARD_MODAL.PEER_REVIEW_RESULT,
  });

  const isOpen = join || result;
  const modalKey = join
    ? BOARD_MODAL.PEER_REVIEW_JOIN
    : BOARD_MODAL.PEER_REVIEW_RESULT;

  return (
    isOpen && (
      <Modal size="md" title="동료평가" modalKey={modalKey}>
        <Modal.Header title="동료평가" />
        {join && <PeerReviewJoin />}
        {result && <PeerReviewResult />}
      </Modal>
    )
  );
}

const PeerReviewJoin = () => (
  <div className="flex h-full flex-col justify-between">
    <div></div>

    <div className="flex w-full justify-end">
      <Button color="normal" className="mb-[20px] w-fit">
        저장하기
      </Button>
    </div>
  </div>
);

const PeerReviewResult = () => <>결과다</>;
