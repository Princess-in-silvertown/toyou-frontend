import SwiperCard from '@components/common/SwiperCard/SwiperCard';
import { useGetCardCover } from '@hooks/queries/useCardCover';
import styled, { css } from 'styled-components';
import cover from '@assets/image/happy_birthday.svg';
import Sticker from '../Sticker';
import StickerList from '../StickerList';

interface Props {
  alias: string;
  message: string;
}

const CardEdit = ({ alias, message }: Props) => {
  const { data } = useGetCardCover(1);

  return (
    <Container>
      <SwiperCard
        frontContents={
          <CardCoverContainer>
            <AliasContainer>
              <To>To</To>
              <Alias>{alias}</Alias>
            </AliasContainer>
            <CoverImage src={cover} />
          </CardCoverContainer>
        }
        backContents={
          <CardMessageContainer>
            <Message>
              <Empty />
              {message}
              <Empty />
            </Message>
            <StickerList />
          </CardMessageContainer>
        }
        frontTitle="메시지 커버"
        backTitle="메시지 내용"
      />
    </Container>
  );
};

export default CardEdit;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  min-width: 250px;
  max-width: 330px;
  margin: 36px auto 0 auto;

  @media (max-height: 670px) {
    margin: 20px auto 0 auto;

    width: 90%;
  }
`;

const CardCoverContainer = styled.div`
  position: relative;
  padding: 15px 23px;
  box-sizing: border-box;

  width: 100%;

  overflow: hidden;
`;

const AliasContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: end;
  gap: 10px;

  width: 100%;
  overflow: hidden;
`;

const To = styled.div`
  font-size: 38px;
  font-family: 'Montserrat';
  font-weight: 500;
  font-style: italic;
  letter-spacing: -2px;
`;

const Alias = styled.div`
  max-width: 100%;
  margin-bottom: 7px;

  font-family: 'Montserrat';
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CoverImage = styled.img`
  width: 100%;
`;

const blur = css`
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 30px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.3)
  );
`;

const Empty = styled.div``;

const CardMessageContainer = styled.div`
  position: relative;

  padding: 35px 25px;
  box-sizing: border-box;

  width: 100%;

  &::before {
    ${blur}
    top: 25px;
    z-index: 1;
  }

  &::after {
    ${blur}
    bottom: 25px;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.3)
    );
    z-index: 1;
  }
`;

const Message = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 100%;
  max-height: 360px;
  aspect-ratio: 278 / 360;

  font-size: 20px;
  white-space: pre-line;
  overflow: scroll;
`;
