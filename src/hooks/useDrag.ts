import { MouseEventHandler, TouchEventHandler, useRef, useState } from 'react';

type Direction = 'horizontal' | 'vertical';

type DragCallback = (params: {
  xy: [number, number];
  delta: [number, number];
  defaultXY: [number, number];
  velocity: number;
  direction: Direction | undefined;
  startDirection: Direction | undefined;
  setStates: {
    setX: (x: number) => void;
    setY: (y: number) => void;
    canDrag: (isEnable: boolean) => void;
  };
}) => void;

type Params = {
  defaultXY?: [number, number];
  moveXMinMax?: [number | '-Infinity', number | 'Infinity'];
  moveYMinMax?: [number | '-Infinity', number | 'Infinity'];
  onStart?: DragCallback;
  onMove?: DragCallback;
  onEnd?: DragCallback;
};

export const useDrag = ({
  defaultXY = [0, 0],
  moveXMinMax,
  moveYMinMax,
  onStart,
  onMove,
  onEnd,
}: Params) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEnable, setIsEnable] = useState(true);

  // controllable from outside
  const [x, setX] = useState(defaultXY[0]);
  const [y, setY] = useState(defaultXY[1]);

  // uncontrollable from outside
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);

  const timeStamp = useRef(0);
  const velocity = useRef(0);
  const direction = useRef<Direction>();
  const startDirection = useRef<Direction>();

  const validateScope = (
    number: number,
    scope?: [number | '-Infinity', number | 'Infinity']
  ) => {
    const [min, max] = scope ?? ['-Infinity', 'Infinity'];

    const isOverMin = min === '-Infinity' || min <= number;
    const isBelowMax = max === 'Infinity' || number <= max;

    return isOverMin && isBelowMax;
  };

  const handleChangeX = (x: number) => {
    if (validateScope(x, moveXMinMax)) return setX(x);
  };

  const handleChangeY = (y: number) => {
    if (validateScope(y, moveYMinMax)) return setY(y);
  };

  const handleChangeDeltaX = (x: number) => {
    if (validateScope(x, moveXMinMax)) return setDeltaX(x);
  };

  const handleChangeDeltaY = (y: number) => {
    if (validateScope(y, moveYMinMax)) return setDeltaY(y);
  };

  const canDrag = (isEnable: boolean) => {
    setIsEnable(isEnable);
  };

  const setStates = {
    setX: handleChangeX,
    setY: handleChangeY,
    canDrag,
  };

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);

    onStart?.({
      xy: [clientX, clientY],
      delta: [0, 0],
      defaultXY,
      velocity: 0,
      direction: undefined,
      startDirection: undefined,
      setStates,
    });

    setStartX(clientX);
    setStartY(clientY);

    timeStamp.current = new Date().getTime();
    direction.current = undefined;
    startDirection.current = undefined;
    velocity.current = 0;
  };

  const calculateVelocity = (moveX: number, moveY: number) => {
    const now = new Date().getTime();
    const time = now - timeStamp.current;
    const velocityX = (deltaX - moveX) / time;
    const velocityY = (deltaY - moveY) / time;
    const absVelocity = Math.sqrt(
      velocityX * velocityX + velocityY * velocityY
    );

    velocity.current = absVelocity;
    timeStamp.current = now;
  };

  const calculateDirection = (deltaX: number, deltaY: number) => {
    if (startDirection.current === undefined) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        startDirection.current = 'horizontal';
      } else if (Math.abs(deltaX) < Math.abs(deltaY)) {
        startDirection.current = 'vertical';
      }
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction.current = 'horizontal';
    } else if (Math.abs(deltaX) < Math.abs(deltaY)) {
      direction.current = 'vertical';
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isEnable) return;

    if (!isDragging) return;

    const moveX = clientX - startX;
    const moveY = clientY - startY;

    onMove?.({
      xy: [x, y],
      delta: [moveX, moveY],
      defaultXY,
      velocity: velocity.current,
      direction: direction.current,
      startDirection: startDirection.current,
      setStates,
    });

    handleChangeDeltaX(moveX);
    handleChangeDeltaY(moveY);

    calculateVelocity(moveX, moveY);
    calculateDirection(moveX, moveY);
  };

  const handleEnd = () => {
    if (!isEnable) return;

    if (!isDragging) return;

    onEnd?.({
      xy: [x, y],
      delta: [deltaX, deltaY],
      defaultXY,
      velocity: velocity.current,
      direction: direction.current,
      startDirection: startDirection.current,
      setStates,
    });

    setIsDragging(false);
    setDeltaX(0);
    setDeltaY(0);
  };

  const onTouchStart: TouchEventHandler = (e) =>
    handleStart(e.touches[0].clientX, e.touches[0].clientY);

  const onTouchMove: TouchEventHandler = (e) =>
    handleMove(e.touches[0].clientX, e.touches[0].clientY);

  const onTouchEnd: TouchEventHandler = () => handleEnd();

  const onMouseDown: MouseEventHandler = (e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const onMouseMove: MouseEventHandler = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const onMouseUp: MouseEventHandler = () => handleEnd();

  const onMouseLeave: MouseEventHandler = () => handleEnd();

  return {
    collected: {
      x,
      y,
      deltaX,
      deltaY,
      isDragging,
      velocity: velocity.current,
      direction: direction.current,
      canDrag,
    },

    bind: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
};
