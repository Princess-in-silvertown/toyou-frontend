import styled from 'styled-components';

interface Props {
  handleSubmit: () => void;
  handleClose: () => void;
}

export const ModalConfirmationButton = ({
  handleSubmit,
  handleClose,
}: Props) => {
  return (
    <ButtonContainer>
      <Button onClick={handleClose}>취소</Button>
      <Button onClick={handleSubmit}>확인</Button>
    </ButtonContainer>
  );
};

export default ModalConfirmationButton;

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: calc(50% - 5px);
  height: 35px;
  border-radius: 5px;
  background-color: lightgray;
  color: gray;

  &:hover {
    transform: translateY(-2px);
    transition: all ease-in 0.1s;

    box-shadow: rgba(0, 0, 0, 0.1) 0.5px 2px 3px;
  }
`;
