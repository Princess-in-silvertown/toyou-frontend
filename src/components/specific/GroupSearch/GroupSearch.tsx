import { Group } from '@/types/group';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import SearchBar from './SearchBar';
import SearchedGroupList from './SearchedGroupList';
import cancel from '@assets/icons/cancel_gray.svg';
import { useSuspenseMyInfo } from '@hooks/queries/useMyInfo';

interface Props {
  groups: Group[];
  handleAddGroup: (group: Group) => void;
  handleDeleteGroup: (group: Group) => void;
}

const GroupSearch = ({ groups, handleAddGroup, handleDeleteGroup }: Props) => {
  const [input, setInput] = useState('');
  const { data } = useSuspenseMyInfo();

  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openSearchBar = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpenSearch(true);
      setIsOpening(false);
    }, 300);
  };

  const closeSearchBar = () => {
    setIsOpenSearch(false);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
    }, 300);
  };

  const handleChangeInput = (newInput: string) => {
    setInput(newInput);
  };

  const handleClickGroup = (group: Group) => {
    handleAddGroup(group);
    closeSearchBar();
  };

  return (
    <Container>
      {!isOpenSearch && (
        <Title
          $isOpening={isOpening}
          $isClosing={isClosing}
        >{`학교를 등록하고 친구들과 \n간편하게 메시지를 주고받아 보세요`}</Title>
      )}
      <SearchBar
        input={input}
        isOpen={isOpenSearch || isOpening}
        onChangeInput={handleChangeInput}
        onFocus={openSearchBar}
        onCancel={closeSearchBar}
      />
      {isOpenSearch && (
        <SearchedGroupList
          input={input}
          groups={groups}
          handleAddGroup={handleClickGroup}
        />
      )}
      {!isOpenSearch && !isOpening && (
        <GroupList>
          {groups.map((group) => (
            <GroupContainer
              key={group.id}
              onClick={() => handleDeleteGroup(group)}
            >
              <GroupText>{group.name}</GroupText>
              <GroupDeleteButton src={cancel} alt="삭제" />
            </GroupContainer>
          ))}
        </GroupList>
      )}
    </Container>
  );
};

export default GroupSearch;

const appear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 0;
  }
`;

const open = keyframes`
  from {
    height: 0;
    margin-bottom: 0;
  }

  to {
    height: 48px;
    margin-bottom: 14px;
  }
`;

const close = keyframes`
  from {
    height: 48px;
    margin-bottom: 14px;  }

  to {
    height: 0;
    margin-bottom: 0;  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 14px;
  width: 100%;
`;

const Title = styled.div<{ $isOpening: boolean; $isClosing: boolean }>`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  margin-bottom: 14px;

  color: #212121;

  white-space: pre-line;
  overflow-y: hidden;

  animation: 0.3s ease
    ${({ $isOpening, $isClosing }) =>
      $isOpening || $isClosing ? ($isOpening ? close : open) : 'none'}
    both;
`;

const GroupList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 14px 16px;

  margin-top: 14px;
  margin-bottom: 50px;
`;

const GroupContainer = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;

  width: fit-content;
  height: 33px;
  padding: 0 16px;
  border-radius: 16.5px;

  background-color: ${({ theme }) => theme.color.white};
  animation: all 0.3s ease-in ${appear} both;

  cursor: pointer;
`;

const GroupDeleteButton = styled.img`
  width: 8px;
  height: 8px;
`;

const GroupText = styled.div`
  font-size: 14px;
  font-weight: 500;

  color: ${({ theme }) => theme.color.red500};
`;
