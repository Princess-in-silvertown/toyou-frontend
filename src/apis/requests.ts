import { ResData } from '@/types/api';
import { request } from './request';
import { GroupList } from '@/types/group';
import { SameGroupUsers, User, UserList } from '@/types/user';
import { EventData, Events } from '@/types/event';
import { getYearMonthDateTime } from '@utils/date';

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

export const requestGetSticker = (groupId: number) => {
  return request.get<ResData<{ imgUrl: string }[]>>(
    `api/groups/${groupId}/sticker`
  );
};

export const requestGetEvents = (year: number, monthIndex: number) => {
  const date = new Date(year, monthIndex);
  const month = (monthIndex % 12) + 1;

  const yearString = `${date.getFullYear()}`;
  const monthString = `${month}`.padStart(2, '0');

  const dateTime = `${yearString}-${monthString}`;

  return request.get<ResData<EventData>>(`api/events?date=${dateTime}`);
};

export const requestGetEventToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = `${date.getMonth()}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  const dateTime = `${year}-${month}-${day}`;

  return request.get<ResData<Events>>(`api/events?date=${dateTime}`);
};
