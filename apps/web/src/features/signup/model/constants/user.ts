import { FormItem, SignupInfoProp } from '~/features/signup/types';

export const UserProperty: Record<FormItem, SignupInfoProp> = {
  NAME: 'userId',
  ID: 'username',
  EMAIL: 'email',
  PW: 'password',
};
