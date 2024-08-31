import { Day, ParsedEvent } from '@/types/event';
import { createContext } from 'react';

export const calenderContext = createContext<{
  monthDaysList: Date[][];
  weekDaysList: Date[][];
  currentRow: number;
  rowCount: number;
  isMoving: boolean;
  isResizing: boolean;
  isWeekView: boolean;
  renderingIndex: number;
  renderingYear: number;
  renderingMonth: number;
  renderingWeekDate: Date;
  currentDate: Date;
  eventMap: ParsedEvent;
  viewWeek: () => Promise<void>;
  viewMonth: () => Promise<void>;
  handleNextMonth: () => Promise<void>;
  handlePrevMonth: () => Promise<void>;
  handleNextWeek: () => Promise<void>;
  handlePrevWeek: () => Promise<void>;
  changeCurrentDate: (date: Date, callback?: (date: Date) => void) => void;
  changeRenderingDate: (date: Date) => void;
  handleChangeEvent: (newEventMap: ParsedEvent) => void;
} | null>(null);
