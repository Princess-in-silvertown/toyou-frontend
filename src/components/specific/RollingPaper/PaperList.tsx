import styled, { keyframes } from 'styled-components';
import PaperItem from './PaperItem';
import { useViewport } from '@hooks/useViewport';
import { useRef } from 'react';
import { useMyMessageList } from '@hooks/queries/useMyMessageList';

const PaperList = () => {
  const { isFetchingNextPage, hasNextPage, data, totalCount, fetchNextPage } =
    useMyMessageList();

  const observerRef = useRef<IntersectionObserver>();

  const lastItemRef = (node: HTMLLIElement) => {
    if (isFetchingNextPage) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (node) observerRef.current.observe(node);
  };

  const [, height] = useViewport();

  return (
    <MyMessageListContainer>
      <MessageLengthContainer>
        <ListTitleText>받은 메시지</ListTitleText>
        <CountContainer>
          <CardIcon />
          <LengthNumber>{totalCount}</LengthNumber>
        </CountContainer>
      </MessageLengthContainer>
      <ListContainer style={{ height: height - 251 }}>
        <ListGrid>
          {data?.map((item, index) => {
            if (!item) return;

            return (
              <ItemContainer
                key={index}
                ref={index + 1 === data.length ? null : lastItemRef}
              >
                <PaperItem index={index} {...item} />
              </ItemContainer>
            );
          })}
        </ListGrid>
        {data && isFetchingNextPage && (
          <LoadingContainer>
            <Spinner />
            <ListLoading>메시지를 불러오는 중이에요</ListLoading>
          </LoadingContainer>
        )}
        {data && !hasNextPage && <ListLast>메시지를 모두 불러왔어요</ListLast>}
      </ListContainer>
    </MyMessageListContainer>
  );
};

export default PaperList;

const appear = keyframes`
  from{
    transform: scale(0);
  }
  
  to{
    transform: scale(1);
  }
`;

const MyMessageListContainer = styled.div`
  margin-top: 7px;
`;

const ListLast = styled.div`
  display: flex;
  justify-content: center;

  margin: 15px 0 25px 0;
  width: 100%;

  font-size: 12px;
  line-height: 14.32px;
  letter-spacing: -0.02em;

  color: ${({ theme }) => theme.color.gray300};
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6.25px;

  width: 100%;
  margin: 15px 0 25px 0;
`;

const ListLoading = styled.div`
  display: flex;
  justify-content: center;

  font-size: 12px;
  line-height: 14.32px;
  letter-spacing: -0.02em;

  color: ${({ theme }) => theme.color.gray300};
`;

const spin = keyframes`
  from {
    transform: rotate(0deg); 
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 13.5px;
  height: 13.5px;
  border: 1px solid ${({ theme }) => theme.color.red500};
  border-top: 1px solid ${({ theme }) => theme.color.gray300};
  border-radius: 50%;

  animation: ${spin} 1s linear infinite;
`;

const MessageLengthContainer = styled.div`
  padding: 0 25px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  gap: 7px;
`;

const ListTitleText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
`;

const CountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  padding: 0 8px;
  height: 18px;
  border-radius: 9px;

  background-color: ${({ theme }) => theme.color.red500};

  animation: ${appear} 0.3s ease-in-out;
`;

const CardIcon = styled.div`
  width: 5px;
  height: 8px;
  border-radius: 1px;

  background-color: ${({ theme }) => theme.color.white};
`;

const LengthNumber = styled.div`
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.color.white};
`;

const ListContainer = styled.div`
  margin: 25px auto 70px auto;

  overflow-y: auto;
`;

const ListGrid = styled.ul`
  padding: 0 25px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 8px;
  align-content: start;
`;

const ItemContainer = styled.li`
  display: block;
`;
