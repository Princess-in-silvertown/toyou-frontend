import { Sticker } from './sticker';

export type RollingPapers = { letters: Letter[] };

export type RollingPaper = {
  themeId: number;
  profileImageUrl: messageCover;
  name: string;
  coverImageUrl: string;
  content: string;
  stickers: Sticker[];
};
