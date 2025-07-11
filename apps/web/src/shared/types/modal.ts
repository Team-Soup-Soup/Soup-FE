import {
  BOARD_MODAL,
  MODAL,
  PASSWORD,
  PROFILE,
  SETTING_ITEM,
} from '../constants';

type NormalModal = (typeof MODAL)[keyof typeof MODAL];
type BoardModal = (typeof BOARD_MODAL)[keyof typeof BOARD_MODAL];

export type ModalItem = NormalModal | BoardModal;

export type ProfileSettingItem = {
  [key in (typeof PROFILE)[keyof typeof PROFILE]]: string;
};

export type PasswordSettingItem = {
  [key in (typeof PASSWORD)[keyof typeof PASSWORD]]: string;
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
