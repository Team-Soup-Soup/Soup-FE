export const MODAL = {
  CREATE_PROJECT: 'createProject',
  LOGOUT: 'logout',
  SETTING: 'setting',
  ALARM: 'alarm',
  UPDATE: 'update',
} as const;

export const SETTING_ITEM = {
  PROFILE: '내 계정',
  ALARM: '알림설정',
  WITHDRAW: '회원탈퇴',
} as const;

export const PROFILE = {
  IMAGE: 'image',
  NAME: 'name',
  NOW_PASSWORD: 'nowPassword',
  NEW_PASSWORD: 'newPassword',
  CHECK_PASSWORD: 'checkPassword',
} as const;
