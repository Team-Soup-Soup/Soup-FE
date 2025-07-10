interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * 쿠키 값을 가져옵니다
 * @param name 쿠키 이름
 * @returns 쿠키 값 또는 null
 */
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

/**
 * 쿠키를 설정합니다
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param options 쿠키 옵션
 */
export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {},
): void => {
  if (typeof document === 'undefined') return;

  const {
    expires,
    path = '/',
    domain,
    secure = false,
    sameSite = 'lax',
  } = options;

  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (expires) {
    if (expires instanceof Date) {
      cookieString += `; expires=${expires.toUTCString()}`;
    } else {
      const date = new Date();
      date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    }
  }

  if (path) cookieString += `; path=${path}`;
  if (domain) cookieString += `; domain=${domain}`;
  if (secure) cookieString += '; secure';
  if (sameSite) cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
};

/**
 * 쿠키를 삭제합니다
 * @param name 쿠키 이름
 * @param options 쿠키 옵션 (삭제 시 path와 domain이 필요할 수 있음)
 */
export const deleteCookie = (
  name: string,
  options: Pick<CookieOptions, 'path' | 'domain'> = {},
): void => {
  if (typeof document === 'undefined') return;

  const { path = '/', domain } = options;

  const expires = new Date(0);

  setCookie(name, '', {
    expires,
    path,
    domain,
    secure: false,
    sameSite: 'lax',
  });
};

/**
 * 쿠키가 존재하는지 확인합니다
 * @param name 쿠키 이름
 * @returns 쿠키 존재 여부
 */
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};

/**
 * 모든 쿠키를 가져옵니다
 * @returns 쿠키 객체
 */
export const getAllCookies = (): Record<string, string> => {
  if (typeof document === 'undefined') return {};

  const cookies: Record<string, string> = {};
  const cookieString = document.cookie;

  if (cookieString) {
    cookieString.split(';').forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    });
  }

  return cookies;
};

/**
 * 모든 쿠키를 삭제합니다
 */
export const clearAllCookies = (): void => {
  if (typeof document === 'undefined') return;

  const cookies = getAllCookies();
  Object.keys(cookies).forEach((cookieName) => {
    deleteCookie(cookieName);
  });
};
