export type Sticker = {
  key: number;
  imgUrl: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

export type Stickers = Map<number, Sticker>;
