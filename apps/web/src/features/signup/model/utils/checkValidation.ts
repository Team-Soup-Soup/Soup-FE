import { type SignupItem } from '~/features/signup/types';
import { USER } from '~/features/signup/model';

export const checkValidation = (target: string, id: SignupItem): boolean => {
  switch (id) {
    case USER.EMAIL:
      return checkEmailValidation(target);
    case USER.ID:
      return checkUserNameValidation(target);
  }
  return false;
};

const checkEmailValidation = (target: string) => {
  return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(target);
};

const checkUserNameValidation = (target: string) => {
  return target?.length >= 5;
};
