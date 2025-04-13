import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

type Token = {
  accessToken: string;
  refreshToken: string;
};

const initialUserState = {
  accessToken: '',
  refreshToken: '',
};

const sessionStorage = createJSONStorage(() => window.sessionStorage);

export const userAtom = atomWithStorage<Token>(
  'userToken',
  initialUserState,
  sessionStorage as AsyncStorage<Token>,
);

// const authAtom = atom<User | null>(null);

// auth 상태를 갱신하는 atom (초기, 로그인, 로그아웃 시)
// const initAuthAtom = atom(null, async (get, set) => {
//   const token = {
//     access: sessionStorage.getItem('accessToken'),
//     refresh: localStorage.getItem('refreshToken'),
//   };

//   if (token.access) {
//     const authResponse = await getMe();
//     if (authResponse.data) return set(authAtom, authResponse.data);
//   }

//   if (token.refresh) {
//     const refreshResponse = await refreshAccessToken();
//     if (refreshResponse.accessToken) {
//       sessionStorage.setItem('accessToken', refreshResponse.accessToken);

//       const authResponse = await getMe();
//       if (authResponse.data) return set(authAtom, authResponse.data);
//     }
//   }

//   return set(authAtom, null);
// });
