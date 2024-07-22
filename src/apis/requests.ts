import { ResData } from '@/types/api';
import { request } from './request';
import { GroupList } from '@/types/group';
import { SameGroupUsers, User, UserList } from '@/types/user';

export const requestGetTest = () => {
  return request.get<any>('test');
};

export const requestGetGroupList = () => {
  return request.get<ResData<GroupList>>('api/group/searched');
};

export const requestPostMyGroupList = (groupId: number) => {
  const body = JSON.stringify({ groupId });

  return request.post<ResData<any>>('api/group/me', body);
};

export const requestGetMyGroupList = () => {
  return request.get<ResData<GroupList>>('api/group/me');
};

export const requestGetUserList = (groupId?: number) => {
  const stringId = typeof groupId === 'number' ? String(groupId) : undefined;

  const params = new URLSearchParams({
    ...(stringId && { groupId: stringId }),
  }).toString();

  return request.get<ResData<UserList>>(`api/users?${params}`);
};

export const requestGetUserProfile = (userId: number) => {
  const params = new URLSearchParams({
    ...(userId && { userId: String(userId) }),
  }).toString();

  return request.get<ResData<User>>(`api/user?${params}`);
};

export const requestGetKeywords = (message: string) => {
  return request.get<ResData<string[]>>(`api/keywords?message=${message}`);
};

export const requestGetSameGroupUserList = () => {
  return request.get<ResData<SameGroupUsers>>(`api/same_group_users`);
};

export const requestPostCreateCard = (groupId: number) => {
  return request.get<ResData<SameGroupUsers>>(`api/same_group_users`);
};

export const requestGetCover = (groupId: number) => {
  return request.get<ResData<{ imgUrl: string }>>(
    `api/groups/${groupId}/cover`
  );
};

export const requestPostCover = (groupId: number) => {
  return request.post<ResData<any>>(`api/groups/${groupId}/cover`);
};
