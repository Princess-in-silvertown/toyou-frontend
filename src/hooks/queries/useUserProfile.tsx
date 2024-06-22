import { useQuery } from '@tanstack/react-query';
import { requestGetUserProfile } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { QUERY_KEY } from '@constants/query';
import { User } from '@/types/user';

export const useUserProfile = (userId: number) => {
  const query = useQuery<ResData<User>, ResponseError, User>({
    queryKey: [QUERY_KEY.user, 'GET', userId],
    queryFn: () => requestGetUserProfile(userId),
    select: (json) => json.data,
  });

  return query;
};
