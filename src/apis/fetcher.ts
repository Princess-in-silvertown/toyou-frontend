import ResponseError from './responseError';

const API_URL = process.env.API_URL;

export const fetcher = <T>(path: string, options?: RequestInit): Promise<T> => {
  return fetch(`${API_URL}${path}`, options).then((response) =>
    parseResponse(response)
  );
};

export const parseResponse = async (response: Response) => {
  try {
    const data = await response.json();

    const statusCode = response.status;
    const errorCode = data?.errorCode as string | undefined;

    if (!response.ok) {
      throw new ResponseError({ statusCode, errorCode });
    }

    return data;
  } catch (error) {
    const statusCode = response.status;

    throw new ResponseError({ statusCode });
  }
};
