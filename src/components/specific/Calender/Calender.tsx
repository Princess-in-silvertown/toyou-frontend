import { delay } from 'msw';
import React, { useMemo, useState } from 'react';

import styled, { keyframes } from 'styled-components';

const CalendarContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 420px;
  min-width: 350px;

  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 25px;

  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
`;

const DaysOfWeek = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
`;

const Day = styled.div`
  flex-grow: 1;
  font-size: 10px;
  color: #aaaaaa;
  text-align: center;
`;

const WeekGridContainer = styled.div`
  flex-shrink: 0;

  width: 100%;
  padding: 4px 0;

  transition: transform 0.3s ease-in-out;
`;

const GridContainer = styled.div`
  flex-shrink: 0;

  width: 100%;
  padding: 4px 0;

  transition: transform 0.3s ease-in-out;
`;

const DatesContainer = styled.div`
  display: flex;
  align-items: start;

  margin: 0 25px;

  transition: height ease-in-out 0.3s;
  /* height: 51px; */

  overflow: hidden;
`;

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 8px;

  transform: translateX(-100%);
`;

const DateCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateCircle = styled.div<{
  $isCurrentDay: boolean;
  $isRenderingMonth: boolean;
  $isSmallView: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid
    ${({ $isCurrentDay, $isRenderingMonth }) => {
      if ($isRenderingMonth) return $isCurrentDay ? 'none' : '#616161';

      return '#616161';
    }};

  font-size: 10px;
  color: ${({ $isCurrentDay, $isRenderingMonth }) => {
    if ($isRenderingMonth) return $isCurrentDay ? 'white' : '#616161';

    return '#616161';
  }};

  background-color: ${({ $isCurrentDay, $isRenderingMonth }) => {
    if ($isRenderingMonth) return $isCurrentDay ? '#DD432E' : 'transparent';

    return 'transparent';
  }};

  opacity: ${({ $isRenderingMonth, $isSmallView }) =>
    $isSmallView || $isRenderingMonth ? 1 : 0.3};

  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
`;

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const useCalender = () => {
  const date = useMemo(() => new Date(), []);

  const [isMoving, setIsMoving] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isWeekView, setIsWeekView] = useState(false);

  const [renderingIndex, setRenderingIndex] = useState(1);
  const [renderingYear, setRenderingYear] = useState(date.getFullYear());
  const [renderingMonth, setRenderingMonth] = useState(date.getMonth());
  const [renderingWeek, setRenderingWeek] = useState(0); // 현재를 기점으로 몇주 차이나는지

  const [currentDate, setCurrentDate] = useState(date);

  const viewWeek = async () => {
    if (isResizing) return;

    setIsWeekView(true);
    setIsResizing(true);

    await delay(300);

    setIsResizing(false);
  };

  const viewMonth = async () => {
    if (isMoving) return;

    setIsResizing(true);

    await delay(0);
    setIsWeekView(false);
    await delay(300);

    setIsResizing(false);
  };

  const handleNextWeek = async () => {
    if (isMoving) return;

    setRenderingIndex(2);
    setIsMoving(true);

    await delay(800);
    setIsMoving(false);
    await delay(0);

    setRenderingIndex(1);

    const nextWeekSunday = getStartOfWeek(addDays(currentDate, 7));
    changeCurrentDate(nextWeekSunday, () => {});
  };

  const handlePrevWeek = async () => {
    if (isMoving) return;

    setRenderingIndex(0);
    setIsMoving(true);

    await delay(800);
    setIsMoving(false);
    await delay(0);

    setRenderingIndex(1);

    const prevWeekSunday = getStartOfWeek(addDays(currentDate, -7));
    changeCurrentDate(prevWeekSunday, () => {});
  };

  const handleNextMonth = async () => {
    if (isMoving) return;

    changeCurrentDate(
      new Date(renderingYear, renderingMonth + 1, 1),
      (date: Date) => {}
    );

    setRenderingIndex(2);
    setIsMoving(true);

    await delay(500);
    setIsMoving(false);
    await delay(0);

    setRenderingIndex(1);

    if (renderingMonth < 11) {
      setRenderingMonth((prev) => prev + 1);
    } else {
      setRenderingMonth(0);
      setRenderingYear((prev) => prev + 1);
    }
  };

  const handlePrevMonth = async () => {
    if (isMoving) return;

    changeCurrentDate(
      new Date(renderingYear, renderingMonth - 1, 1),
      (date: Date) => {}
    );

    setRenderingIndex(0);
    setIsMoving(true);

    await delay(500);
    setIsMoving(false);
    await delay(0);

    setRenderingIndex(1);

    if (renderingMonth > 1) {
      setRenderingMonth((prev) => prev - 1);
    } else {
      setRenderingMonth(11);
      setRenderingYear((prev) => prev - 1);
    }
  };

  const changeCurrentDate = (date: Date, callback: (date: Date) => void) => {
    const newDate = new Date(date);
    setCurrentDate(newDate);

    callback(newDate);
  };

  const getStartOfWeek = (date: Date): Date => {
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay());
    return startDate;
  };

  const getStartOfMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };

  const getEndOfMonth = (year: number, month: number) => {
    const date = new Date(year, month + 1, 0);
    const day = date.getDay();
    const diff = date.getDate() + (6 - day);

    return new Date(date.setDate(diff));
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const compareDate = (date: Date) => {
    return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    );
  };

  const compareRenderingMonth = (date: Date, diff?: number) => {
    return (date.getMonth() + 12 - (diff ?? 0)) % 12 === renderingMonth;
  };

  const getMonthDays = (year: number, month: number): Date[] => {
    const days = [];

    let day = getStartOfMonth(year, month);
    const endDate = getEndOfMonth(year, month);

    while (day <= endDate) {
      days.push(new Date(day));
      day = addDays(day, 1);
    }

    return days;
  };

  const getWeekDays = (date: Date): Date[] => {
    const days: Date[] = [];
    let currentDate = new Date(getStartOfWeek(date));

    for (let i = 0; i < 7; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  return {
    isMoving,
    isResizing,
    isWeekView,
    renderingIndex,
    renderingYear,
    renderingMonth,
    renderingWeek,
    currentDate,
    getMonthDays,
    getWeekDays,
    addDays,
    viewWeek,
    viewMonth,
    handleNextMonth,
    handlePrevMonth,
    handleNextWeek,
    handlePrevWeek,
    changeCurrentDate,
    compareDate,
    compareRenderingMonth,
  };
};

const Calendar: React.FC = () => {
  const {
    isMoving,
    isResizing,
    isWeekView,
    renderingIndex,
    renderingYear,
    renderingMonth,
    renderingWeek,
    currentDate,
    getMonthDays,
    getWeekDays,
    addDays,
    viewWeek,
    viewMonth,
    handleNextMonth,
    handlePrevMonth,
    handleNextWeek,
    handlePrevWeek,
    changeCurrentDate,
    compareDate,
    compareRenderingMonth,
  } = useCalender();

  const renderHeader = () => {
    const handleClickViewChange = () => {
      if (isWeekView) return viewMonth();
      if (!isWeekView) return viewWeek();
    };

    return (
      <Header>
        <div>{`${renderingYear}년 ${renderingMonth + 1}월`}</div>
        <Button onClick={isWeekView ? handlePrevWeek : handlePrevMonth}>
          {'<'}
        </Button>
        <Button onClick={isWeekView ? handleNextWeek : handleNextMonth}>
          {'>'}
        </Button>
        <div onClick={handleClickViewChange}>뷰 전환</div>
      </Header>
    );
  };

  const renderDaysOfWeek = () => {
    return (
      <DaysOfWeek>
        {DAYS.map((day, index) => (
          <Day key={index}>{day}</Day>
        ))}
      </DaysOfWeek>
    );
  };

  const renderDates = () => {
    const makeClickDayHandler = (day: Date) => () => {
      if (day.getMonth() < renderingMonth) handlePrevMonth();

      if (day.getMonth() > renderingMonth) handleNextMonth();

      changeCurrentDate(day, () => {});
    };

    const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

    const nextWeekDays = useMemo(
      () => getWeekDays(addDays(currentDate, 7)),
      [currentDate]
    );

    const prevWeekDays = useMemo(
      () => getWeekDays(addDays(currentDate, -7)),
      [currentDate]
    );

    const days = useMemo(
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

    const rowCount = Math.max(
      Math.ceil(days.length / 7),
      Math.ceil(nextMonthDays.length / 7),
      Math.ceil(prevMonthDays.length / 7)
    );

    const getCurrentRow = () => {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );

      const length = currentDate.getDate() + date.getDay();

      return Math.ceil(length / 7) - 1;
    };

    return (
      <>
        {!isResizing && isWeekView ? (
          <>
            <DatesContainer
              style={{
                height: 48,
              }}
            >
              <WeekGridContainer>
                <DatesGrid
                  style={{
                    transform: `translate(${-100 * renderingIndex}%)`,
                    transition: isMoving ? 'ease-in-out  0.8s' : 'none',
                  }}
                >
                  {prevWeekDays.map((day) => (
                    <DateCell
                      key={day.toString()}
                      onClick={makeClickDayHandler(day)}
                    >
                      <DateCircle
                        $isSmallView={true}
                        $isCurrentDay={compareDate(day)}
                        $isRenderingMonth={compareRenderingMonth(day)}
                      >
                        {day.getDate()}
                      </DateCircle>
                    </DateCell>
                  ))}
                </DatesGrid>
              </WeekGridContainer>
              <WeekGridContainer>
                <DatesGrid
                  style={{
                    transform: `translate(${-100 * renderingIndex}%)`,
                    transition: isMoving ? 'ease-in-out   0.8s' : 'none',
                  }}
                >
                  {weekDays.map((day) => (
                    <DateCell
                      key={day.toString()}
                      onClick={makeClickDayHandler(day)}
                    >
                      <DateCircle
                        $isSmallView={true}
                        $isCurrentDay={compareDate(day)}
                        $isRenderingMonth={true}
                      >
                        {day.getDate()}
                      </DateCircle>
                    </DateCell>
                  ))}
                </DatesGrid>
              </WeekGridContainer>
              <WeekGridContainer>
                <DatesGrid
                  style={{
                    transform: `translate(${-100 * renderingIndex}%)`,
                    transition: isMoving ? 'ease-in-out   0.8s' : 'none',
                  }}
                >
                  {nextWeekDays.map((day) => (
                    <DateCell
                      key={day.toString()}
                      onClick={makeClickDayHandler(day)}
                    >
                      <DateCircle
                        $isSmallView={true}
                        $isCurrentDay={compareDate(day)}
                        $isRenderingMonth={compareRenderingMonth(day)}
                      >
                        {day.getDate()}
                      </DateCircle>
                    </DateCell>
                  ))}
                </DatesGrid>
              </WeekGridContainer>
            </DatesContainer>
          </>
        ) : (
          <DatesContainer
            style={{
              height: isWeekView ? 48 : rowCount * 48,
            }}
          >
            <GridContainer
              style={{
                transform: `translateY(${
                  isWeekView ? -48 * getCurrentRow() : 0
                }px`,
              }}
            >
              <DatesGrid
                style={{
                  transform: `translate(${-100 * renderingIndex}%)`,
                  transition: isMoving ? 'ease-in-out 0.5s' : 'none',
                }}
              >
                {prevMonthDays.map((day) => (
                  <DateCell
                    key={day.toString()}
                    onClick={makeClickDayHandler(day)}
                  >
                    <DateCircle
                      $isSmallView={isWeekView}
                      $isCurrentDay={compareDate(day)}
                      $isRenderingMonth={compareRenderingMonth(day, -1)}
                    >
                      {day.getDate()}
                    </DateCircle>
                  </DateCell>
                ))}
              </DatesGrid>
            </GridContainer>
            <GridContainer
              style={{
                transform: `translateY(${
                  isWeekView ? -48 * getCurrentRow() : 0
                }px`,
              }}
            >
              <DatesGrid
                style={{
                  transform: `translateX(${-100 * renderingIndex}%`,
                  transition: isMoving ? 'ease-out 0.5s' : 'none',
                }}
              >
                {days.map((day) => (
                  <DateCell
                    key={day.toString() + renderingMonth}
                    onClick={makeClickDayHandler(day)}
                  >
                    <DateCircle
                      $isSmallView={isWeekView}
                      $isCurrentDay={compareDate(day)}
                      $isRenderingMonth={compareRenderingMonth(day)}
                    >
                      {day.getDate()}
                    </DateCircle>
                  </DateCell>
                ))}
              </DatesGrid>
            </GridContainer>
            <GridContainer
              style={{
                transform: `translateY(${
                  isWeekView ? -48 * getCurrentRow() : 0
                }px`,
              }}
            >
              <DatesGrid
                style={{
                  transform: `translateX(${-100 * renderingIndex}%)`,
                  transition: isMoving ? 'ease-out 0.5s' : 'none',
                }}
              >
                {nextMonthDays.map((day) => (
                  <DateCell
                    key={day.toString()}
                    onClick={makeClickDayHandler(day)}
                  >
                    <DateCircle
                      $isSmallView={isWeekView}
                      $isCurrentDay={compareDate(day)}
                      $isRenderingMonth={compareRenderingMonth(day, 1)}
                    >
                      {day.getDate()}
                    </DateCircle>
                  </DateCell>
                ))}
              </DatesGrid>
            </GridContainer>
          </DatesContainer>
        )}
      </>
    );
  };

  return (
    <CalendarContainer>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDates()}
    </CalendarContainer>
  );
};

export default Calendar;
