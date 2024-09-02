export type ResData<T> = {
  code: string;
  data: T;
  pageInfo?: {
    nextCursor: number;
    totalCount?: number;
  };
};
