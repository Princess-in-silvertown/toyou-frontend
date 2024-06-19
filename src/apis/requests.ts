import { Data, GroupList } from '@/types/api';
import { request } from './request';

export const requestGetTest = () => {
  return request.get<any>('test');
};

export const requestGetGroupList = () => {
  return request.get<Data<GroupList>>('api/group/searched');
};
