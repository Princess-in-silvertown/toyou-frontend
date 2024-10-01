export type Sticker = {
  key: number;
  imageUrl: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  side: 'BACK' | 'FRONT';
};

export type StickerForm = {
  imageUrl: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  side: 'BACK' | 'FRONT';
};

export type Stickers = Map<number, Sticker>;
