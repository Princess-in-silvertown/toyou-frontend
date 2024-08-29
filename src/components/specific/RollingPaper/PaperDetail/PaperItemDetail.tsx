import SwiperCard from '@components/common/SwiperCard/SwiperCard';
import styled from 'styled-components';
import { CARD_THEME } from '@constants/card';
import { CardColor } from '@/types/card';
import { RollingPaper } from '@/types/paper';
import StaticStickerList from './StaticStickerList';

interface Props extends RollingPaper {
  isCurrent?: boolean;
}

const PaperItemDetail = ({
  isCurrent,
  themeId,
  name,
  profileImageUrl,
  coverImageUrl,
  content,
  stickers,
}: Props) => {
  const { color, subColor } = CARD_THEME[themeId];

  const getColorString = (color: Readonly<CardColor>) => {
    return `rgba(${color.R}, ${color.G}, ${color.B}, ${0.95})`;
  };

  const getSubColorString = (color: Readonly<CardColor>) => {
    return `rgba(${color.R}, ${color.G}, ${color.B}, ${0.55})`;
  };

  return (
    <Container>
      <SwiperCard
        isAutoFlip={isCurrent}
        frontContents={
          <CardContainer
            $color={getColorString(color)}
            $subColor={getSubColorString(subColor)}
          >
            <CardCoverContainer>
              <CoverImage src={coverImageUrl} />
              <StaticStickerList side="front" stickers={stickers} />
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
                  <Alias>{name}</Alias>
                </AliasContainer>
                <Message>{content}</Message>
                <StaticStickerList side="back" stickers={stickers} />
              </CardMessageContainer>
            </BackContainer>
          </CardContainer>
        }
      />
      <ProfileContainer>
        <From>From.</From>
        <UserContainer>
          <ProfileImage src={profileImageUrl} />
          <Name>{name}</Name>
        </UserContainer>
      </ProfileContainer>
    </Container>
  );
};

export default PaperItemDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  margin-bottom: 2px;

  font-family: 'Montserrat';
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
  overflow: scroll;
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

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 44px;
  margin: 0 auto;
  padding: 8px 15px;
  border-radius: 22px;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.color.white};
`;

const From = styled.div`
  font-family: Nanum Myeongjo;
  font-size: 18px;
  line-height: 22.5px;
  letter-spacing: -0.03em;
  text-align: center;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProfileImage = styled.img`
  width: 27px;
  height: 27px;
  border-radius: 50%;
`;

const Name = styled.div`
  font-size: 18px;
  line-height: 21.48px;
  letter-spacing: -0.03em;
`;