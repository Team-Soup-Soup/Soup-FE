import { type SignupInfoProp } from '~/features/signup/types';

export const checkValidation = (
  target: string,
  id: SignupInfoProp,
): boolean => {
  switch (id) {
    case 'email':
      return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(target);
    case 'username':
      return target?.length >= 5;
  }
  return false;
};
