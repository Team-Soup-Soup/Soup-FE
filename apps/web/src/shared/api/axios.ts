import axios, { AxiosHeaders, AxiosResponse } from 'axios';

interface GetRequestParams<TParams> {
  request: string;
  headers?: AxiosHeaders;
  params: TParams;
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
