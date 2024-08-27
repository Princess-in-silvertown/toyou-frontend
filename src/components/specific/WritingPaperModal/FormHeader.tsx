import { useMemo } from 'react';
import styled from 'styled-components';
import back from '@assets/icons/back.svg';
import cancel from '@assets/icons/cancel.svg';

interface Props {
  index: number;
  lastIndex: number;
  canNext?: boolean;
  progressiveStartIndex?: number;
  progressiveLastIndex?: number;
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
          전송
        </ButtonText>
      );
      break;
    case 'NEXT':
      icon = (
        <ButtonText $canNext={canNext} onClick={handler}>
          완료
        </ButtonText>
      );
      break;
  }

  return <Button>{icon}</Button>;
};

const FormHeader = ({
  index,
  lastIndex,
  canNext,
  handleClickBackButton,
  handleClickNextButton,
  handleClickCancelButton,
  handleClickSubmitButton,
  progressiveLastIndex,
  progressiveStartIndex = 0,
}: Props) => {
  progressiveLastIndex = progressiveLastIndex ?? lastIndex;

  const RightButton = useMemo(() => {
    if (canNext === undefined) return <div style={{ width: '27px' }} />;

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
      {index >= progressiveStartIndex && index <= progressiveLastIndex && (
        <Progressive>
          {new Array(progressiveLastIndex - progressiveStartIndex + 1)
            .fill(0)
            .map((_, i) => {
              return (
                <ProgressiveDot
                  key={i}
                  $isCurrent={i === index - progressiveStartIndex}
                />
              );
            })}
        </Progressive>
      )}
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
  min-width: 27px;
  height: 20px;

  font-size: 16px;
  color: ${({ $canNext, theme }) =>
    $canNext ? theme.color.red500 : theme.color.gray300};
`;

const Progressive = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProgressiveDot = styled.div<{ $isCurrent: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 4px;

  background-color: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.color.gray500 : theme.color.gray300};
`;
