import { atom } from 'jotai';

type Token = {
  accessToken: string;
  refreshToken: string;
};

const initialUserState = {
  accessToken: '',
  refreshToken: '',
};

export const userAtom = atom<Token>(initialUserState);
