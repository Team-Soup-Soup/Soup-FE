import React from 'react';

import { Button } from '@soup/design-system';

import { BOARD_MODAL } from '~/shared/constants';
import { useModalState } from '~/shared/hooks';
import { MeetingTimeSelector, Modal } from '~/shared/ui';

export default function MeetingModal() {
  const { isOpen: join } = useModalState({ key: BOARD_MODAL.MEETING_JOIN });
  const { isOpen: result } = useModalState({ key: BOARD_MODAL.MEETING_RESULT });

  const isOpen = join || result;
  const modalKey = join ? BOARD_MODAL.MEETING_JOIN : BOARD_MODAL.MEETING_RESULT;

  return (
    isOpen && (
      <Modal size="md" title="회의플래너" modalKey={modalKey}>
        <Modal.Header title="회의플래너" />
        {join && <MeetingJoin />}
        {result && <MeetingResult />}
      </Modal>
    )
  );
}

const MeetingJoin = () => (
  <div className="flex h-full flex-col justify-between">
    <div>
      <MeetingTimeSelector />
    </div>

    <div className="flex w-full justify-end">
      <Button color="normal" className="mb-[20px] w-fit">
        저장하기
      </Button>
    </div>
  </div>
);

const MeetingResult = () => <>결과다</>;
