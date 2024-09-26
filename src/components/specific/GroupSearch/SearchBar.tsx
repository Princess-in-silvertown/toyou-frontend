import styled from 'styled-components';
import search from '@assets/icons/search.svg';
import back from '@assets/icons/back.svg';
import { ChangeEventHandler } from 'react';

interface Props {
  input: string;
  isOpen: boolean;
  onChangeInput: (input: string) => void;
  onFocus: () => void;
  onCancel: () => void;
}

const SearchBar = ({
  input,
  isOpen,
  onChangeInput,
  onFocus,
  onCancel,
}: Props) => {
  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const input = event.target.value;

    onChangeInput(input);
  };

  return (
    <InputContainer>
      <InputSearchButton
        src={isOpen ? back : search}
        alt="검색"
        onClick={onCancel}
      />
      <Input
        value={input}
        placeholder="검색"
        onChange={handleChangeInput}
        onFocus={onFocus}
      />
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
