import { makeAuthorizedRequest } from './auth';
import { fetcher } from './fetcher';

export const request = {
  get: <T>(path: string) => makeAuthorizedRequest<T>(path, 'GET', fetcher),

  post: <T>(path: string, body?: BodyInit) =>
    makeAuthorizedRequest<T>(path, 'POST', fetcher, body),

  put: <T>(path: string, body?: BodyInit) =>
    makeAuthorizedRequest<T>(path, 'PUT', fetcher, body),

  delete: <T>(path: string, body?: BodyInit) =>
    makeAuthorizedRequest<T>(path, 'DELETE', fetcher, body),
};
