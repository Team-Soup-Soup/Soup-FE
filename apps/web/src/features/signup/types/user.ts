import { USER } from '../model';

export type SignupItem = keyof SignupInfo;

export type SignupInfo = {
  [USER.NAME]: string;
  [USER.ID]: string;
  [USER.EMAIL]: string;
  [USER.PW]: string;
};
