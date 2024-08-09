import {
  addDays,
  getMonthDays,
  getStartOfWeek,
  getWeekDays,
} from '@utils/date';
import { delay } from 'msw';
import { useMemo, useState } from 'react';

export const useCalender = () => {
  const date = useMemo(() => new Date(), []);

  const [isMoving, setIsMoving] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isWeekView, setIsWeekView] = useState(false);

  const [renderingIndex, setRenderingIndex] = useState(1);
  const [renderingYear, setRenderingYear] = useState(date.getFullYear());
  const [renderingMonth, setRenderingMonth] = useState(date.getMonth());
  const [renderingWeekDate, setRenderingWeekDate] = useState(date);

  const [currentDate, setCurrentDate] = useState(date);

  const viewWeek = async () => {
    if (isResizing) return;

    setIsResizing(true);
    setIsWeekView(true);
    await delay(300);
    setIsResizing(false);
  };

  const viewMonth = async () => {
    if (isResizing) return;

    setIsResizing(true);
    await delay(0);
    setIsWeekView(false);
    await delay(300);
    setIsResizing(false);
  };

  const handleNextWeek = async () => {
    if (isMoving) return;

    const nextWeekSunday = getStartOfWeek(addDays(currentDate, 7));

    changeCurrentDate(nextWeekSunday, () => {});

    setRenderingIndex(2);
    setIsMoving(true);
    await delay(800);
    setIsMoving(false);
    await delay(0);
    setRenderingIndex(1);

    changeRenderingDate(nextWeekSunday);
  };

  const handlePrevWeek = async () => {
    if (isMoving) return;

    const prevWeekSunday = getStartOfWeek(addDays(currentDate, -7));

    changeCurrentDate(prevWeekSunday, () => {});

    setRenderingIndex(0);
    setIsMoving(true);
    await delay(800);
    setIsMoving(false);
    await delay(0);
    setRenderingIndex(1);

    changeRenderingDate(prevWeekSunday);
  };

  const handleNextMonth = async () => {
    if (isMoving) return;

    const nextDate = new Date(renderingYear, renderingMonth + 1, 1);

    changeCurrentDate(nextDate, (date: Date) => {});

    setRenderingIndex(2);
    setIsMoving(true);
    await delay(500);
    setIsMoving(false);
    await delay(0);
    setRenderingIndex(1);

    changeRenderingDate(nextDate);
  };

  const handlePrevMonth = async () => {
    if (isMoving) return;

    const prevDate = new Date(renderingYear, renderingMonth - 1, 1);

    changeCurrentDate(prevDate, (date: Date) => {});

    setRenderingIndex(0);
    setIsMoving(true);
    await delay(500);
    setIsMoving(false);
    await delay(0);
    setRenderingIndex(1);

    changeRenderingDate(prevDate);
  };

  const changeRenderingDate = (date: Date) => {
    const newDate = new Date(date);

    setRenderingWeekDate(newDate);
    setRenderingMonth(newDate.getMonth());
    setRenderingYear(newDate.getFullYear());
  };

  const changeCurrentDate = (date: Date, callback?: (date: Date) => void) => {
    const newDate = new Date(date);
    setCurrentDate(newDate);

    callback?.(newDate);
  };

  const weekDays = useMemo(
    () => getWeekDays(renderingWeekDate),
    [renderingWeekDate]
  );

  const nextWeekDays = useMemo(
    () => getWeekDays(addDays(renderingWeekDate, 7)),
    [renderingWeekDate]
  );

  const prevWeekDays = useMemo(
    () => getWeekDays(addDays(renderingWeekDate, -7)),
    [renderingWeekDate]
  );

  const monthDays = useMemo(
    () => getMonthDays(renderingYear, renderingMonth),
    [renderingYear, renderingMonth]
  );

  const nextMonthDays = useMemo(
    () => getMonthDays(renderingYear, renderingMonth + 1),
    [renderingYear, renderingMonth]
  );

  const prevMonthDays = useMemo(
    () => getMonthDays(renderingYear, renderingMonth - 1),
    [renderingYear, renderingMonth]
  );

  const currentRow = useMemo(() => {
    const date = new Date(
      renderingWeekDate.getFullYear(),
      renderingWeekDate.getMonth(),
      1
    );

    const length = renderingWeekDate.getDate() + date.getDay();

    return Math.ceil(length / 7) - 1;
  }, [renderingWeekDate]);

  const rowCount = Math.max(
    Math.ceil(monthDays.length / 7),
    Math.ceil(nextMonthDays.length / 7),
    Math.ceil(prevMonthDays.length / 7)
  );

  const monthDaysList = [prevMonthDays, monthDays, nextMonthDays];
  const weekDaysList = [prevWeekDays, weekDays, nextWeekDays];

  return {
    monthDaysList,
    weekDaysList,
    currentRow,
    rowCount,
    isMoving,
    isResizing,
    isWeekView,
    renderingIndex,
    renderingYear,
    renderingMonth,
    renderingWeekDate,
    currentDate,
    viewWeek,
    viewMonth,
    handleNextMonth,
    handlePrevMonth,
    handleNextWeek,
    handlePrevWeek,
    changeCurrentDate,
    changeRenderingDate,
  };
};
