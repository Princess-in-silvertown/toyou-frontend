export type User = {
  id: number;
  name: string;
  imgUrl: string;
};

export type UserList = User[];

export type SameGroupUser =
  | {
      groupName: string;
      introduce: string;
      onChangeUserInfo: (newInfo: Partial<User>) => void;
    }
  | User;

export type SameGroupUsers = SameGroupUser[];
