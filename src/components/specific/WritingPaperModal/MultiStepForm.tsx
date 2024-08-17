import React, {
  Children,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled, { keyframes } from 'styled-components';
import FormHeader from './FormHeader';

type Step = {
  component: ReactNode;
  canNext?: boolean;
};

interface Props {
  steps: Step[];
  handleSubmit: () => void;
  handleCancel?: () => void;
  progressiveStartIndex?: number;
  progressiveLastIndex?: number;
}

const MultiStepForm = ({
  steps,
  handleCancel,
  handleSubmit,
  progressiveLastIndex,
  progressiveStartIndex = 0,
}: Props) => {
  const [index, setIndex] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);
  const [animationDirection, setAnimationDirection] = useState<
    'LEFT' | 'RIGHT' | null
  >(null);

  const lastIndex = useMemo(() => steps.length - 1, [steps]);

  const { component, canNext } = steps[index];

  const handleClickCancelButton = () => {
    handleCancel?.();
  };

  const handleClickNextButton = () => {
    if (index >= lastIndex) return;

    if (canNext !== undefined && !canNext) return;

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
    if (canNext !== undefined && !canNext) return;

    handleSubmit();
  };

  useEffect(() => {
    setIsAnimated(true);
  }, [index]);

  // children에 onNext 함수 삽입
  const children = Children.map(component, (child) => {
    if (React.isValidElement(child)) {
      if (!child.props.onNext) {
        return React.cloneElement(child, {
          ...child.props,
          onNext: () => handleClickNextButton(),
        });
      } else {
        return React.cloneElement(child);
      }
    }
  });

  return (
    <Container>
      <FormHeader
        index={index}
        lastIndex={lastIndex}
        canNext={canNext}
        progressiveStartIndex={progressiveStartIndex}
        progressiveLastIndex={progressiveLastIndex}
        handleClickBackButton={handleClickBackButton}
        handleClickCancelButton={handleClickCancelButton}
        handleClickNextButton={handleClickNextButton}
        handleClickSubmitButton={handleClickSubmitButton}
      />
      <StepContainer
        $isAnimated={isAnimated}
        $animationDirection={animationDirection}
      >
        {isAnimated && children}
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
