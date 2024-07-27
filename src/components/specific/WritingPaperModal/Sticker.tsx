import { Sticker } from '@/types/sticker';
import {
  MouseEventHandler,
  TouchEventHandler,
  forwardRef,
  useRef,
  useState,
} from 'react';
import styled, { CSSProperties } from 'styled-components';
import trash from '@assets/icons/trash.svg';

interface Props {
  id: number;
  imgUrl: string;
  onDelete: (key: number) => void;
  onUpdate: (id: number, info: Partial<Sticker>) => void;
  defaultX?: number;
  defaultY?: number;
  defaultRotate?: number;
  defaultScale?: number;
}

const Sticker = ({
  id,
  imgUrl,
  onDelete,
  onUpdate,
  defaultX = 0,
  defaultY = 0,
  defaultRotate = 0,
  defaultScale = 1,
}: Props) => {
  // trash Sticker
  const trashRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  const [stickerWidth, setStickerWidth] = useState(0);
  const [stickerHeight, setStickerHeight] = useState(0);
  const [isPendingDeletion, setIsPendingDeletion] = useState(false);

  // translate sticker
  const [x, setX] = useState(defaultX);
  const [y, setY] = useState(defaultY);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  // pinch zoom and rotate
  const [scale, setScale] = useState(defaultScale);
  const [rotate, setRotate] = useState(defaultRotate);
  const [startDistance, setStartDistance] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const [isPinching, setIsPinching] = useState(false);

  const pendDeletion = () => {
    if (isPendingDeletion) return;

    setIsPendingDeletion(true);

    window.navigator.vibrate(50);
  };

  const handleStart = (clientX: number, clientY: number) => {
    setStartX(clientX - x);
    setStartY(clientY - y);

    setIsSwiping(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isSwiping) return;

    const newX = clientX - startX;
    const newY = clientY - startY;

    if (startX && startY) {
      setX(newX);
      setY(newY);
    }

    const trashRect = trashRef.current?.getBoundingClientRect();
    if (trashRect) {
      const { top, right, bottom, left } = trashRect;

      if (
        clientX > left &&
        clientX < right &&
        clientY > top &&
        clientY < bottom
      ) {
        pendDeletion();
      } else {
        setIsPendingDeletion(false);
      }
    }
  };

  const handleEnd = () => {
    setIsSwiping(false);
    setIsPinching(false);

    if (isPendingDeletion) {
      onDelete(id);

      setIsPendingDeletion(true);
    }

    onUpdate(id, { x, y, rotate, scale });
  };

  const stopPropagationMouse = (
    e: React.MouseEvent<Element>,
    callback: () => void
  ) => {
    e.stopPropagation();
    e.preventDefault();

    callback();
  };

  const handleMouseDown: MouseEventHandler = (e) =>
    stopPropagationMouse(e, () => {
      setIsMouseMoving(true);
      handleStart(e.clientX, e.clientY);
    });

  const handleMouseMove: MouseEventHandler = (e) =>
    stopPropagationMouse(e, () => handleMove(e.clientX, e.clientY));

  const handleMouseUp: MouseEventHandler = (e) =>
    stopPropagationMouse(e, () => {
      setIsMouseMoving(false);

      handleEnd();
    });

  const handleMouseLeave: MouseEventHandler = (e) =>
    stopPropagationMouse(e, () => {
      setIsMouseMoving(false);

      handleEnd();
    });

  const handleTouchEnd: TouchEventHandler = (e) => {
    e.stopPropagation();

    handleEnd();
  };

  const handleTouchStart: TouchEventHandler = (e) => {
    e.stopPropagation();

    if (e.touches.length === 1) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }

    if (e.touches.length === 2) {
      setIsPinching(true);

      const distance = getDistance(e.touches[0], e.touches[1]);
      const angle = getAngle(e.touches[0], e.touches[1]);

      setStartDistance(distance);
      setStartAngle(angle);
    }
  };

  const handleTouchMove: TouchEventHandler = (e) => {
    e.stopPropagation();

    if (e.touches.length === 1) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }

    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      const angle = getAngle(e.touches[0], e.touches[1]);

      if (startDistance && startAngle !== null) {
        const newScale = scale * (distance / startDistance);
        const newRotation = rotate + (angle - startAngle);

        setScale(newScale);
        setRotate(newRotation);
        setStartDistance(distance);
        setStartAngle(angle);
      }
    }
  };

  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    return Math.sqrt(
      Math.pow(touch2.pageX - touch1.pageX, 2) +
        Math.pow(touch2.pageY - touch1.pageY, 2)
    );
  };

  const getAngle = (touch1: React.Touch, touch2: React.Touch) => {
    const deltaX = touch2.pageX - touch1.pageX;
    const deltaY = touch2.pageY - touch1.pageY;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  const getPendingDeletionStyle = () => {
    const style: CSSProperties = {
      top: y,
      left: x,
      transform: `scale(${scale}) rotate(${rotate}deg) `,
      transition: isPinching ? 'none' : 'transform 0.3s ease',
    };

    const trashRect = trashRef.current?.getBoundingClientRect();
    const stickerRect = stickerRef.current?.getBoundingClientRect();
    const originRect = originRef.current?.getBoundingClientRect();

    if (isPendingDeletion) {
      if (isMouseMoving) {
        style.opacity = 0.3;
        return style;
      }

      if (!trashRect || !stickerRect || !originRect) return style;

      const originX = originRect.left;
      const originY = originRect.top;

      const trashCenterX = trashRect.left + trashRect.width / 2;
      const trashCenterY = trashRect.top + trashRect.height / 2;

      style.left = `${trashCenterX - stickerWidth / 2 - originX}px`;
      style.top = `${trashCenterY - stickerHeight / 2 - originY}px`;
      style.transform = `scale(0.3) rotate(${rotate}deg)`;
      style.transition = isPinching ? 'none' : 'all 0.3s ease';

      return style;
    }

    return style;
  };

  const handleLoad = () => {
    if (stickerRef && stickerRef.current) {
      const { width, height } = stickerRef.current.getBoundingClientRect();

      setStickerWidth(width);
      setStickerHeight(height);
    }
  };

  return (
    <>
      {isSwiping && <TrashCan isPending={isPendingDeletion} ref={trashRef} />}
      <Container
        ref={stickerRef}
        style={getPendingDeletionStyle()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image src={imgUrl} onLoad={handleLoad} />
      </Container>
      <div ref={originRef} style={{ position: 'absolute', top: 0, left: 0 }} />
    </>
  );
};

const TrashCan = forwardRef<HTMLDivElement, { isPending: boolean }>(
  ({ isPending }, ref) => {
    return (
      <Trash
        ref={ref}
        style={{
          position: 'fixed',
          bottom: '18px',
          left: '50%',
          transform: 'translate(-50%, 0)' + (isPending ? 'scale(1.4)' : ''),
        }}
      >
        <TrashIcon src={trash} />
      </Trash>
    );
  }
);

export default Sticker;

const Container = styled.div`
  position: absolute;

  z-index: 2;
`;

const Image = styled.img`
  min-width: 30px;
  width: 150px;
  max-width: 300px;
  height: auto;
  transform-origin: 'center center';
`;

const Trash = styled.div`
  width: 42px;
  height: 42px;
  background-color: transparent;

  transition: transform 0.2s ease;
  z-index: 2;
`;

const TrashIcon = styled.img`
  width: 100%;
`;
