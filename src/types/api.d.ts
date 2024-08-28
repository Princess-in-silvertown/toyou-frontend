export type ResData<T> = {
  data: T;
  pageInfo?: {
    nextCursor: number;
    totalCount?: number;
  };
};
