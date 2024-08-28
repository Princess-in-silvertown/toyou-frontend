import styled from 'styled-components';
import { useViewport } from '@hooks/useViewport';

const PaperListFallback = () => {
  const [, height] = useViewport();

  return (
    <MyMessageListContainer>
      <MessageLengthContainer>
        <LengthText>받은 메시지</LengthText>
      </MessageLengthContainer>
      <ListContainer style={{ height: height - 251 }}>
        <ListGrid>
          {new Array(5).fill('').map(() => (
            <ItemContainer>
              <MessageContainer>
                <Card />
                <UserContainer>
                  <Profile />
                  <UserName />
                </UserContainer>
              </MessageContainer>{' '}
            </ItemContainer>
          ))}
        </ListGrid>
      </ListContainer>
    </MyMessageListContainer>
  );
};

export default PaperListFallback;

const MyMessageListContainer = styled.div`
  margin-top: 7px;
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

  background-color: ${({ theme }) => theme.color.gray100};
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  width: 100%;
  height: 40px;

  background-color: ${({ theme }) => theme.color.bg};
`;

const Profile = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.color.gray100};
`;

const UserName = styled.div`
  width: 30px;
`;
