import axios, { AxiosHeaders, AxiosResponse } from 'axios';

export type ErrorWithCause = {
  message: string;
  cause: { code: string; message: null | string; desc: string };
};

interface GetRequestParams<TParams> {
  request: string;
  headers?: AxiosHeaders;
  params: TParams;
}

interface PostRequestParams<TData> {
  request: string;
  headers?: AxiosHeaders;
  data: TData;
}

const instance = axios.create({
  baseURL: 'http://student-p.p-e.kr/api',
});

export async function get<TResponse, TParams = unknown>(
  config: GetRequestParams<TParams>,
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, params } = config;
  try {
    const response = await instance.get<TResponse>(request, {
      params: params,
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error)) throw new Error(error.message);
    else throw new Error('에러가 발생했습니다');
  }
}

export async function post<TData, TResponse = unknown>(
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
    if (axios.isAxiosError(error))
      throw new Error(error.message, { cause: error.response?.data });
    else throw new Error('에러가 발생했습니다');
  }
}
