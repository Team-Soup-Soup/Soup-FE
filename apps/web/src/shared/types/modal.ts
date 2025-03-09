import { MODAL, PROFILE, SETTING_ITEM } from '../constants';

export type ModalItem = (typeof MODAL)[keyof typeof MODAL];

export type ProfileSettingItem = {
  [key in (typeof PROFILE)[keyof typeof PROFILE]]: string;
};

export type AlarmSettingItem = {
  postComment: boolean;
  boardComment: boolean;
  boardQuestion: boolean;
  questionComment: boolean;
};

export type SettingItem = (typeof SETTING_ITEM)[keyof typeof SETTING_ITEM];

export type ModalRef = {
  handleSubmit: () => Promise<void>;
  isValid: boolean;
};
