import { useDebouncing } from '@hooks/useDebouncing';
import SearchedUserItem from './SearchedUserItem';
import styled from 'styled-components';

interface Props {
  groupId: number;
  input: string;
  onNext?: () => void;
}

const SearchedUserList = ({ groupId, input, onNext }: Props) => {
  const debounced = useDebouncing(input, 200);

  return (
    <Container>
      {debounced.includes('스윗') && (
        <SearchedUserItem
          id={1}
          name="송효섭"
          imgUrl=""
          introduce="스윗한 송효섭입니다."
          groupName="그룹1"
          onNext={onNext}
        />
      )}
      {debounced.includes('시크') && (
        <SearchedUserItem
          id={1}
          name="송효섭"
          imgUrl=""
          introduce="시크한 송효섭입니다."
          groupName="그룹1"
          onNext={onNext}
        />
      )}
      {debounced.includes('댄디') && (
        <SearchedUserItem
          id={1}
          name="송효섭"
          imgUrl=""
          introduce="댄디한 송효섭입니다."
          groupName="그룹1"
          onNext={onNext}
        />
      )}
    </Container>
  );
};

export default SearchedUserList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  margin-top: 15px;
`;
