import { fetcher } from './fetcher';

export const makeAuthorizedRequest = async <T>(
  path: string,
  method: string,
  body?: BodyInit
) => {
  const token = getAccessToken();

  const headers = {
    credentials: 'include',
    ...(body && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  return fetcher<T>(path, { headers, body, method });
};

export const getAccessToken = () => {
  return 'TEST_TOKEN';
};
