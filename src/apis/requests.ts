import { request } from './request';

export const requestGetTest = () => {
  return request.get<any>('test');
};
