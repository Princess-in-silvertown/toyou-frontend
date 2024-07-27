export type Sticker = {
  key: number;
  imgUrl: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  side: 'back' | 'front';
};

export type Stickers = Map<number, Sticker>;
