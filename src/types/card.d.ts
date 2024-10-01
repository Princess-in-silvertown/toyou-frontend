import { Stickers } from './sticker';

export type Card = {
  front: Cover;
  back: BackCard;
};

export type Cover = {
  imgUrl: string;
  alias: string;
};

export type BackCard = {
  message: string;
  Stickers: Stickers;
};

export type CardColor = {
  name: string;
  R: number;
  G: number;
  B: number;
  A: number;
};

export type CardTheme = {
  themeId: number;
  color: Readonly<CardColor>;
  subColor: Readonly<CardColor>;
  message: string;
  coverImageUrl: Readonly<{ name: string; url: string }[]>;
};
