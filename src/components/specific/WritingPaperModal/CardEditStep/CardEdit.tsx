import SwiperCard from '@components/common/SwiperCard/SwiperCard';
import { useGetCardCover } from '@hooks/queries/useCardCover';
import styled, { css, keyframes } from 'styled-components';
import StickerList from '../StickerList';
import { useContext, useEffect, useState } from 'react';
import { messageFormContext } from '@/contexts/states/messageFormContext';
import { CARD_THEME } from '@constants/card';
import { CardColor } from '@/types/card';
import Swiper from '@components/common/Swiper/Swiper';
import { useViewport } from '@hooks/useViewport';
import SwiperSlider from '@components/common/Swiper/SwiperSlider';

interface Props {
  alias: string;
  message: string;
}

const CardEdit = ({ alias, message }: Props) => {
  const { data } = useGetCardCover(1);

  const { cardTheme } = useContext(messageFormContext);
  const { color, subColor } = CARD_THEME[cardTheme];

  const getColorString = (color: Readonly<CardColor>) => {
    return `rgba(${color.R}, ${color.G}, ${color.B}, ${0.85})`;
  };

  const getSubColorString = (color: Readonly<CardColor>) => {
    return `rgba(${color.R}, ${color.G}, ${color.B}, ${0.45})`;
  };

  const isSafari = () => {
    const userAgent = navigator.userAgent;
    return (
      userAgent.includes('Safari') &&
      !userAgent.includes('Chrome') &&
      !userAgent.includes('Edge') &&
      !userAgent.includes('Whale')
    );
  };

  const [width] = useViewport();

  return (
    <Container>
      {isSafari() && (
        <Swiper
          $padding={Math.min(width, 500) / 2 - 192}
          $gap={16}
          $width={320}
          titles={['메시지 커버', '메시지 내용']}
        >
          <SwiperSlider>
            <CardContainer
              $color={getColorString(color)}
              $subColor={getSubColorString(subColor)}
            >
              <CardCoverContainer>
                <CoverImage src={data.imgUrl} alt="커버이미지" />
                <StickerList side="front" />
              </CardCoverContainer>
            </CardContainer>
          </SwiperSlider>
          <SwiperSlider>
            <CardContainer
              $color={getColorString(color)}
              $subColor={getSubColorString(subColor)}
            >
              <BackContainer>
                <CardMessageContainer>
                  <AliasContainer>
                    <To>To.</To>
                    <Alias>{alias}</Alias>
                  </AliasContainer>
                  <Message>{message}</Message>
                  <StickerList side="back" />
                </CardMessageContainer>
              </BackContainer>
            </CardContainer>
          </SwiperSlider>
        </Swiper>
      )}
      {!isSafari() && (
        <SwiperCard
          frontContents={
            <CardContainer
              $color={getColorString(color)}
              $subColor={getSubColorString(subColor)}
            >
              <CardCoverContainer>
                <CoverImage src={data.imgUrl} alt="커버이미지" />
                <StickerList side="front" />
              </CardCoverContainer>
            </CardContainer>
          }
          backContents={
            <CardContainer
              $color={getColorString(color)}
              $subColor={getSubColorString(subColor)}
            >
              <BackContainer>
                <CardMessageContainer>
                  <AliasContainer>
                    <To>To.</To>
                    <Alias>{alias}</Alias>
                  </AliasContainer>
                  <Message>{message}</Message>
                  <StickerList side="back" />
                </CardMessageContainer>
              </BackContainer>
            </CardContainer>
          }
          frontTitle="메시지 커버"
          backTitle="메시지 내용"
        />
      )}
    </Container>
  );
};

export default CardEdit;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  margin: 36px auto 0 auto;

  @media (max-height: 670px) {
    margin: 20px auto 0 auto;
  }
`;

const CardContainer = styled.div<{ $color: string; $subColor: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 320px;
  height: 458px;
  border-radius: 16px;

  background-color: ${({ $color }) => $color};

  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    top: 5%;
    left: 0;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      ellipse at center,
      ${({ $subColor }) => $subColor} 40%,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0)
    );
    mix-blend-mode: overlay;
  }
`;

const CardCoverContainer = styled.div`
  position: relative;
  padding: 15px 23px;
  box-sizing: border-box;

  width: 100%;
`;

const AliasContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: end;
  gap: 7px;

  width: 100%;
  overflow: hidden;
`;

const To = styled.div`
  font-family: 'Nanum Myeongjo';
  font-size: 38px;
  font-weight: 400;
  line-height: 47.5px;
  letter-spacing: -0.03em;
  text-align: left;
`;

const Alias = styled.div`
  max-width: 100%;
  margin-bottom: 7px;

  font-size: 24px;
  font-weight: 500;
  letter-spacing: -1.5px;
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;

  user-select: none;
  pointer-events: none;
`;

const BackContainer = styled.div`
  display: block;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
`;

const CardMessageContainer = styled.div`
  width: 100%;
  height: 378px;
  overflow-y: hidden;
`;

const Message = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 35px;

  width: 100%;
  box-sizing: border-box;
  margin-top: 15px;
  margin-bottom: 45px;

  font-size: 18px;
  letter-spacing: -0.04em;
  line-height: 26px;
  white-space: pre-wrap;

  overflow-x: hidden;
`;
