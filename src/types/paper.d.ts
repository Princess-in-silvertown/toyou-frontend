import { Sticker } from './sticker';

export type RollingPapers = { letters: RollingPaper[] };

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
  themeId: number;
  title: string;
  coverImageUrl: string;
  content: string;
  stickers: Sticker[];
};
