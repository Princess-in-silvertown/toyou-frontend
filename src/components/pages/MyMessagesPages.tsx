import PaperList from '@components/specific/RollingPaper/PaperList';
import PaperListFallback from '@components/specific/RollingPaper/PaperListFallback';
import { Suspense } from 'react';
import styled from 'styled-components';

const MyMessagesPages = () => {
  return (
    <Container>
      <Title>효섭 님의 메시지함</Title>
      <Suspense>
        <PaperList />
      </Suspense>
    </Container>
  );
};

const Container = styled.div`
  padding: 15px 0;
  box-sizing: border-box;
`;

const Title = styled.div`
  padding: 0 25px;
  box-sizing: border-box;
  margin-top: 15px;

  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  letter-spacing: -0.02em;
`;

export default MyMessagesPages;
