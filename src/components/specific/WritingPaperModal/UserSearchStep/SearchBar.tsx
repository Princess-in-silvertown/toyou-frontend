import styled from 'styled-components';
import search from '@assets/icons/search.svg';
import { ChangeEventHandler } from 'react';
import { Group } from '@/types/group';
import GroupFilter from './GroupFilter';

interface Props {
  input: string;
  group: Group | null;
  onChangeInput: (input: string) => void;
  onChangeGroup: (group: Group | null) => void;
}

const SearchBar = ({ input, group, onChangeGroup, onChangeInput }: Props) => {
  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const input = event.target.value;

    onChangeInput(input);
  };

  return (
    <InputContainer>
      <InputSearchButton src={search} alt="검색" />
      <Input value={input} placeholder="검색" onChange={handleChangeInput} />
      <GroupFilter group={group} onChangeGroup={onChangeGroup} />
    </InputContainer>
  );
};

export default SearchBar;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 43px;
  padding: 0 6px 0 20px;
  box-sizing: border-box;
  border-radius: 20px;

  background: ${({ theme }) => theme.color.white};
`;

const InputSearchButton = styled.img`
  width: 16px;
  height: 16px;
`;

const Input = styled.input`
  width: calc(100% - 40px);

  background-color: transparent;
`;
