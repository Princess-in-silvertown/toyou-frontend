import { Sticker } from './sticker';

export type Letters = { letters: Letter[] };

export type Letter = {
  themeId: number;
  profileImageUrl: messageCover;
  name: string;
  coverImageUrl: string;
  content: string;
  stickers: Sticker[];
};
