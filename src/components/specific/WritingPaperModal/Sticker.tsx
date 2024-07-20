import {
  MouseEventHandler,
  TouchEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import sticker from '@assets/icons/profile.svg';
import styled, { CSSProperties } from 'styled-components';

const Sticker = () => {
  // trash Sticker
  const trashRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  const [stickerWidth, setStickerWidth] = useState(0);
  const [stickerHeight, setStickerHeight] = useState(0);
  const [isPendingDeletion, setIsPendingDeletion] = useState(false);

  // translate sticker
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  // pinch zoom and rotate
  const [scale, setScale] = useState(1);
  const [startDistance, setStartDistance] = useState(0);
  const [rotation, setRotation] = useState(0);
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
      console.log('delete');
      setIsPendingDeletion(true);
    }
    // save x, y, scale, rotate
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
        const newRotation = rotation + (angle - startAngle);

        setScale(newScale);
        setRotation(newRotation);
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
      transform: `scale(${scale}) rotate(${rotation}deg) `,
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
      style.transform = `scale(0.3) rotate(${rotation}deg)`;
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
      {(isSwiping || isPinching) && (
        <TrashCan isPending={isPendingDeletion} ref={trashRef} />
      )}
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
        <Image src={sticker} onLoad={handleLoad} />
      </Container>
      <div ref={originRef} style={{ position: 'absolute', top: 0, left: 0 }} />
    </>
  );
};

const TrashCan = forwardRef<HTMLDivElement, { isPending: boolean }>(
  ({ isPending }, ref) => {
    const handleDrag: TouchEventHandler = (e) => {
      e.stopPropagation();

      console.log('DragOver');
    };

    return (
      <Trash
        ref={ref}
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '50%',
          transform: 'translate(-50%, 0)' + (isPending ? 'scale(1.4)' : ''),
        }}
        onTouchMove={handleDrag}
        onTouchEnd={handleDrag}
        onTouchStart={handleDrag}
      ></Trash>
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
  width: 100px;
  max-width: 300px;
  height: auto;
  transform-origin: 'center center';
`;

const Trash = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: white;

  transition: transform 0.2s ease;
  z-index: 2;
`;
