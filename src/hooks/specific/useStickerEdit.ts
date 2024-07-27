import { Sticker, Stickers } from '@/types/sticker';
import { useState } from 'react';

export const useStickerEdit = () => {
  const [stickers, setStickers] = useState<Stickers>(new Map());

  const handleChangeSticker = (key: number, newSticker: Partial<Sticker>) => {
    const prevNode = stickers.get(key);
    if (!prevNode) return;

    setStickers((prev) => {
      const newState = new Map(prev);
      newState.set(key, { ...prevNode, ...newSticker });
      return newState;
    });
  };

  const handleAddSticker = (imgUrl: string, side: 'back' | 'front') => {
    const key = Date.now();
    const newSticker = { key, imgUrl, x: 0, y: 0, rotate: 0, scale: 1, side };

    setStickers((prev) => new Map(prev.set(key, newSticker)));
  };

  const handleDeleteSticker = (key: number) => {
    setTimeout(() => {
      setStickers((prev) => {
        const newState = new Map(prev);
        newState.delete(key);
        return newState;
      });
    }, 100);
  };

  const getStickerList = () => {
    return [...stickers.values()];
  };

  return {
    stickers,
    handleAddSticker,
    handleChangeSticker,
    handleDeleteSticker,
    getStickerList,
  };
};
