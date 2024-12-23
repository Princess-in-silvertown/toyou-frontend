import {
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import NextIcon from './UpIcon';
import { CARD_THEME } from '@constants/card';

interface Props extends React.PropsWithChildren {
  isSelected: boolean;
  onSelected: (themeId: number) => void;
  canDrag?: boolean;
}

const TOP = -400;
const MIN_Y = -300;
const MAX_Y = 10;

const MIN_X = -10;
const MAX_X = 100;

class CardItem {
  public readonly key: number;
  public readonly themeId: number;
  private readonly color: [number, number, number, number];
  private readonly subColor: [number, number, number, number];
  private readonly message: string;

  constructor(
    key: number,
    themeId: number,
    color: { R: number; G: number; B: number; A: number },
    subColor: { R: number; G: number; B: number; A: number },
    message: string
  ) {
    this.key = key;
    this.themeId = themeId;
    this.color = [color.R, color.G, color.B, color.A];
    this.subColor = [subColor.R, subColor.G, subColor.B, subColor.A];
    this.message = message;
  }

  public getRgb() {
    const color = [...this.color];
    return color.splice(0, 3);
  }

  public getAlpha() {
    return this.color[3];
  }

  public getSubRgb() {
    const color = [...this.subColor];
    return color.splice(0, 3);
  }

  public getMessage() {
    return this.message;
  }
}

class CardList {
  private readonly MAX_LENGTH = CARD_THEME.length + 1;

  private next: number = 0;
  private cards: CardItem[] = [];

  constructor() {
    new Array(this.MAX_LENGTH).fill(0).forEach(() => {
      this.addCardItem();
    });
  }

  private addCardItem() {
    const colorIndex = this.next % CARD_THEME.length;
    const color = CARD_THEME[colorIndex].color;
    const subColor = CARD_THEME[colorIndex].subColor;
    const message = CARD_THEME[colorIndex].message;

    const newCard = new CardItem(
      this.next,
      colorIndex,
      color,
      subColor,
      message
    );

    this.cards.push(newCard);

    this.next += 1;
  }

  public pushPopCardItem() {
    this.addCardItem();

    return this.cards.shift();
  }

  public getCards() {
    const cards = this.cards.map((card) => {
      const key = card.key;
      const rgb = card.getRgb();
      const alpha = card.getAlpha();

      return { key, rgb, alpha };
    });

    return cards;
  }

  public getCurrentCardMessage() {
    const first = [...this.cards].shift();

    return first?.getMessage();
  }

  public getCurrentCardColor() {
    const first = [...this.cards].shift();

    return first?.getRgb() ?? [0, 0, 0];
  }

  public getCurrentCardRGBA() {
    const first = [...this.cards].shift();

    return [...(first?.getRgb() ?? []), first?.getAlpha()];
  }

  public getCurrentCardTheme() {
    const first = [...this.cards].shift();

    return first?.themeId;
  }
}

const ICON_COLOR = [160, 85, 9] as const;

const cardList = new CardList();

const CardSelect = ({ isSelected, onSelected, canDrag }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isSwiping, setIsSwiping] = useState(false);
  const [isTouchPrevented, setIsTouchPrevented] = useState(false);

  const [isHorizontal, setIsHorizontal] = useState<boolean | null>(null);
  const [y, setY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [x, setX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);

  const [_, forceUpdate] = useState(0);

  const handleStart = (clientX: number, clientY: number) => {
    setStartX(clientX);
    setStartY(clientY);
    setIsSwiping(true);

    if (!isTouchPrevented) {
      setIsHorizontal(null);
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isSwiping) return;

    if (isTouchPrevented || !canDrag) return;

    let moveX = clientX - startX;
    let moveY = clientY - startY;

    if (isHorizontal === null) {
      if (Math.abs(moveX) > Math.abs(moveY) * 0.8) {
        // 한손으로 좌우 스크롤을 할 때, 좀 더 편하게 스와이프를 하기 위해 가중치 추가
        setIsHorizontal(true);
      } else if (Math.abs(moveX) < Math.abs(moveY)) {
        setIsHorizontal(false);
      }

      return;
    }

    if (isHorizontal) {
      if (moveX > MAX_X) {
        moveX = MAX_X;
      } else if (moveX < MIN_X) {
        moveX = MIN_X;
      }

      setDeltaX(moveX);
    } else {
      if (moveY > MAX_Y) {
        moveY = MAX_Y;
      } else if (moveY < MIN_Y) {
        moveY = MIN_Y;
      }

      setDeltaY(moveY);
    }
  };

  const handleEnd = () => {
    setDeltaY(0);
    setDeltaX(0);

    setIsSwiping(false);

    if (deltaY <= -50) {
      setY(-500);
      setCurrentIndex((prev) => prev + 1);
      setIsTouchPrevented(true);

      onSelected?.(cardList.getCurrentCardTheme() ?? 0);
    } else if (deltaX >= 50) {
      setX(300);
      setCurrentIndex((prev) => prev + 1);
      setIsTouchPrevented(true);
    }
  };

  const handleTouchStart: TouchEventHandler = (e) =>
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  const handleTouchMove: TouchEventHandler = (e) =>
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  const handleTouchEnd: TouchEventHandler = () => handleEnd();

  const handleMouseDown: MouseEventHandler = (e) =>
    handleStart(e.clientX, e.clientY);
  const handleMouseMove: MouseEventHandler = (e) =>
    handleMove(e.clientX, e.clientY);
  const handleMouseUp: MouseEventHandler = () => handleEnd();
  const handleMouseLeave: MouseEventHandler = () => handleEnd();

  const cubicBezier = (
    t: number,
    p0: number,
    p1: number,
    p2: number,
    p3: number
  ): number => {
    const u = 1 - t;
    return (
      u ** 3 * p0 + 3 * u ** 2 * t * p1 + 3 * u * t ** 2 * p2 + t ** 3 * p3
    );
  };

  // 커스텀 베지어 커브 함수
  const customEaseOut = (t: number): number => {
    if (t > 1) return 1;
    if (t < 0) return 0;

    return cubicBezier(t, 0, 0.67, 1.25, 1);
  };

  // 변환 함수
  const transformEaseOut = (
    value: number,
    x_min: number,
    x_max: number,
    y_min: number,
    y_max: number
  ) => {
    const t = (value - x_min) / (x_max - x_min);
    const easedT = customEaseOut(t);
    return y_min + (y_max - y_min) * easedT;
  };

  const distance = isHorizontal ? x + deltaX : y + deltaY;
  const minDistance = 0;
  const maxDistance = isHorizontal ? 200 : -400;

  const firstCardOpacityX = transformEaseOut(distance, 100, 300, 0.85, 0);
  const firstCardBlurX = transformEaseOut(distance, 100, 300, 10, 0);
  const firstCardRotateX = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    0,
    10
  );

  const firstCardOpacityY = transformEaseOut(distance, -200, -300, 0.85, 0);
  const firstCardBlurY = transformEaseOut(distance, -200, -300, 10, 0);
  const firstCardOpacity = isHorizontal ? firstCardOpacityX : firstCardOpacityY;

  const firstCardStyleX: React.CSSProperties = {
    transform: `translate(${distance}px, ${
      -0.1 * distance
    }px) rotate(${firstCardRotateX}deg)`,
    transition: '0.25s cubic-bezier(.17,.67,.52,1.25)',
    backdropFilter: `blur(${firstCardBlurX}px)`,
    WebkitBackdropFilter: `blur(${firstCardOpacityX}px)`,
  };

  const firstCardStyleY: React.CSSProperties = {
    transform: `translateY(${distance}px)`,
    transition: '0.25s cubic-bezier(.17,.67,.52,1.25)',
    backdropFilter: `blur(${firstCardBlurY}px)`,
    WebkitBackdropFilter: `blur(${firstCardOpacityY}px)`,
  };

  const firstCardStyle = isHorizontal ? firstCardStyleX : firstCardStyleY;

  const secondCardScale = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    0.9,
    1
  );

  const secondCardRotate = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    -22.5,
    0
  );

  const secondCardTranslateX = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    -25,
    0
  );

  const secondCardOpacity = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    0.75,
    0.85
  );

  const secondCardStyle: React.CSSProperties = {
    transform: `scale(${secondCardScale}) rotate(${secondCardRotate}deg) translateX(${secondCardTranslateX}px)`,
    transition: '0.4s cubic-bezier(.17,.67,.52,1.25)',
  };

  const thirdCardScale = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    0.8,
    0.9
  );

  const thirdCardRotate = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    -45,
    -22.5
  );

  const thirdCardTranslateX = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    -50,
    -25
  );

  const thirdCardOpacity = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    0.5,
    0.7
  );

  const thirdCardStyle: React.CSSProperties = {
    transform: `scale(${thirdCardScale}) rotate(${thirdCardRotate}deg) translateX(${thirdCardTranslateX}px)`,
    transition: '0.55s cubic-bezier(.17,.67,.52,1.25)',
  };

  const fourthCardScale = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    0.5,
    0.8
  );

  const fourthCardRotate = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    -55,
    -45
  );

  const fourthCardTranslateX = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    -60,
    -50
  );

  const fourthCardOpacity = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    -0.1,
    0.5
  );

  const fourthCardStyle: React.CSSProperties = {
    transform: `scale(${fourthCardScale}) rotate(${fourthCardRotate}deg) translateX(${fourthCardTranslateX}px)`,
    transition: '0.7s cubic-bezier(.17,.67,.52,1.25)',
  };

  const iconTranslateY = transformEaseOut(distance, 10, -50, -2, 5);
  const iconTranslateX = transformEaseOut(distance, 0, 50, 0, 5);
  const iconOpacity = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    1,
    0
  );

  const titleOpacity = transformEaseOut(y + deltaY, -180, -220, 1, 0);

  useEffect(() => {
    if (currentIndex === 0) return;

    setTimeout(() => {
      setIsTouchPrevented(false);

      cardList.pushPopCardItem();

      setY(() => 0);
      setX(() => 0);
      forceUpdate((prev) => prev + 1);
    }, 300);
  }, [currentIndex]);

  const RGBAToString = (rgba: number[]) => {
    if (rgba.length !== 4) return;

    const [R, G, B, A] = rgba;

    return `rgba(${R}, ${G}, ${B}, ${A})`;
  };

  const getBlendColor = (
    originColor: number[] | readonly number[],
    color: number[] | readonly number[],
    alpha: number
  ) => {
    if (originColor.length !== 3 || color.length !== 3)
      throw Error('use correct color format');

    const [R1, G1, B1] = originColor;
    const [R2, G2, B2] = color;

    const R = alpha * R1 + (1 - alpha) * R2;
    const G = alpha * G1 + (1 - alpha) * G2;
    const B = alpha * B1 + (1 - alpha) * B2;

    return `rgb(${R}, ${G}, ${B})`;
  };

  return (
    <Container>
      <TitleContainer>
        <WritingButton
          style={{
            transform: `translateY(${(y + deltaY) * 0.3}px) `,
            opacity: isSelected ? 0 : titleOpacity,
            transition: '1.2s cubic-bezier(.17,.67,.52,1.25)',
          }}
        >
          <Title>
            메시지 카드를 보내 <br /> 마음을 전달해 보세요
          </Title>
        </WritingButton>
      </TitleContainer>
      <SwiperWrapper
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isSelected || (
          <IconContainer
            style={{
              opacity: !isHorizontal || !isSwiping ? iconOpacity : 0,
              transform: `translate(-50%, ${
                isHorizontal ? iconTranslateX : iconTranslateY
              }px)`,
            }}
          >
            <NextIcon
              color={getBlendColor(
                cardList.getCurrentCardColor(),
                ICON_COLOR,
                0.3
              )}
            />
          </IconContainer>
        )}
        {cardList
          .getCards()
          .map((card, index) => {
            const { key, rgb, alpha } = card;
            const OpacityWeight = alpha;

            if (index === 0) {
              const background = RGBAToString([
                ...rgb,
                firstCardOpacity * OpacityWeight,
              ]);

              return (
                <CardContainer
                  key={key}
                  style={{ ...firstCardStyle, background }}
                />
              );
            } else if (index === 1) {
              const background = RGBAToString([
                ...rgb,
                secondCardOpacity * OpacityWeight,
              ]);

              return (
                <CardContainer
                  key={key}
                  style={{ ...secondCardStyle, background }}
                />
              );
            } else if (index === 2) {
              const background = RGBAToString([
                ...rgb,
                thirdCardOpacity * OpacityWeight,
              ]);

              return (
                <CardContainer
                  key={key}
                  style={{ ...thirdCardStyle, background }}
                />
              );
            } else if (index === 3) {
              const background = RGBAToString([
                ...rgb,
                fourthCardOpacity * OpacityWeight,
              ]);

              return (
                <CardContainer
                  key={key}
                  style={{ ...fourthCardStyle, background }}
                />
              );
            }
          })
          .reverse()}
        <DescriptionContainer
          style={{
            opacity: isSwiping || isTouchPrevented ? 0 : 0.8,
          }}
        >
          <Description> {cardList.getCurrentCardMessage()} </Description>
        </DescriptionContainer>
      </SwiperWrapper>
    </Container>
  );
};

