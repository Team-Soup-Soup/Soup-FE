import { MODAL } from '../constants';

export type ModalItem = (typeof MODAL)[keyof typeof MODAL];

export type SecuritySettingItem = {
  nowPassword: string;
  newPassword: string;
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
