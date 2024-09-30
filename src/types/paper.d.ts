import { Sticker, StickerForm } from './sticker';

export type RollingPapers = {
  contents: RollingPaper[];
  cursorPageInfo: {
    nextCursorId: number;
    numberOfElements: number;
    hasNext: number;
  };
};

export type RollingPaper = {
  themeId: number;
  name: string;
  title: string;
  profileImageUrl: messageCover;
  coverImageUrl: string;
  content: string;
  stickers: Sticker[];
};

export type RollingPaperForm = {
  groupId: number;
  themeId: number;
  title: string;
  coverImageUrl: string;
  content: string;
  stickers: StickerForm[];
};