export default CardSelect;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 22px;

  width: 100%;
  min-height: 500px;

  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
`;

const SwiperWrapper = styled.div`
  position: relative;

  width: 100%;
  margin: 0 auto;
`;

const CardContainer = styled.div`
  position: absolute;
  left: calc(50% - 110px);
  top: 42px;

  width: 221px;
  height: 312px;
  border-radius: 12px;
  margin: 0 auto;

  transform-origin: bottom center;

  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  -webkit-user-select: none;
  user-select: none;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconContainer = styled.div`
  position: absolute;
  left: 50%;

  transform: translateX(-50%);
  transition: opacity ease-out 0.3s, transform ease-out 0.4s 0.15s;
`;

const Title = styled.span`
  color: #212121f2;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: -0.04em;
  text-align: center;

  transition: opacity ease 0.3s;

  @media (max-height: 650px) {
    font-size: 22px;
    line-height: 28px;
  }
`;

const DescriptionContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 365px;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 32px;
  width: 162px;
  border-radius: 16px;

  background-color: #ffffffd9;

  transform: translateX(-50%);
  transition: opacity ease-out 0.5s;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.color.gray500};
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  letter-spacing: -0.02em;
  text-align: center;
`;

const WritingButton = styled.button`
  font-size: 18px;
  color: gray;
`;
