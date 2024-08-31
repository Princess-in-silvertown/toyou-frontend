import { useCalender } from '@hooks/useCalender';
import { calenderContext } from '../states/calenderContext';
import { Day, ParsedEvent } from '@/types/event';
import { useState } from 'react';
import { useEvent } from '@hooks/queries/useEvent';

interface Props extends React.PropsWithChildren {}

export const CalenderProvider = ({ children }: Props) => {
  const value = useCalender();

  const [eventMap, setEventMap] = useState<ParsedEvent>({});

  const handleChangeEvent = (eventMap: ParsedEvent) => {
    setEventMap((prev) => {
      return { ...eventMap, ...prev };
    });
  };

  // preload
  const nextMonthData = new Date(value.renderingYear, value.renderingMonth + 1);
  nextMonthData.setMonth(nextMonthData.getMonth());
  useEvent(
    nextMonthData.getFullYear(),
    nextMonthData.getMonth(),
    handleChangeEvent
  );

  // preload
  const prevMonthDate = new Date(value.renderingYear, value.renderingMonth - 1);
  prevMonthDate.setMonth(prevMonthDate.getMonth());
  useEvent(
    prevMonthDate.getFullYear(),
    prevMonthDate.getMonth(),
    handleChangeEvent
  );

  useEvent(value.renderingYear, value.renderingMonth, handleChangeEvent);

  return (
    <calenderContext.Provider value={{ ...value, eventMap, handleChangeEvent }}>
      {children}
    </calenderContext.Provider>
  );
};
