import styled from 'styled-components';
import CardEdit from './CardEdit';
import { Suspense } from 'react';
import LoadingCardSpinner from './LoadingCardSpinner';

interface Props {
  alias: string;
  message: string;
}

const CardEditStep = ({ alias, message }: Props) => {
  return (
    <Container>
      <Suspense fallback={<LoadingCardSpinner />}>
        <CardEdit alias={alias} message={message} />
      </Suspense>
    </Container>
  );
};

export default CardEditStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
