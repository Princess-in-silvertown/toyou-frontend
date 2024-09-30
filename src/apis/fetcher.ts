import ResponseError, { isResponseError } from './responseError';

const API_URL = process.env.API_URL;

export const fetcher = <T>(path: string, options?: RequestInit): Promise<T> => {
  return fetch(`${API_URL}${path}`, options).then((response) =>
    parseResponse(response)
  );
};

export const parseResponse = async (response: Response) => {
  try {
    const json = await response.json();

    const statusCode = response.status;
    const errorCode = json?.errorCode as string | undefined;
    const fetchedToken = json?.data?.token?.accessToken;

    if (!response.ok) {
      throw new ResponseError({ statusCode, errorCode, fetchedToken });
    }

    return json ?? {};
  } catch (error) {
    if (isResponseError(error)) throw error;

    throw new ResponseError({
      statusCode: 400,
      errorCode: 'NOT_EXPECTED',
    });
  }
};
