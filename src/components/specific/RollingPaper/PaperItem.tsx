import { RollingPaper } from '@/types/paper';
import { CARD_THEME } from '@constants/card';
import styled from 'styled-components';

const PaperItem = ({
  themeId,
  coverImageUrl,
  content,
  name,
  profileImageUrl,
}: RollingPaper) => {
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

export default PaperItem;

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
