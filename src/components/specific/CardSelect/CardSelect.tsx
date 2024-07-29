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
    const cards = this.cards.map((card, index) => {
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
  const [isIdle, setIsIdle] = useState(true);
  const [isSwipingY, setIsSwipingY] = useState(false);
  const [isSelected, setIsSelected] = useState(0);
  const [_, forceUpdate] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [y, setY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [deltaY, setDeltaY] = useState(0);

  const handleStart = (clientY: number) => {
    setStartY(clientY);
    setIsSwipingY(true);
  };

  const handleMove = (clientY: number) => {
    if (!isSwipingY) return;

    let moveY = clientY - startY ?? 0;

    if (moveY > MAX_Y) {
      moveY = MAX_Y;
    } else if (moveY < MIN_Y) {
      moveY = MIN_Y;
    }

    setDeltaY(moveY);
  };

  const handleEnd = () => {
    setDeltaY(0);

    if (deltaY > -100) return;

    setIsSwipingY(false);
    setY(() => -500);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTouchStart: TouchEventHandler = (e) =>
    handleStart(e.touches[0].clientY);
  const handleTouchMove: TouchEventHandler = (e) =>
    handleMove(e.touches[0].clientY);
  const handleTouchEnd: TouchEventHandler = () => handleEnd();

  const handleMouseDown: MouseEventHandler = (e) => handleStart(e.clientY);
  const handleMouseMove: MouseEventHandler = (e) => handleMove(e.clientY);
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

  const firstCardOpacity = transformEaseOut(y + deltaY, -200, -450, 0.85, 0);
  const firstCardBlur = transformEaseOut(y + deltaY, -150, -450, 7, 0);
  const firstCardStyle: React.CSSProperties = {
    transform: `translateY(${-isSelected * 500 + y + deltaY}px)`,
    transition: '0.25s ease-out',
    backdropFilter: `blur(${firstCardBlur}px)`,
    WebkitBackdropFilter: `blur(${firstCardBlur}px)`,
  };

  const secondCardScale = transformEaseOut(y + deltaY, 10, -500, 0.9, 1);
  const secondCardRotate = transformEaseOut(y + deltaY, 10, -500, -22.5, 0);
  const secondCardTranslateX = transformEaseOut(y + deltaY, 10, -500, -25, 0);
  const secondCardOpacity = transformEaseOut(y + deltaY, 10, -500, 0.75, 0.85);
  const secondCardStyle: React.CSSProperties = {
    transform: `scale(${secondCardScale}) rotate(${secondCardRotate}deg) translateX(${secondCardTranslateX}px)`,
    transition: '0.4s ease-out',
  };

  const thirdCardScale = transformEaseOut(y + deltaY, 10, -500, 0.8, 0.9);
  const thirdCardRotate = transformEaseOut(y + deltaY, 10, -500, -45, -22.5);
  const thirdCardTranslateX = transformEaseOut(y + deltaY, 10, -500, -50, -25);
  const thirdCardOpacity = transformEaseOut(y + deltaY, 10, -500, 0.5, 0.7);
  const thirdCardStyle: React.CSSProperties = {
    transform: `scale(${thirdCardScale}) rotate(${thirdCardRotate}deg) translateX(${thirdCardTranslateX}px)`,
    transition: '0.55s ease-out',
  };

  const fourthCardScale = transformEaseOut(y + deltaY, 10, -500, 0.5, 0.8);
  const fourthCardRotate = transformEaseOut(y + deltaY, 10, -500, -55, -45);
  const fourthCardTranslateX = transformEaseOut(y + deltaY, 10, -500, -60, -50);
  const fourthCardOpacity = transformEaseOut(y + deltaY, 10, -500, -0.1, 0.5);
  const fourthCardStyle: React.CSSProperties = {
    transform: `scale(${fourthCardScale}) rotate(${fourthCardRotate}deg) translateX(${fourthCardTranslateX}px)`,
    transition: '0.7s ease-out',
  };

  useEffect(() => {
    if (currentIndex === 0) return;

    setTimeout(() => {
      cardList.pushPopCardItem();
      setY(() => 0);
      forceUpdate((prev) => prev + 1);
    }, 500);
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
