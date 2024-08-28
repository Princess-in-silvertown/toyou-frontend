import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { requestGetMessageList } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { RollingPaper, RollingPapers } from '@/types/paper';
import { useEffect, useState } from 'react';

export const useMyMessageList = () => {
  const query = useSuspenseInfiniteQuery<
    ResData<RollingPapers>,
    ResponseError,
    [number, RollingPaper[]],
    string[],
    number
  >({
    queryKey: ['messageList', 'GET'],

    queryFn: ({ pageParam }) => requestGetMessageList(pageParam),

    initialPageParam: 0,

    getNextPageParam: (nextPage) => {
      if (nextPage) return nextPage.pageInfo?.nextCursor;

      return undefined;
    },

    select: ({ pages }) => {
      const totalData = pages[0].pageInfo?.totalCount ?? 0;

      const data = pages.reduce<RollingPaper[]>(
        (acc, { data }) => acc.concat(data.letters),
        []
      );

      return [totalData, data];
    },
  });

  return { ...query, totalCount: query.data[0], data: query.data[1] };
};
