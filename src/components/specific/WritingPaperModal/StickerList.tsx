import styled from 'styled-components';
import Sticker from './Sticker';
import { useContext, useEffect } from 'react';
import {
  messageFormContext,
  messageFormDispatchContext,
} from '@/contexts/states/messageFormContext';

const StickerList = () => {
  const { stickers } = useContext(messageFormContext);

  const { handleAddSticker, handleDeleteSticker, getStickerList } = useContext(
    messageFormDispatchContext
  );

  const stickerList = getStickerList();

  useEffect(() => {
    handleAddSticker('');
    handleAddSticker('');
    handleAddSticker('');
  }, []);

  console.log(stickerList);

  return (
    <Container>
      {[...stickers.values()].map((sticker) => (
        <Sticker
          key={sticker.key}
          id={sticker.key}
          onDelete={handleDeleteSticker}
        />
      ))}
    </Container>
  );
};

export default StickerList;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
