import { Letter } from '@/types/letter';
import { CARD_THEME } from '@constants/card';
import { useMyMessageList } from '@hooks/queries/useMyMessageList';
import { useViewport } from '@hooks/useViewport';
import { useRef } from 'react';
import styled from 'styled-components';

const MyMessagesPages = () => {
  return (
    <Container>
      <Title>효섭 님의 메시지함</Title>
      <MyMessageList />
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

const MyMessageList = () => {
  const { isFetchingNextPage, hasNextPage, data, fetchNextPage } =
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
        <LengthText>받은 메시지</LengthText>
        <LengthNumber>{'n'}</LengthNumber>
      </MessageLengthContainer>
      <ListContainer style={{ height: height - 251 }}>
        <ListGrid>
          {data?.map((item, index) => (
            <ItemContainer
              key={index}
              ref={index + 1 === data.length ? null : lastItemRef}
            >
              <MyMessageItem {...item} />
            </ItemContainer>
          ))}
        </ListGrid>
        {data && isFetchingNextPage && <ListLoading>Loading...</ListLoading>}
        {data && !hasNextPage && <ListLast>End</ListLast>}
      </ListContainer>
    </MyMessageListContainer>
  );
};

const MyMessageListContainer = styled.div`
  margin-top: 7px;
`;

const ListLast = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 15px;
  width: 100%;

  font-size: 14px;
  text-align: center;
  color: #9e9e9e;
`;

const ListLoading = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 15px;
  width: 100%;

  font-size: 14px;
  text-align: center;
  color: #9e9e9e;
`;

const MessageLengthContainer = styled.div`
  padding: 0 25px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  gap: 7px;
`;

const LengthText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;

  color: #212121;
`;

const LengthNumber = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;

  color: #e0b0aa;
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

const MyMessageItem = ({
  themeId,
  coverImageUrl,
  content,
  stickers,
  name,
  profileImageUrl,
}: Letter) => {
  const { R, G, B } = CARD_THEME[themeId].color;

  return (
    <MessageContainer>
      <Card style={{ backgroundColor: `rgb(${[R, G, B, 0.85]})` }}>
        <Cover src={coverImageUrl} />
      </Card>
      <UserContainer>
        <Profile src={profileImageUrl} />
        <UserName>{name}</UserName>
      </UserContainer>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: block;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: calc(100% - 2px);
  aspect-ratio: 107 / 150;

  border-radius: 6px;

  overflow: hidden;
`;

const Cover = styled.img`
  width: 100%;
  padding: 0 5px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  width: 100%;
  height: 40px;
  border-bottom: 1px #e9e9e9 solid;
`;

const Profile = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const UserName = styled.div`
  color: #212121;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  letter-spacing: -0.03em;
`;
