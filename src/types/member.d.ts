import { Group } from './group';
import { User } from './user';

export type Member = {
  id: number;
  groupId: number;
  name: string;
  introduction: string;
  imageUrl: string;
};

export type MemberList = Member[];
