import { Sticker } from './sticker';

export type RollingPapers = { letters: RollingPaper[] };

export type RollingPaper = {
  themeId: number;
  name: string;
  profileImageUrl: messageCover;
  coverImageUrl: string;
  content: string;
  stickers: Sticker[];
};

export type RollingPaperForm = {
  themeId: number;
  coverImageUrl: string;
  content: string;
  stickers: Sticker[];
};
