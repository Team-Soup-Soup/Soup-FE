import { MODAL, SECURITY, SETTING_ITEM } from '../constants';

export type ModalItem = (typeof MODAL)[keyof typeof MODAL];

export type SecuritySettingItem = {
  [key in (typeof SECURITY)[keyof typeof SECURITY]]: string;
};

export type ProfileSettingItem = {
  image: string;
  name: string;
  toggles: {
    postComment: boolean;
    boardComment: boolean;
    boardQuestion: boolean;
    questionComment: boolean;
  };
};

export type SettingItem = (typeof SETTING_ITEM)[keyof typeof SETTING_ITEM];
