import { Group } from '@/types/group';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import SearchedUserList from './SearchedUserList';
import { messageFormDispatchContext } from '@/contexts/states/messageFormContext';

interface Props {
  onNext?: () => void;
}

const UserSearchStep = ({ onNext }: Props) => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [input, setInput] = useState('');

  const { handleChangeAlias, handleChangeMessage } = useContext(
    messageFormDispatchContext
  );

  const handleChangeInput = (newInput: string) => {
    setInput(newInput);
  };

  const handleChangeGroup = (newGroup: Group | null) => {
    setSelectedGroup(newGroup && { ...newGroup });
  };

  useEffect(() => {
    handleChangeAlias('');
    handleChangeMessage('');
  }, []);

  return (
    <Container>
      <Title>누구에게 메시지를 작성할까요?</Title>
      <SearchBar
        input={input}
        group={selectedGroup}
        onChangeInput={handleChangeInput}
        onChangeGroup={handleChangeGroup}
      />
      <SearchedUserList
        groupId={selectedGroup?.id}
        input={input}
        onNext={onNext}
      />
    </Container>
  );
};

export default UserSearchStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  margin-top: 14px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  color: #212121;
`;
