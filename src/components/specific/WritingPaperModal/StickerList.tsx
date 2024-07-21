import styled from 'styled-components';
import Sticker from './Sticker';
import { DragEventHandler, TouchEventHandler } from 'react';

const StickerList = () => {
  const handleTouchStart: TouchEventHandler = (e) => {
    // e.stopPropagation();
  };

  const handleTouchEnd: TouchEventHandler = (e) => {
    // e.stopPropagation();
  };

  const handleTouchMove: TouchEventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <Container
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Sticker />
      <Sticker />
      <Sticker />
    </Container>
  );
};

export default StickerList;

const TrashCan = () => {
  const handleDrag: TouchEventHandler = (e) => {
    e.stopPropagation();

    console.log('DragOver');
  };

  return (
    <button
      style={{ position: 'fixed', bottom: '10px' }}
      onTouchMove={handleDrag}
      onTouchEnd={handleDrag}
      onTouchStart={handleDrag}
    >
      test
    </button>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
