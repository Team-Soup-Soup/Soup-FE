import { z } from 'zod';
import { ERROR, USER } from '~/features/signup/model';
import { FormState } from '~/features/signup/types';

interface SignupSchemaProps {
  clicked: FormState;
  valid: FormState;
}

export default function useSignupSchema({ clicked, valid }: SignupSchemaProps) {
  const schema = z.object({
    [USER.NAME]: z.string().min(1, '*'),
    [USER.ID]: z
      .string()
      .min(1, '*')
      .refine(() => clicked[USER.ID], {
        message: ERROR.ID.ACTION_NOT_COMPLETED,
      })
      .refine(() => valid[USER.ID], { message: ERROR.ID.AUTH_FAILURE }),
    [USER.EMAIL]: z
      .string()
      .min(1, '*')
      .refine(() => clicked[USER.EMAIL], {
        message: ERROR.EMAIL.ACTION_NOT_COMPLETED,
      })
      .refine(() => valid[USER.EMAIL], { message: ERROR.EMAIL.AUTH_FAILURE }),
    [USER.PW]: z
      .string()
      .min(1, '*')
      .min(8, ERROR.PW.AUTH_FAILURE)
      .refine(
        (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password),
        {
          message: ERROR.PW.AUTH_EXCEPTION,
        },
      ),
  });
  return schema;
}
