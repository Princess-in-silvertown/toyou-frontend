import { ResData } from '@/types/api';
import { User } from '@/types/user';
import { requestGetMyInfo } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { QUERY_KEY } from '@constants/query';
import { useQuery } from '@tanstack/react-query';

export const useMyInfo = () => {
  const query = useQuery<ResData<User>, ResponseError, User>({
    queryKey: [QUERY_KEY.myInfo, 'GET'],
    queryFn: requestGetMyInfo,
    select: (json) => json?.data,
    staleTime: Infinity,
  });

  return query;
};
