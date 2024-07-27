import styled from 'styled-components';
import Sticker from './Sticker';
import { useContext } from 'react';
import {
  messageFormContext,
  messageFormDispatchContext,
} from '@/contexts/states/messageFormContext';

interface Props {
  side?: 'back' | 'front';
}

const StickerList = ({ side }: Props) => {
  const { stickers } = useContext(messageFormContext);
  const { handleDeleteSticker, handleChangeSticker } = useContext(
    messageFormDispatchContext
  );

  return (
    <Container>
      {[...stickers.values()].map((sticker) => {
        const { key, x, y, imgUrl, rotate, scale } = sticker;

        if (!side || side == sticker.side) {
          return (
            <Sticker
              key={key}
              id={key}
              imgUrl={imgUrl}
              defaultX={x}
              defaultY={y}
              defaultRotate={rotate}
              defaultScale={scale}
              onDelete={handleDeleteSticker}
              onUpdate={handleChangeSticker}
            />
          );
        }
      })}
    </Container>
  );
};

export default StickerList;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
