import { useCardSticker } from '@hooks/queries/useCardSticker';
import { useViewportHeight } from '@hooks/useViewportHeight';
import styled, { css } from 'styled-components';

interface Props {
  cardIndex: number;
  closeModal: () => void;
  onAddSticker: (imgUrl: string, side: 'front' | 'back') => void;
}

const StickerSelectList = ({ cardIndex, closeModal, onAddSticker }: Props) => {
  const { data } = useCardSticker(1);

  const viewportHeight = useViewportHeight() ?? 0;

  const selectSticker = (imgUrl: string) => {
    if (cardIndex % 2 === 0) onAddSticker(imgUrl, 'front');
    else onAddSticker(imgUrl, 'back');

    closeModal();
  };

  return (
    <Container>
      <StickerList
        style={{ height: `${Math.max(viewportHeight - 340, 350)}px` }}
      >
        {data.map((sticker, index) => (
          <StickerItem
            key={index}
            onClick={() => selectSticker(sticker.imgUrl)}
          >
            <StickerImage src={sticker.imgUrl}></StickerImage>
          </StickerItem>
        ))}
      </StickerList>
    </Container>
  );
};

export default StickerSelectList;

const blur = css`
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 100px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.3)
  );
`;

const Container = styled.div`
  position: relative;

  height: fit-content;
`;

const StickerList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 20px;

  width: 100%;
  height: 400px;
  padding-bottom: 30px;
  box-sizing: border-box;

  overflow: scroll;

  &::after {
    ${blur}
    bottom: -5px;
    background: linear-gradient(
      to top,
      rgba(65, 65, 65, 1),
      rgba(65, 65, 65, 0)
    );
    z-index: 1;
  }
`;

const StickerItem = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;

  width: 213px;
  height: 106px;
  border-radius: 9px;

  background-color: white;
  margin: 0 auto;

  overflow: hidden;
`;

const StickerImage = styled.img`
  width: 200px;
  height: fit-content;
  margin: 0 auto;
`;
