import { FormItem, SignupInfoProp } from '~/features/signup/types';

export const USER: Record<FormItem, SignupInfoProp> = {
  NAME: 'userId',
  ID: 'username',
  EMAIL: 'email',
  PW: 'password',
};
