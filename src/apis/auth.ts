import { ResData } from '@/types/api';
import { request } from './request';
import { isResponseError } from './responseError';

export const makeAuthorizedRequest = async <T>(
  path: string,
  method: string,
  fetcher: (path: string, options: RequestInit | undefined) => Promise<T>,
  body?: BodyInit
) => {
  const token = getAccessToken();
  const headers = createHeader(token, body);

  return refetchOnAuthError<T>(path, method, fetcher, headers, body);
};

const createHeader = (token: string, body?: BodyInit) => {
  return {
    credentials: 'include',
    ...(body && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const refetchOnAuthError = async <T>(
  path: string,
  method: string,
  fetcher: (path: string, options: RequestInit | undefined) => Promise<T>,
  headers: any,
  body?: BodyInit,
  retries = 1
): Promise<T> => {
  try {
    return await fetcher(path, { headers, body, method });
  } catch (error) {
    // Access Token Error
    if (isResponseError(error) && error.statusCode === 401 && retries > 0) {
      //reissue.then(...)
      const token = error.fetchedToken ?? '';
      const headers = createHeader(token, body);

      return refetchOnAuthError<T>(
        path,
        method,
        fetcher,
        headers,
        body,
        retries - 1
      );
    }

    throw error;
  }
};

export const removeAccessToken = () => {
  return sessionStorage.removeItem('ACCESS_TOKEN');
};

export const getAccessToken = () => {
  return sessionStorage.getItem('ACCESS_TOKEN') ?? '';
};

export const setAccessToken = (token: string) => {
  return sessionStorage.setItem('ACCESS_TOKEN', token);
};

export const removeRefreshToken = () => {
  return sessionStorage.removeItem('REFRESH_TOKEN');
};

export const getRefreshToken = () => {
  return sessionStorage.getItem('REFRESH_TOKEN') ?? '';
};

export const setRefreshToken = (token: string) => {
  return sessionStorage.setItem('REFRESH_TOKEN', token);
};

export const requestLogin = (code: string) => {
  const body = JSON.stringify({
    provider: 'KAKAO',
    authorizationCode: code,
  });

  return request.post<ResData<any>>(`auth/login`, body).then((res) => {
    const accessToken = res.data.token?.accessToken;
    const refreshToken = res.data.token?.refreshToken;

    refreshToken && setRefreshToken(refreshToken);
    accessToken && setAccessToken(accessToken);

    return res;
  });
};
