import { delay } from 'msw';
import React, { useMemo, useState } from 'react';

import styled from 'styled-components';

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

  const compareDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
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

  return {
    weekDays,
    prevWeekDays,
    nextWeekDays,
    monthDays,
    prevMonthDays,
    nextMonthDays,
    currentRow,
    rowCount,
    isMoving,
    isResizing,
    isWeekView,
    renderingIndex,
    renderingYear,
    renderingMonth,
    currentDate,
    viewWeek,
    viewMonth,
    handleNextMonth,
    handlePrevMonth,
    handleNextWeek,
    handlePrevWeek,
    changeCurrentDate,
    changeRenderingDate,
    compareDate,
    compareRenderingMonth,
  };
};

const Calendar: React.FC = () => {
  const {
    weekDays,
    prevWeekDays,
    nextWeekDays,
    monthDays,
    prevMonthDays,
    nextMonthDays,
    currentRow,
    rowCount,
    isMoving,
    isResizing,
    isWeekView,
    renderingIndex,
    renderingYear,
    renderingMonth,
    currentDate,
    viewWeek,
    viewMonth,
    handleNextMonth,
    handlePrevMonth,
    handleNextWeek,
    handlePrevWeek,
    changeCurrentDate,
    changeRenderingDate,
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
      if (isWeekView) {
        changeRenderingDate(day);
        changeCurrentDate(day);

        return;
      }

      if (day.getMonth() === renderingMonth) {
        changeCurrentDate(day, () => {});
        changeRenderingDate(day);
      } else if (day < new Date(renderingYear, renderingMonth)) {
        handlePrevMonth().then(() => {
          changeCurrentDate(day);
          changeRenderingDate(day);
        });

        changeCurrentDate(day, () => {});
      } else if (day > new Date(renderingYear, renderingMonth)) {
        handleNextMonth().then(() => {
          changeCurrentDate(day);
          changeRenderingDate(day);
        });

        changeCurrentDate(day, () => {});
      }
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
                    transition: isMoving ? 'ease-in-out 0.8s' : 'none',
                  }}
                >
                  {prevWeekDays.map((day) => (
                    <DateCell
                      key={day.toString()}
                      onClick={makeClickDayHandler(day)}
                    >
                      <DateCircle
                        $isSmallView={true}
                        $isCurrentDay={compareDate(day, currentDate)}
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
                    transition: isMoving ? 'ease-in-out 0.8s' : 'none',
                  }}
                >
                  {weekDays.map((day) => (
                    <DateCell
                      key={day.toString()}
                      onClick={makeClickDayHandler(day)}
                    >
                      <DateCircle
                        $isSmallView={true}
                        $isCurrentDay={compareDate(day, currentDate)}
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
                    transition: isMoving ? 'ease-in-out 0.8s' : 'none',
                  }}
                >
                  {nextWeekDays.map((day) => (
                    <DateCell
                      key={day.toString()}
                      onClick={makeClickDayHandler(day)}
                    >
                      <DateCircle
                        $isSmallView={true}
                        $isCurrentDay={compareDate(day, currentDate)}
                        $isRenderingMonth={true}
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
                transform: `translateY(${isWeekView ? -48 * currentRow : 0}px`,
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
                      $isCurrentDay={compareDate(day, currentDate)}
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
                transform: `translateY(${isWeekView ? -48 * currentRow : 0}px`,
              }}
            >
              <DatesGrid
                style={{
                  transform: `translateX(${-100 * renderingIndex}%`,
                  transition: isMoving ? 'ease-in-out 0.5s' : 'none',
                }}
              >
                {monthDays.map((day) => (
                  <DateCell
                    key={day.toString() + renderingMonth}
                    onClick={makeClickDayHandler(day)}
                  >
                    <DateCircle
                      $isSmallView={isWeekView}
                      $isCurrentDay={compareDate(day, currentDate)}
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
                transform: `translateY(${isWeekView ? -48 * currentRow : 0}px`,
              }}
            >
              <DatesGrid
                style={{
                  transform: `translateX(${-100 * renderingIndex}%)`,
                  transition: isMoving ? 'ease-in-out 0.5s' : 'none',
                }}
              >
                {nextMonthDays.map((day) => (
                  <DateCell
                    key={day.toString()}
                    onClick={makeClickDayHandler(day)}
                  >
                    <DateCircle
                      $isSmallView={isWeekView}
                      $isCurrentDay={compareDate(day, currentDate)}
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
