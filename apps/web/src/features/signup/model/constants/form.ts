import { FormField, FormItem } from '~/features/signup/types';

export const FORM: Record<FormItem, FormField> = {
  NAME: {
    label: '이름',
    placeholder: '이름을 입력해주세요',
    description: '이름 입력 최대 10자',
    button: null,
  },
  ID: {
    label: '아이디',
    placeholder: '아이디를 입력해주세요',
    description: '아이디 입력 최소 5자',
    button: '중복 확인',
  },
  EMAIL: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
    description: null,
    button: '코드 전송',
  },
  PW: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
    description: '영어 + 특수문자 + 숫자 조합으로 최소 8자',
    button: null,
  },
};

export const FORM_LABELS: (keyof typeof FORM)[] = Object.keys(
  FORM,
) as (keyof typeof FORM)[];
