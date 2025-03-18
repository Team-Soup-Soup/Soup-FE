import { VoteSettingOption } from '~/widgets/modal/types';

export const VOTE = {
  duplicateYn: '중복 투표',
  anonymousYn: '익명 투표',
  optionAddYn: '항목 추가 허용',
} as const;

export const VOTE_SETTING_OPTIONS = Object.keys(VOTE).map(
  (val) => val as VoteSettingOption,
);
