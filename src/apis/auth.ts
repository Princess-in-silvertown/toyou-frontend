export const makeAuthorizedRequest = async <T>(
  path: string,
  method: string,
  fetcher: (path: string, options: RequestInit | undefined) => Promise<T>,
  body?: BodyInit
) => {
  const token = getAccessToken();

  const headers = {
    credentials: 'include',
    ...(body && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  return fetcher(path, { headers, body, method });
};

export const getAccessToken = () => {
  return 'TEST_TOKEN';
};
