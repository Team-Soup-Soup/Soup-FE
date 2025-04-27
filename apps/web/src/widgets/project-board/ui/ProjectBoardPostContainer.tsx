import React from 'react';
import {
  MeetingModal,
  PeerReviewModal,
  ProjectPost,
} from '~/features/project-board/ui';
import { Breadcrumb } from '~/shared/ui';

export default function ProjectBoardPostContainer() {
  return (
    <div className="scrollbar-hide relative flex size-full flex-col overflow-scroll">
      <Breadcrumb />
      <ProjectPost />
      <MeetingModal />
      <PeerReviewModal />
    </div>
  );
}
