import {
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import nextIcon from '@assets/icons/up.svg';
import NextIcon from './UpIcon';

interface Props extends React.PropsWithChildren {
  isSelected: boolean;
  onSelected: (card: any) => void;
}

const TOP = -400;
const MIN_Y = -300;
const MAX_Y = 10;

const MIN_X = -10;
const MAX_X = 100;

class CardItem {
  public readonly key: number;
  private readonly R: number;
  private readonly G: number;
  private readonly B: number;
  private readonly A: number;

  constructor(
    key: number,
    color: { R: number; G: number; B: number; A: number }
  ) {
    this.key = key;
    this.R = color.R;
    this.G = color.G;
    this.B = color.B;
    this.A = color.A;
  }

  // # replace '$alpha' to number
  public getRgb() {
    return [this.R, this.G, this.B];
  }

  public getAlpha() {
    return this.A;
  }
}

const ALPHA = '$alpha';

class CardList {
  public readonly COLORS = [
    { name: 'yellow', R: 255, G: 234, B: 76, A: 1 },
    { name: 'red', R: 242, G: 36, B: 22, A: 0.9 },
    { name: 'blue', R: 85, G: 0, B: 255, A: 0.8 },
    { name: 'green', R: 47, G: 223, B: 156, A: 0.8 },
  ];

  private readonly COLOR_LENGTH = this.COLORS.length;
  private readonly MAX_LENGTH = this.COLORS.length + 1;

  private next: number = 0;
  private cards: CardItem[] = [];

  constructor() {
    new Array(this.MAX_LENGTH).fill(0).forEach(() => {
      this.addCardItem();
    });
  }

  private addCardItem() {
    const colorIndex = this.next % this.COLOR_LENGTH;
    const color = this.COLORS[colorIndex];
    const newCard = new CardItem(this.next, color);

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

  public getCurrentCardColor() {
    const first = [...this.cards].shift();

    return first?.getRgb() ?? [0, 0, 0];
  }
}

const ICON_COLOR = [160, 85, 9] as const;

const cardList = new CardList();

const CardSelect = ({ isSelected, onSelected }: Props) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [isTouchPrevented, setIsTouchPrevented] = useState(false);

  const [_, forceUpdate] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const [isHorizontal, setIsHorizontal] = useState<boolean | null>(null);
  const [y, setY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [x, setX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);

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

    if (isTouchPrevented || isSelected) return;

    let moveX = clientX - startX ?? 0;
    let moveY = clientY - startY ?? 0;

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

    if (deltaY <= -100) {
      setY(-500);
      setCurrentIndex((prev) => prev + 1);
      setIsTouchPrevented(true);

      onSelected?.(1);
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

  const easeOutCubic = (t: number) => {
    if (t > 1) return 1;

    if (t < 0) return 0;

    return 1 - Math.pow(1 - t, 3);
  };

  const transformEaseOut = (
    value: number,
    x_min: number,
    x_max: number,
    y_min: number,
    y_max: number
  ) => {
    const t = (value - x_min) / (x_max - x_min);
    const easedT = easeOutCubic(t);
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

  const iconTranslateY = transformEaseOut(distance, 10, -50, -2, 5);
  const iconTranslateX = transformEaseOut(distance, 0, 50, 0, 5);
  const iconOpacity = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    1,
    0
  );

  const fourthCardStyle: React.CSSProperties = {
    transform: `scale(${fourthCardScale}) rotate(${fourthCardRotate}deg) translateX(${fourthCardTranslateX}px)`,
    transition: '0.7s cubic-bezier(.17,.67,.52,1.25)',
  };

  useEffect(() => {
    if (currentIndex === 0) return;

    setTimeout(() => {
      setIsTouchPrevented(false);

      cardList.pushPopCardItem();

      setY(() => 0);
      setX(() => 0);
      forceUpdate((prev) => prev + 1);
    }, 500);
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
      <TitleContainer></TitleContainer>
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
  transition: opacity ease 0.3s, transform ease 0.4s 0.15s;
`;
