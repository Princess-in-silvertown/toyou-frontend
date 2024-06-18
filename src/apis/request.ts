import { makeAuthorizedRequest } from './auth';

export const request = {
  get: <T>(path: string) => makeAuthorizedRequest<T>(path, 'GET'),

  post: <T>(path: string, body?: BodyInit) =>
    makeAuthorizedRequest<T>(path, 'POST', body),

  put: <T>(path: string, body?: BodyInit) =>
    makeAuthorizedRequest<T>(path, 'PUT', body),

  delete: <T>(path: string, body?: BodyInit) =>
    makeAuthorizedRequest<T>(path, 'DELETE', body),
};
