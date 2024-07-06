import { useMemo } from 'react';
import styled from 'styled-components';
import back from '@assets/icons/back.svg';
import cancel from '@assets/icons/cancel.svg';

interface Props {
  title: string;
  index: number;
  lastIndex: number;
  canNext?: boolean;
  handleClickCancelButton: () => void;
  handleClickNextButton: () => void;
  handleClickBackButton: () => void;
  handleClickSubmitButton: () => void;
}

interface ButtonProps {
  type: 'BACK' | 'CANCEL' | 'SUBMIT' | 'NEXT';
  handler: () => void;
  canNext?: boolean;
}

const ControlButton = ({ type, handler, canNext }: ButtonProps) => {
  let icon;

  switch (type) {
    case 'BACK':
      icon = <Icon src={back} onClick={handler} />;
      break;
    case 'CANCEL':
      icon = <Icon src={cancel} onClick={handler} />;
      break;
    case 'SUBMIT':
      icon = (
        <ButtonText $canNext={canNext} onClick={handler}>
          완료
        </ButtonText>
      );
      break;
    case 'NEXT':
      icon = (
        <ButtonText $canNext={canNext} onClick={handler}>
          다음
        </ButtonText>
      );
      break;
  }

  return <Button>{icon}</Button>;
};

const FormHeader = ({
  title,
  index,
  lastIndex,
  canNext,
  handleClickBackButton,
  handleClickNextButton,
  handleClickCancelButton,
  handleClickSubmitButton,
}: Props) => {
  const RightButton = useMemo(() => {
    if (index === lastIndex)
      return (
        <ControlButton
          type="SUBMIT"
          canNext={canNext}
          handler={handleClickSubmitButton}
        />
      );

    return (
      <ControlButton
        type="NEXT"
        canNext={canNext}
        handler={handleClickNextButton}
      />
    );
  }, [index, canNext]);

  const LeftButton = useMemo(() => {
    if (index === 0)
      return <ControlButton type="CANCEL" handler={handleClickCancelButton} />;

    return <ControlButton type="BACK" handler={handleClickBackButton} />;
  }, [index]);

  return (
    <Container>
      {LeftButton}
      <Title>{title}</Title>
      {RightButton}
    </Container>
  );
};

export default FormHeader;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  margin-bottom: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  font-size: 14px;
`;

const Button = styled.button`
  height: 20px;
`;

const Icon = styled.img`
  display: flex;
  align-items: center;

  height: 20px;
  width: 20px;
`;

const ButtonText = styled.div<{ $canNext?: boolean }>`
  display: flex;
  align-items: center;

  width: fit-content;
  height: 20px;

  font-size: 16px;
  color: ${({ $canNext, theme }) => ($canNext ? theme.gray900 : theme.gray500)};
`;
