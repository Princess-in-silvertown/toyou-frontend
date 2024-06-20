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
    <>
      <ButtonContainer>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleSubmit}>확인</Button>
      </ButtonContainer>
    </>
  );
};

export default ModalConfirmationButton;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: calc(50% - 5px);
  height: 35px;
  border-radius: 5px;
  background-color: lightgray;
  color: gray;
`;
