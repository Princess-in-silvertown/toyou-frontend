import { useDebouncing } from '@hooks/useDebouncing';
import styled from 'styled-components';
import { useViewport } from '@hooks/useViewport';
import SearchedGroupItem from './SearchedGroupItem';
import { Group } from '@/types/group';
import { useGroupList } from '@hooks/queries/useGroupList';

interface Props {
  groups: Group[];
  input: string;
  handleAddGroup: (group: Group) => void;
}

const SearchedGroupList = ({ groups, input, handleAddGroup }: Props) => {
  const debounced = useDebouncing(input, 300);
  const { data } = useGroupList(debounced);

  const [, viewHeight] = useViewport();

  const filteredData = data
    ?.slice(0, 100)
    .filter((item) => groups.findIndex((group) => item.id === group.id) === -1);

  return (
    <Container style={{ height: viewHeight - 280 }}>
      {filteredData?.map((item) => (
        <SearchedGroupItem
          handleAddGroup={handleAddGroup}
          key={item.id}
          {...item}
        />
      ))}
    </Container>
  );
};

export default SearchedGroupList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-top: 30px;

  overflow: auto;
`;
