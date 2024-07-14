import styled from 'styled-components';
import search from '@assets/icons/search.svg';
import { ChangeEventHandler } from 'react';
import { Group } from '@/types/group';

interface Props {
  input: string;
  group: Group;
  onChangeInput: (input: string) => void;
  onChangeGroup: (group: Group) => void;
}

const SearchBar = ({ input, onChangeGroup, onChangeInput }: Props) => {
  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const input = event.target.value;

    onChangeInput(input);
  };

  return (
    <InputContainer>
      <InputSearchButton src={search} />
      <Input value={input} placeholder="검색" onChange={handleChangeInput} />
      <GroupFilterContainer>{}</GroupFilterContainer>
    </InputContainer>
  );
};

export default SearchBar;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #616161;
`;

const InputSearchButton = styled.img`
  width: 16px;
  height: 16px;
`;

const GroupFilterContainer = styled.button`
  height: 25px;
  font-size: 14px;
  font-weight: 500;
  color: #616161;
`;

const Input = styled.input`
  width: calc(100% - 40px);
`;
