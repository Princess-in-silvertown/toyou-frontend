import { ResData } from '@/types/api';
import { request } from './request';
import { Group, GroupList } from '@/types/group';
import { Info, User } from '@/types/user';
import { EventData, Events } from '@/types/event';
import { Member } from '@/types/member';
import { RollingPaperForm, RollingPapers } from '@/types/paper';
import ResponseError from './responseError';

export const requestGetTest = () => {
  return request.get<any>('test');
};

export const requestGetGroupList = (keyword: string) => {
  const params = new URLSearchParams({
    keyword,
  }).toString();

  return request.get<ResData<GroupList>>(`groups?${params}`);
};

export const requestGetMyGroupList = () => {
  return request.get<ResData<GroupList>>('groups');
};

export const requestPostMyGroupList = (memberId: number) => {
  return request.post<ResData<GroupList>>(`groups/${memberId}/resigter`);
};

export const requestGetMemberList = (search: string, groupId?: number) => {
  const stringId = typeof groupId === 'number' ? String(groupId) : undefined;

  const params = new URLSearchParams({
    ...(stringId && { groupId: stringId }),
    search,
  }).toString();

  return request.get<ResData<Member[]>>(`users?${params}`);
};

export const requestGetUserProfile = (userId: number) => {
  const params = new URLSearchParams({
    ...(userId && { userId: String(userId) }),
  }).toString();

  return request.get<ResData<User>>(`user?${params}`);
};

export const requestGetKeywords = (message: string) => {
  const body = JSON.stringify({ content: message });

  return request.post<ResData<{ keywords: string[] }>>(
    `generate-keywords`,
    body
  );
};

export const requestGetCover = () => {
  return request.get<ResData<{ imgUrl: string }>>(`cover`).then((res) => {
    if (res.code !== 'SUCCESS') {
      throw new ResponseError({ statusCode: 202, errorCode: res.code });
    }
    return res;
  });
};

export const requestPostCover = () => {
  return request.post<ResData<any>>(`cover`);
};

export const requestPostSticker = (prompt: string, color: string) => {
  const body = JSON.stringify({ prompt, color });

  return request.post<ResData<{ stickers: string[] }>>(
    `generate-stickers`,
    body
  );
};

export const requestGetEvents = (year: number, monthIndex: number) => {
  const date = new Date(year, monthIndex);
  const month = (monthIndex % 12) + 1;

  const yearString = `${date.getFullYear()}`;
  const monthString = `${month}`.padStart(2, '0');

  const dateTime = `${yearString}-${monthString}`;

  return request.get<ResData<EventData>>(`events?yearmonth=${dateTime}`);
};

export const requestGetEventToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  const dateTime = `${year}-${month}-${day}`;

  return request.get<ResData<EventData>>(`events?date=${dateTime}`);
};

export const requestGetMessageList = (cursorId?: number) => {
  const LIMIT = String(9);

  const params = new URLSearchParams({
    ...(cursorId && { cursor: String(cursorId) }),
    limit: LIMIT,
  }).toString();

  return request.get<ResData<RollingPapers>>(`rollingpapers?${params}`);
};

export const requestPostPaper = (userId: number, paper: RollingPaperForm) => {
  const body = JSON.stringify(paper);

  return request.post<ResData<any>>(`users/${userId}/rollingpapers`, body);
};

export const requestGetMyInfo = () => {
  return request.get<ResData<Info>>(`me`);
};

export const requestPutMyInfo = (newInfo: Info) => {
  const body = JSON.stringify(newInfo);

  return request.put<ResData<Info>>(`users`, body);
};
