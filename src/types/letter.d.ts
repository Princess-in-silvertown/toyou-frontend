import { Sticker } from './sticker';

export type Letters = { letters: Letter[] };

export type Letter = {
  themeId: number;
  coverImageUrl: string;
  content: string;
  stickers: Sticker[];
};
