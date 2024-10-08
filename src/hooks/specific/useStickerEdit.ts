import { Sticker, Stickers } from '@/types/sticker';
import { useState } from 'react';

export const useStickerEdit = () => {
  const [stickers, setStickers] = useState<Stickers>(new Map());

  const handleChangeSticker = (key: number, newSticker: Partial<Sticker>) => {
    const prevNode = stickers.get(key);
    if (!prevNode) return;

    setStickers((prev) => {
      const newState = new Map(prev);
      newState.delete(key); // 최근 편집한 스티커가 맨 위에 오도록
      newState.set(key, { ...prevNode, ...newSticker });
      return newState;
    });
  };

  const handleAddSticker = (imageUrl: string, side: 'BACK' | 'FRONT') => {
    const key = Date.now();
    const newSticker = { key, imageUrl, x: 0, y: 0, rotate: 0, scale: 1, side };

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
