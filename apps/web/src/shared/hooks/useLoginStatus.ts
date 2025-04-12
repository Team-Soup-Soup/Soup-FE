import { useAtomValue } from 'jotai';
import { userAtom } from '~/shared/atoms';

export default function useLoginStatus() {
  const token = useAtomValue(userAtom);
  const isAuthenticated = token.accessToken.length > 0;
  return isAuthenticated;
}
