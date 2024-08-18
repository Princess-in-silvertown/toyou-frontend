import { useQuery } from '@tanstack/react-query';
import { requestGetMyGroupList } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { Group, GroupList } from '@/types/group';
import { QUERY_KEY } from '@constants/query';

export const useMyGroupList = () => {
  const query = useQuery<ResData<GroupList>, ResponseError, Group[]>({
    queryKey: [QUERY_KEY.myGroupList, 'GET'],
    queryFn: requestGetMyGroupList,
    select: (json) => json?.data?.groups,
    staleTime: Infinity,
  });

  return query;
};
