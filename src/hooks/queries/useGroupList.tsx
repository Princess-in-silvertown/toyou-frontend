import { useQuery } from '@tanstack/react-query';
import { requestGetGroupList } from '@apis/requests';
import ResponseError from '@apis/responseError';
import { ResData } from '@/types/api';
import { GroupList } from '@/types/group';
import { QUERY_KEY } from '@constants/query';

export const useGroupList = () => {
  const query = useQuery<ResData<GroupList>, ResponseError, GroupList>({
    queryKey: [QUERY_KEY.groupList, 'GET'],
    queryFn: requestGetGroupList,
    select: (json) => json.data,
  });

  return query;
};
