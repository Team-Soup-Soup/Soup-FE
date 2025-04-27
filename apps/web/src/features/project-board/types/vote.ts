import { VOTE } from '~/features/project-board/model';

export type VoteSettingOption = keyof typeof VOTE;

export type VoteOptionRequest = {
  voteId: number;
  option: string;
};

export type VoteParticipationRequest = {
  voteSeq: number;
};
