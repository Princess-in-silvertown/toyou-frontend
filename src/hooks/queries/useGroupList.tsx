import { useQuery } from '@tanstack/react-query';
import { requestGetGroupList } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { Group, GroupList } from '@/types/group';
import { QUERY_KEY } from '@constants/query';

export const useGroupList = (memberId: number) => {
  const query = useQuery<ResData<GroupList>, ResponseError, Group[]>({
    queryKey: [QUERY_KEY.groupList, 'GET'],
    queryFn: () => requestGetGroupList(memberId),
    select: (json) => json.data.groups,
  });

  return query;
};
