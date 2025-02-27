import { USER } from '~/features/signup/model';

export type FormState = {
  [USER.ID]: boolean;
  [USER.EMAIL]: boolean;
};
