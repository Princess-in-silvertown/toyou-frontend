import { Group, GroupList } from './group';

export type User = {
  id: number;
  name: string;
  imageUrl: string;
  birthday: string;
  introduction: string;
  groups?: Group[];
};

export type UserList = User[];

export type Info = User & GroupList;
