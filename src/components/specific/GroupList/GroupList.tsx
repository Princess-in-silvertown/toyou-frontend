import { useGroupList } from '@hooks/queries/useGroupList';
import styled from 'styled-components';
import GroupItem from './GroupItem';

const GroupList = () => {
  const { data: groupList } = useGroupList();

  return (
    <Container>
      {groupList?.map((group) => (
        <GroupItem key={group.id} {...group} />
      ))}
    </Container>
  );
};

export default GroupList;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 20px 25px;
`;
