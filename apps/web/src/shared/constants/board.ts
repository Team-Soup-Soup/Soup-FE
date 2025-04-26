import { BoardItem } from '~/shared/types';
import noticeIcon from '~/assets/icons/board-notice.svg';
import meetingIcon from '~/assets/icons/board-meeting.svg';
import voteIcon from '~/assets/icons/board-vote.svg';
import peerReviewIcon from '~/assets/icons/board-peer-review.svg';
import freeTextIcon from '~/assets/icons/board-free-text.svg';

export const BOARD = {
  '01': {
    title: '공지',
    icon: noticeIcon,
    color: '#FFD993',
  },
  '02': {
    title: '자유글',
    icon: freeTextIcon,
    color: '#F6F3FB',
  },
  '03': {
    title: '투표',
    icon: voteIcon,
    color: '#F8F1E3',
  },
  '04': {
    title: '동료평가',
    icon: peerReviewIcon,
    color: '#FFF7E1',
  },
  '05': {
    title: '회의플래너',
    icon: meetingIcon,
    color: '#F1F0EE',
  },
} as const;

export const BOARD_LABEL: BoardItem[] = Object.keys(BOARD) as BoardItem[];
