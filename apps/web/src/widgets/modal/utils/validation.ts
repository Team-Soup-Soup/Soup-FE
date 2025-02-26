import { PROFILE_MAX_LENGTH } from '~/shared/constants';

export const isValidName = (name: string) => {
  return name.length > 0 && name.length <= PROFILE_MAX_LENGTH.NAME;
};

export const isValidPassword = (nowPassword: string, newPassword: string) => {
  return nowPassword.length > 8 && newPassword.length > 8;
};
