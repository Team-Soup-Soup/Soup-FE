import { atom } from 'jotai';

export const loginErrorAtom = atom({
  wrongCnt: 0,
  wrongType: '',
});
