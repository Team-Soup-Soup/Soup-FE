import { clearAllCookies } from './cookie';

export const logout = () => {
  sessionStorage.removeItem('userToken');
  clearAllCookies();
  window.location.reload();
};
