import { Sticker } from '@/types/sticker';
import styled from 'styled-components';

interface Props {
  stickers: Sticker[];
  side: 'back' | 'front';
}

const StaticStickerList = ({ stickers, side }: Props) => {
  return (
    <Container>
      {stickers.map((sticker, index) => {
        const { x, y, rotate, scale, imgUrl, side: _side } = sticker;

        if (side !== _side) return;

        return (
          <StickerContainer
            key={index}
            style={{
              top: y,
              left: x,
              transform: `scale(${scale}) rotate(${rotate}deg) `,
            }}
          >
            <Image src={imgUrl} />
          </StickerContainer>
        );
      })}
    </Container>
  );
};

export default StaticStickerList;

const Container = styled.div``;

const StickerContainer = styled.div`
  position: absolute;
  touch-action: none;

  z-index: 2;
`;

const Image = styled.img`
  min-width: 30px;
  width: 150px;
  max-width: 300px;
  height: auto;
  transform-origin: 'center center';

  user-select: none;
  pointer-events: none;
`;
