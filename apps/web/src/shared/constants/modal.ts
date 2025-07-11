export const MODAL = {
  CREATE_PROJECT: 'createProject',
  CREATE_SCHEDULE: 'createSchedule',
  CREATE_POST: 'createPost',
  CREATE_GROUP_BOARD: 'createGroupBoard',
  CREATE_SHARE_LINK: 'createShareLink',
  LOGOUT: 'logout',
  SETTING: 'setting',
  ALARM: 'alarm',
  DELETE_POST: 'deletePost',
  DELETE_COMMENT: 'deleteComment',
  DELETE_SCHEDULE: 'deleteSchedule',
  DELETE_SHARE_LINK: 'deleteShareLink',
  UPDATE: 'update',
  MANAGE_PROJECT: 'manageProject',
  MANAGE_MEMBER: 'manageMember',
  INVITE_PROJECT: 'inviteProject',
  EXPULSION_PROJECT: 'expulsionProject',
  LEVEL_INFO: 'levelInfo',
  UPDATE_PROJECT: 'updateProject',
  LEVEL_PROJECT: 'levelProject',
  LOGIN_FAILED: 'loginFailed',
} as const;

export const BOARD_MODAL = {
  PEER_REVIEW_JOIN: 'peerReviewJoin',
  PEER_REVIEW_RESULT: 'peerReviewResult',
  MEETING_JOIN: 'meetingJoin',
  MEETING_RESULT: 'meetingResult',
} as const;

export const SETTING_ITEM = {
  PROFILE: '내 프로필',
  PASSWORD: '비밀번호 변경',
  ALARM: '알림설정',
  WITHDRAW: '회원탈퇴',
} as const;

export const PROFILE = {
  IMAGE: 'image',
  NAME: 'name',
} as const;

export const PASSWORD = {
  NOW_PASSWORD: 'nowPassword',
  NEW_PASSWORD: 'newPassword',
  CHECK_PASSWORD: 'checkPassword',
} as const;
