import { ResData } from '@/types/api';
import { request } from './request';
import { GroupList } from '@/types/group';
import { User } from '@/types/user';
import { EventData, Events } from '@/types/event';
import { Member } from '@/types/member';
import { RollingPaperForm, RollingPapers } from '@/types/paper';
import ResponseError from './responseError';

export const requestGetTest = () => {
  return request.get<any>('test');
};

export const requestGetGroupList = (memberId: number) => {
  return request.post<ResData<GroupList>>(`api/groups?memberId=${memberId}`);
};

export const requestGetMyGroupList = () => {
  return request.get<ResData<GroupList>>('api/groups');
};

export const requestGetMemberList = (search: string, groupId?: number) => {
  const stringId = typeof groupId === 'number' ? String(groupId) : undefined;

  const params = new URLSearchParams({
    ...(stringId && { groupId: stringId }),
    ...(search.length > 0 && { search }),
  }).toString();

  return request.get<ResData<Member[]>>(`api/members?${params}`);
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

export const requestGetCover = (groupId: number) => {
  return request
    .get<ResData<{ imgUrl: string }>>(`api/groups/${groupId}/cover`)
    .then((res) => {
      if (res.code !== 'SUCCESS') {
        throw new ResponseError({ statusCode: 202, errorCode: res.code });
      }
      return res;
    });
};

export const requestPostCover = (groupId: number) => {
  return request.post<ResData<any>>(`api/groups/${groupId}/cover`);
};

export const requestGetSticker = (groupId: number) => {
  return request
    .get<ResData<{ imgUrl: string }[]>>(`api/groups/${groupId}/sticker`)
    .then((res) => {
      if (res.code !== 'SUCCESS') {
        throw new ResponseError({ statusCode: 202, errorCode: res.code });
      }

      return res;
    });
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

  return request.get<ResData<{ events: Events }>>(
    `api/events?date=${dateTime}`
  );
};

export const requestGetMessageList = (cursor?: number) => {
  const params = new URLSearchParams({
    ...(cursor && { cursor: String(cursor) }),
  }).toString();

  return request.get<ResData<RollingPapers>>(`api/rollingpapers?${params}`);
};

export const requestPostPaper = (paper: RollingPaperForm) => {
  const body = JSON.stringify(paper);

  return request.post<ResData<any>>(`api/rollingpapers`, body);
};
