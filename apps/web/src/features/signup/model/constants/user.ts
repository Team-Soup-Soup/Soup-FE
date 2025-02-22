import { FormItem, SignupInfoProp } from '~/features/signup/types';

export const UserProperty: Record<FormItem, SignupInfoProp> = {
  NAME: 'name',
  ID: 'username',
  EMAIL: 'email',
  PW: 'password',
};
