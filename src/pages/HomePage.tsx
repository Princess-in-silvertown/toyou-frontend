import GroupList from '@components/specific/GroupList/GroupList';
import MyGroupList from '@components/specific/MyGroupList/MyGroupList';
import { useMyGroupList } from '@hooks/queries/useMyGroupList';

const HomePage = () => {
  const { query } = useMyGroupList();
  const { data: myGroupList, isFetching } = query;
  const hasJoinedGroup = isFetching || Number(myGroupList?.length) > 0;

  return <>{hasJoinedGroup ? <MyGroupList /> : <GroupList />}</>;
};

export default HomePage;
