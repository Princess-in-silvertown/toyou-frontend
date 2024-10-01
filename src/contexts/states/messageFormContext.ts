import { Sticker, Stickers } from '@/types/sticker';
import { User } from '@/types/user';
import { createContext } from 'react';

export const DEFAULT_USERINFO = {
  id: -1,
  name: '',
  imageUrl: '',
  birthday: '',
  introduction: '',
};

export const DEFAULT_THEME = 0;

export type MessageFormDispatch = {
  handleChangeInfo: (info: Partial<User>) => void;
  handleChangeGroupId: (groupId: number) => void;
  handleChangeMessage: (message: string) => void;
  handleChangeAlias: (alias: string) => void;
  handleChangeCoverImgUrl: (coverImg: string) => void;
  handleChangeCardTheme: (theme: number) => void;

  // keyword
  handleLoadKeywords: (keywords: string[]) => void;
  handleAddKeyword: (keyword: string) => void;
  handleDeleteKeyword: (keyword: string) => void;

  //sticker
  handleChangeSticker: (key: number, sticker: Partial<Sticker>) => void;
  handleAddSticker: (imgUrl: string, side: 'BACK' | 'FRONT') => void;
  handleDeleteSticker: (key: number) => void;
  getStickerList: () => Sticker[];
};

export type MessageFormContext = {
  userInfo: User;
  message: string;
  alias: string;
  coverImgUrl: string;
  stickers: Stickers;
  keywords?: string[];
  cardTheme: number;
  groupId: number;
};

export const messageFormContext = createContext<MessageFormContext>({
  userInfo: DEFAULT_USERINFO,
  message: '',
  alias: '',
  coverImgUrl: '',
  stickers: new Map(),
  cardTheme: DEFAULT_THEME,
  groupId: -1,
});

//@ts-ignore
export const messageFormDispatchContext = createContext<MessageFormDispatch>();
