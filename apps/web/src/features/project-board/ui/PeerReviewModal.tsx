import React from 'react';

import { Button, Select } from '@soup/design-system';

import { BOARD_MODAL } from '~/shared/constants';
import { useModalState } from '~/shared/hooks';
import { Modal } from '~/shared/ui';
import StarSelector from './StarSelector';

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
  <>
    <Modal.Body className="scrollbar-hide overflow-scroll">
      <Select
        className="mb-[60px]"
        options={[{ name: 'h1' }]}
        onChangeValue={() => {}}
      />
      <div className="flex h-[100%] w-full flex-col gap-8 font-light">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-md">맡은 임무를 잘 수행하였나요?</span>
            <StarSelector />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-md">약속 시간을 잘 지키나요?</span>
            <StarSelector />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-md">프로젝트에 있어 협조적인가요?</span>
            <StarSelector />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md">
            해당 멤버에게 해주고 싶은 말을 자유롭게 작성해주세요.
          </span>
          <textarea
            className="bg-lock text-md h-90 w-full resize-none rounded-[10px] p-6 font-light focus:outline-none"
            placeholder="내용 입력"
          />
        </div>
      </div>
    </Modal.Body>

    <Modal.Footer className="flex justify-end">
      <Button color="normal" className="my-[20px] w-fit">
        저장하기
      </Button>
    </Modal.Footer>
  </>
);

const PeerReviewResult = () => <>결과다</>;
