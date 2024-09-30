import { queryClient } from '@/contexts/providers/QueryClientProvider';
import { ResData } from '@/types/api';
import { Info, User } from '@/types/user';
import { requestGetMyInfo, requestPutMyInfo } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { QUERY_KEY } from '@constants/query';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useMyInfo = () => {
  const query = useQuery<ResData<User>, ResponseError, User>({
    queryKey: [QUERY_KEY.myInfo, 'GET'],
    queryFn: requestGetMyInfo,
    select: (json) => json?.data,
    staleTime: Infinity,
  });

  return query;
};

export const useSuspenseMyInfo = () => {
  const query = useSuspenseQuery<ResData<User>, ResponseError, User>({
    queryKey: [QUERY_KEY.myInfo, 'GET'],
    queryFn: requestGetMyInfo,
    select: (json) => json?.data,
    staleTime: Infinity,
  });

  return query;
};

export const usePutMyInfo = () => {
  const mutation = useMutation({
    mutationFn: (newInfo: Info) => requestPutMyInfo(newInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo, 'GET'] });
    },
  });

  return mutation;
};
