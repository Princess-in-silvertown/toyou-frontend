import { useGetCardSticker } from '@hooks/queries/useCardSticker';
import { useViewportHeight } from '@hooks/useViewportHeight';
import styled from 'styled-components';

interface Props {
  cardSide: 'front' | 'back';
  closeModal: () => void;
  onAddSticker: (imgUrl: string, side: 'front' | 'back') => void;
}

const StickerSelectList = ({ cardSide, closeModal, onAddSticker }: Props) => {
  const { data } = useGetCardSticker();

  const viewportHeight = useViewportHeight() ?? 0;

  const selectSticker = (imgUrl: string) => {
    onAddSticker(imgUrl, cardSide);

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
            <StickerImage src={sticker.imgUrl} alt="취소" />
          </StickerItem>
        ))}
      </StickerList>
    </Container>
  );
};

export default StickerSelectList;

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
  padding-bottom: 30px;
  box-sizing: border-box;

  overflow-y: auto;
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

  overflow-y: hidden;
`;

const StickerImage = styled.img`
  width: 200px;
  height: fit-content;
  margin: 0 auto;
`;
