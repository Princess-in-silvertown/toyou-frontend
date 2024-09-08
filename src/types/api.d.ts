export type ResData<T> = {
  code: string;
  data: T;
  pageInfo?: {
    nextCursorId: number;
    pageElements: number;
    totalElements: number;
    hasNext: boolean;
  };
};
