import { type SignupInfoProp } from '~/features/signup/types';

export const checkValidation = (
  target: string,
  id: SignupInfoProp,
): boolean => {
  switch (id) {
    case 'email':
      return checkEmailValidation(target);
    case 'username':
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
