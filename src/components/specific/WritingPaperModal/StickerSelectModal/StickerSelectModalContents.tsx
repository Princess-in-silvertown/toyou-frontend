import styled from 'styled-components';
import StickerSelectList from './StickerSelectList';
import { Suspense } from 'react';

interface Props {
  cardSide: 'front' | 'back';
  closeModal: () => void;
  onAddSticker: (imgUrl: string, side: 'front' | 'back') => void;
}

const StickerSelectModalContents = ({
  cardSide,
  closeModal,
  onAddSticker,
}: Props) => {
  const handleClickCancel = () => {
    closeModal();
  };

  return (
    <Container>
      <Header>
        <CancelButton onClick={handleClickCancel}>취소</CancelButton>
        <Title>스티커 추가하기</Title>
        <div />
      </Header>
      <Suspense>
        <StickerSelectList
          cardSide={cardSide}
          closeModal={closeModal}
          onAddSticker={onAddSticker}
        />
      </Suspense>
      <ConfirmButton onClick={handleClickCancel}>확인</ConfirmButton>
    </Container>
  );
};

export default StickerSelectModalContents;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 75px;

  padding: 65px 25px;
  box-sizing: border-box;

  @media (max-height: 670px) {
    padding: 45px 25px;
    gap: 55px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 16px;
  color: white;
`;

const CancelButton = styled.button`
  font-size: 16px;
  color: white;
`;

const ConfirmButton = styled.button`
  position: fixed;
  bottom: 46px;
  display: flex;

  align-items: center;
  justify-content: center;

  width: calc(100% - 50px);
  height: 49px;
  margin: 0 auto;
  border-radius: 24.5px;

  color: ${({ theme }) => theme.gray0};
  font-size: 16px;
  font-weight: 400;

  background-color: ${({ theme }) => theme.red500};

  z-index: 2;
`;
