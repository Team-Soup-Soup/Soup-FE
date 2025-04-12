import { FormError, FormField, FormItem } from '~/features/signup/types';

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

export const ERROR: Record<'ID' | 'EMAIL' | 'PW', FormError> = {
  ID: {
    ACTION_NOT_COMPLETED: '*중복 확인 필요',
    AUTH_FAILURE: '*이미 사용중인 아이디입니다.',
    AUTH_EXCEPTION: '*인증에 실패했어요. 다시 시도해 주세요.',
  },
  EMAIL: {
    ACTION_NOT_COMPLETED: '*중복 확인 필요',
    AUTH_FAILURE: '*코드가 틀렸습니다.',
    AUTH_EXCEPTION: '*인증에 실패했어요. 다시 시도해 주세요.',
  },
  PW: {
    ACTION_NOT_COMPLETED: '*중복 확인 필요',
    AUTH_FAILURE: '*비밀번호는 8자 이상이어야 해요.',
    AUTH_EXCEPTION: '*영어, 특수문자, 숫자를 모두 포함해야 해요.',
  },
};
