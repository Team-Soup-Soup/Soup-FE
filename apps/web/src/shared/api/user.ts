import { getDefaultStore } from 'jotai';
import axios, { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';

import { userAtom } from '~/shared/atoms';
import { REQUEST, post } from '~/shared/api';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface PostRequestParams<TData> {
  request: string;
  headers?: AxiosHeaders;
  data: TData;
}

const instance = axios.create({
  baseURL: 'http://student-p.p-e.kr/api',
});

instance.interceptors.request.use(async (config) => {
  const store = getDefaultStore();
  const { accessToken } = await store.get(userAtom);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const store = getDefaultStore();
      try {
        const { refreshToken } = await store.get(userAtom);
        const response = await post<
          { refreshToken: string },
          RefreshTokenResponse
        >({
          request: REQUEST.REFRESH,
          data: { refreshToken },
        });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;
        store.set(userAtom, {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      } catch (refreshError) {
        console.log(refreshError);
        store.set(userAtom, { accessToken: '', refreshToken: '' });
      }
    }
    return Promise.reject(error);
  },
);

export async function userPost<TData, TResponse = unknown>(
  config: PostRequestParams<TData>,
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, data } = config;
  try {
    const response = await instance.post<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >(request, data, {
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error)) throw new Error(error.message);
    else throw new Error('에러가 발생했습니다');
  }
}
