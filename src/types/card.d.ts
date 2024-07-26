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
