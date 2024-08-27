import { useInfiniteQuery } from '@tanstack/react-query';
import { requestGetMessageList } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { RollingPaper, RollingPapers } from '@/types/paper';

export const useMyMessageList = () => {
  const query = useInfiniteQuery<
    ResData<RollingPapers>,
    ResponseError,
    RollingPaper[],
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

    select: ({ pages }) =>
      pages.reduce<RollingPaper[]>(
        (acc, { data }) => acc.concat(data.letters),
        []
      ),
  });

  return query;
};
