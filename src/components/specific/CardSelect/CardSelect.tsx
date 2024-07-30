import {
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useState,
} from 'react';
import styled, { keyframes } from 'styled-components';

interface Props extends React.PropsWithChildren {
  onSwipe?: (currentIndex: number) => void;
}

const TOP = -500;
const MIN_Y = -300;
const MAX_Y = 10;

const MIN_X = -10;
const MAX_X = 100;

class CardItem {
  public readonly key: number;
  private readonly colorName: string | undefined;
  private readonly R: number;
  private readonly G: number;
  private readonly B: number;
  private readonly A: number;

  constructor(
    key: number,
    color: { name?: string; R: number; G: number; B: number; A: number }
  ) {
    this.key = key;
    this.colorName = color.name;
    this.R = color.R;
    this.G = color.G;
    this.B = color.B;
    this.A = color.A;
  }

  // # replace '$alpha' to number
  public getRgba() {
    return `rgba(${this.R}, ${this.G}, ${this.B}, ${ALPHA})`;
  }

  public getAlpha() {
    return this.A;
  }
}

const ALPHA = '$alpha';

class CardList {
  private readonly COLORS = [
    { name: 'yellow', R: 255, G: 246, B: 76, A: 1 },
    { name: 'red', R: 242, G: 36, B: 22, A: 0.9 },
    { name: 'blue', R: 85, G: 0, B: 255, A: 0.8 },
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
      const rgba = card.getRgba();
      const alpha = card.getAlpha();

      return { key, rgba, alpha };
    });

    return cards;
  }
}

const cardList = new CardList();

const CardSelect = ({ onSwipe }: Props) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [isTouchPrevented, setIsTouchPrevented] = useState(false);

  const [_, forceUpdate] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

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

    if (isTouchPrevented) return;

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

    if (isHorizontal && deltaY === 0) {
      if (moveX > MAX_X) {
        moveX = MAX_X;
      } else if (moveX < MIN_X) {
        moveX = MIN_X;
      }

      setDeltaX(moveX);
    } else if (!isHorizontal && deltaX === 0) {
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
    if (t > 1) return 1.05;

    if (t < 0) return -0.05;

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
  const maxDistance = isHorizontal ? 200 : -500;

  const firstCardOpacityX = transformEaseOut(distance, 90, 300, 0.85, 0);
  const firstCardBlurX = transformEaseOut(distance, 90, 300, 7, 0);
  const firstCardRotateX = transformEaseOut(
    distance,
    minDistance,
    maxDistance,
    0,
    10
  );

  const firstCardOpacityY = transformEaseOut(distance, -200, -450, 0.85, 0);
  const firstCardBlurY = transformEaseOut(distance, -150, -450, 7, 0);
  const firstCardOpacity = isHorizontal ? firstCardOpacityX : firstCardOpacityY;

  const firstCardStyleX: React.CSSProperties = {
    transform: `translate(${distance}px, ${
      -0.1 * distance
    }px) rotate(${firstCardRotateX}deg)`,
    transition: '0.25s ease-out',
    backdropFilter: `blur(${firstCardBlurX}px)`,
    WebkitBackdropFilter: `blur(${firstCardOpacityX}px)`,
  };

  const firstCardStyleY: React.CSSProperties = {
    transform: `translateY(${distance}px)`,
    transition: '0.25s ease-out',
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
    transition: '0.4s ease-out',
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
    transition: '0.55s ease-out',
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
    transition: '0.7s ease-out',
  };

  useEffect(() => {
    if (currentIndex === 0) return;

    setTimeout(() => {
      setIsTouchPrevented(false);

      cardList.pushPopCardItem();
      setY(() => 0);
      setX(() => 0);
      forceUpdate((prev) => prev + 1);
    }, 400);
  }, [currentIndex]);

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
        {cardList
          .getCards()
          .map((card, index) => {
            const { key, rgba, alpha } = card;
            const OpacityWeight = alpha;

            if (index === 0) {
              const background = rgba.replace(
                ALPHA,
                `${firstCardOpacity * OpacityWeight}`
              );

              return (
                <CardContainer
                  key={key}
                  style={{ ...firstCardStyle, background }}
                />
              );
            } else if (index === 1) {
              const background = rgba.replace(
                ALPHA,
                `${secondCardOpacity * OpacityWeight}`
              );

              return (
                <CardContainer
                  key={key}
                  style={{ ...secondCardStyle, background }}
                />
              );
            } else if (index === 2) {
              const background = rgba.replace(
                ALPHA,
                `${thirdCardOpacity * OpacityWeight}`
              );

              return (
                <CardContainer
                  key={key}
                  style={{ ...thirdCardStyle, background }}
                />
              );
            } else if (index === 3) {
              const background = rgba.replace(
                ALPHA,
                `${fourthCardOpacity * OpacityWeight}`
              );

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
`;

const SwiperWrapper = styled.div`
  position: relative;

  width: 100%;
  margin: 0 auto;
`;

const CardContainerRed = styled.div`
  position: absolute;
  left: 120px;

  width: 200px;
  height: 300px;
  border-radius: 12px;
  margin: 0 auto;

  background: rgba(242, 36, 22, 0.7);

  transition: transform 0.4s ease-out;
  transform-origin: bottom center;
  transform: scale(0.9) rotate(-22.5deg) translateX(-25px);

  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
`;

const CardContainerPurple = styled.div`
  position: absolute;
  left: 120px;

  width: 200px;
  height: 300px;
  border-radius: 12px;
  margin: 0 auto;

  background: rgba(85, 0, 255, 0.4);

  transition: transform 0.55s ease-out;
  transform-origin: bottom center;
  transform: scale(0.8) rotate(-45deg) translateX(-50px);

  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
`;

const CardContainer1 = styled.div`
  position: absolute;
  left: 120px;

  width: 200px;
  height: 300px;
  border-radius: 12px;
  margin: 0 auto;

  background: rgba(255, 246, 76, 0.8);

  transition: transform 0.25s ease-out;
  transform-origin: bottom center;

  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
`;

const CardContainer = styled.div`
  position: absolute;
  left: 120px;

  width: 200px;
  height: 300px;
  border-radius: 12px;
  margin: 0 auto;

  transform-origin: bottom center;

  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
