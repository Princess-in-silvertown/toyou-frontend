import { useDebouncing } from '@hooks/useDebouncing';
import SearchedUserItem from './SearchedUserItem';
import styled from 'styled-components';
import { useMemberList } from '@hooks/queries/useMemberList';
import { useViewport } from '@hooks/useViewport';

interface Props {
  groupId?: number;
  input: string;
  onNext?: () => void;
}

const SearchedUserList = ({ groupId, input, onNext }: Props) => {
  const debounced = useDebouncing(input, 300);
  const { data } = useMemberList(debounced, groupId);

  const [, viewHeight] = useViewport();

  return (
    <Container style={{ height: viewHeight - 220 }}>
      {data?.map((item) => (
        <SearchedUserItem key={item.id} onNext={onNext} {...item} />
      ))}
    </Container>
  );
};

export default SearchedUserList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  margin-top: 15px;

  overflow: auto;
`;
