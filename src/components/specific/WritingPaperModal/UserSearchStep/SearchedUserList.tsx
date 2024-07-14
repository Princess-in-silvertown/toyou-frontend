import { useDebouncing } from '@hooks/useDebouncing';
import SearchedUserItem from './SearchedUserItem';
import { User } from '@/types/user';
import styled from 'styled-components';

interface Props {
  groupId: number;
  input: string;
  onChangeUserInfo: (newInfo: Partial<User>) => void;
  onNext?: () => void;
}

const SearchedUserList = ({
  groupId,
  input,
  onChangeUserInfo,
  onNext,
}: Props) => {
  const debounced = useDebouncing(input, 500);

  return (
    <Container>
      {debounced.includes('스윗') && (
        <SearchedUserItem
          id={1}
          name="송효섭"
          imgUrl=""
          introduce="스윗한 송효섭입니다."
          groupName="그룹1"
          onChangeUserInfo={() =>
            onChangeUserInfo({ id: 1, name: '스윗효섭', imgUrl: '' })
          }
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
          onChangeUserInfo={() =>
            onChangeUserInfo({ id: 2, name: '시크효섭', imgUrl: '' })
          }
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
          onChangeUserInfo={() =>
            onChangeUserInfo({ id: 3, name: '댄디효섭', imgUrl: '' })
          }
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
