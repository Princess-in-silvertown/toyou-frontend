import styled from 'styled-components';
import CardEdit from './CardEdit';
import { Suspense, useContext, useEffect } from 'react';
import LoadingCardSpinner from './LoadingCardSpinner';
import { messageFormContext } from '@/contexts/states/messageFormContext';

interface Props {
  isWaitSubmit: boolean;
  waitSubmit: () => void;
  canEdit: () => void;
}

const CardEditStep = ({ isWaitSubmit, waitSubmit, canEdit }: Props) => {
  const { alias, message } = useContext(messageFormContext);

  useEffect(() => {
    setTimeout(waitSubmit, 2000);
  }, []);

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
