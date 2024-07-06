import { ReactElement, useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import FormHeader from './FormHeader';

type Step = {
  title: string;
  component: ReactElement;
  canNext?: boolean;
  onNext?: () => void;
  NextButton?: React.FC<{ onNext: () => void; canNext?: boolean }>; // for handling next
};

interface Props {
  steps: Step[];
  handleSubmit: () => void;
  handleCancel?: () => void;
}

const MultiStepForm = ({ steps, handleCancel, handleSubmit }: Props) => {
  const [index, setIndex] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);
  const [animationDirection, setAnimationDirection] = useState<
    'LEFT' | 'RIGHT' | null
  >(null);

  const { title } = useMemo(() => steps[index], [index]);
  const lastIndex = useMemo(() => steps.length - 1, [steps]);

  const { component, canNext, onNext, NextButton } = steps[index];

  const handleClickCancelButton = () => {
    handleCancel?.();
  };

  const handleClickNextButton = () => {
    if (index >= lastIndex) return;

    if (!canNext) return;

    setIndex((current) => current + 1);

    setIsAnimated(() => false);
    setAnimationDirection(() => 'RIGHT');
  };

  const handleClickBackButton = () => {
    if (index <= 0) return;

    setIndex((current) => current - 1);

    setIsAnimated(() => false);
    setAnimationDirection(() => 'LEFT');
  };

  const handleClickSubmitButton = () => {
    handleSubmit();
  };

  useEffect(() => {
    setIsAnimated(true);
  }, [index]);

  return (
    <Container>
      <FormHeader
        title={title}
        index={index}
        lastIndex={lastIndex}
        canNext={canNext}
        handleClickBackButton={handleClickBackButton}
        handleClickCancelButton={handleClickCancelButton}
        handleClickNextButton={handleClickNextButton}
        handleClickSubmitButton={handleClickSubmitButton}
      />
      <StepContainer
        $isAnimated={isAnimated}
        $animationDirection={animationDirection}
      >
        {isAnimated && component}
        {isAnimated && NextButton && (
          <NextButton onNext={handleClickNextButton} canNext={canNext} />
        )}
      </StepContainer>
    </Container>
  );
};

export default MultiStepForm;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideIn = (direction: 'RIGHT' | 'LEFT' | null) => {
  if (direction === null) return 'none';

  return direction === 'RIGHT' ? slideInRight : slideInLeft;
};

const Container = styled.div``;

const StepContainer = styled.div<{
  $animationDirection: 'RIGHT' | 'LEFT' | null;
  $isAnimated: boolean;
}>`
  animation: 0.5s ease-in
    ${({ $isAnimated, $animationDirection }) =>
      $isAnimated ? slideIn($animationDirection) : 'none'};
  animation-fill-mode: forwards;
`;
