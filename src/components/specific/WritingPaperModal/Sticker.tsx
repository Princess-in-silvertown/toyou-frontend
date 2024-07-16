import { MouseEventHandler, TouchEventHandler, useState } from 'react';
import sticker from '@assets/icons/profile.svg';
import styled from 'styled-components';

const Sticker = () => {
  // translate sticker
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  // pinch zoom and rotate
  const [scale, setScale] = useState(1);
  const [lastDistance, setLastDistance] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [lastAngle, setLastAngle] = useState(0);

  const handleStart = (clientX: number, clientY: number) => {
    setStartX(clientX);
    setStartY(clientY);

    setIsSwiping(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isSwiping) return;

    const moveX = clientX - startX;
    const moveY = clientY - startY;

    setDeltaX(moveX);
    setDeltaY(moveY);
  };

  const handleEnd = () => {
    setX((prev) => prev + deltaX);
    setY((prev) => prev + deltaY);

    setDeltaX(() => 0);
    setDeltaY(() => 0);

    if (Math.abs(deltaX) <= 50) return;

    setIsSwiping(false);
  };

  const stopPropagationMouse = (
    e: React.MouseEvent<Element>,
    callback: () => void
  ) => {
    e.stopPropagation();
    callback();
  };

  const handleMouseDown: MouseEventHandler = (e) =>
    stopPropagationMouse(e, () => handleStart(e.clientX, e.clientY));

  const handleMouseMove: MouseEventHandler = (e) =>
    stopPropagationMouse(e, () => handleMove(e.clientX, e.clientY));

  const handleMouseUp: MouseEventHandler = (e) =>
    stopPropagationMouse(e, () => handleEnd());

  const handleMouseLeave: MouseEventHandler = (e) =>
    stopPropagationMouse(e, () => handleEnd());

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
      const distance = getDistance(e.touches[0], e.touches[1]);
      const angle = getAngle(e.touches[0], e.touches[1]);

      setLastDistance(distance);
      setLastAngle(angle);
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

      if (lastDistance && lastAngle !== null) {
        const newScale = scale * (distance / lastDistance);
        const newRotation = rotation + (angle - lastAngle);

        setScale(newScale);
        setRotation(newRotation);
        setLastDistance(distance);
        setLastAngle(angle);
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

  return (
    <Container
      style={{
        top: y + deltaY,
        left: x + deltaX,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image src={sticker} />
    </Container>
  );
};

export default Sticker;

const Container = styled.div`
  position: absolute;

  z-index: 2;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  transform-origin: 'center center';
`;
