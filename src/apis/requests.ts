import { ResData } from '@/types/api';
import { request } from './request';
import { GroupList } from '@/types/group';

export const requestGetTest = () => {
  return request.get<any>('test');
};

export const requestGetGroupList = () => {
  return request.get<ResData<GroupList>>('api/group/searched');
};
