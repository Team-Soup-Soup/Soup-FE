import { USER } from '~/features/signup/model';

export type AuthId = { authId: number };

export type SignupItem = keyof SignupInfo;

export type SignupInfo = {
  [key in (typeof USER)[keyof typeof USER]]: string;
};
