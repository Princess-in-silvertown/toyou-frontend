import styled from 'styled-components';
import CardEdit from './CardEdit';
import { Suspense, useContext } from 'react';
import LoadingCardSpinner from './LoadingCardSpinner';
import { messageFormContext } from '@/contexts/states/messageFormContext';

const CardEditStep = () => {
  const { alias, message } = useContext(messageFormContext);

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
