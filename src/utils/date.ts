export const getStartOfMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
};

export const getEndOfMonth = (year: number, month: number) => {
  const date = new Date(year, month + 1, 0);
  const day = date.getDay();
  const diff = date.getDate() + (6 - day);

  return new Date(date.setDate(diff));
};

export const getStartOfWeek = (date: Date): Date => {
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - date.getDay());
  return startDate;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const compareDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getMonthDays = (year: number, month: number): Date[] => {
  const days = [];

  let day = getStartOfMonth(year, month);
  const endDate = getEndOfMonth(year, month);

  while (day <= endDate) {
    days.push(new Date(day));
    day = addDays(day, 1);
  }

  return days;
};

export const getWeekDays = (date: Date): Date[] => {
  const days: Date[] = [];
  let currentDate = new Date(getStartOfWeek(date));

  for (let i = 0; i < 7; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export const getYearMonthDateTime = (date: Date) => {
  const localeDate = date.toLocaleDateString();
  const [dateTime] = localeDate.replace('. ', '-').split('.');

  return dateTime;
};

export const getDateTime = (date: Date) => {
  const yearString = `${date.getFullYear()}`;
  const month = (date.getMonth() % 12) + 1;
  const monthString = `${month}`.padStart(2, '0');
  const dayString = `${date.getDate()}`.padStart(2, '0');

  const dateTime = `${yearString}-${monthString}-${dayString}`;

  return dateTime;
};

export const parseStringToDateTime = (dateTime: string | undefined) => {
  if (!dateTime) return;

  const [year, month, day] = dateTime.split('-');

  if (dateTime.length !== 10 || !year || !month || !day) return;

  const date = year + month + day;
  return date;
};

export const parseDateTimeToString = (dateString: string | undefined) => {
  if (!dateString || dateString.length !== 8) return;

  return (
    dateString.slice(0, 4) +
    '-' +
    dateString.slice(4, 6) +
    '-' +
    dateString.slice(6, 8)
  );
};

export const isValidDate = (birthdate: string) => {
  if (!/^\d{8}$/.test(birthdate)) {
    return true;
  }

  const year = parseInt(birthdate.slice(0, 4), 10);
  const month = parseInt(birthdate.slice(4, 6), 10);
  const day = parseInt(birthdate.slice(6, 8), 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
};
