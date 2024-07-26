import { User } from '@/types/user';
import styled from 'styled-components';
import profile from '@assets/icons/profile.svg';
import { useContext } from 'react';
import { messageFormDispatchContext } from '@/contexts/states/messageFormContext';

interface Props extends User {
  groupName: string;
  introduce: string;
  onNext?: () => void;
}

const SearchedUserItem = ({
  id,
  name,
  imgUrl,
  groupName,
  introduce,
  onNext,
}: Props) => {
  const { handleChangeInfo } = useContext(messageFormDispatchContext);

  const handleClick = () => {
    handleChangeInfo({ id, name, imgUrl });

    onNext?.();
  };

  return (
    <Container onClick={handleClick}>
      <LeftContents>
        <LeftFirstContents>
          <Profile src={profile} />
        </LeftFirstContents>
        <LeftSecondContents>
          <Name>{name}</Name>
          <Introduce>{introduce}</Introduce>
        </LeftSecondContents>
      </LeftContents>
      <RightContents>
        <GroupName>{groupName}</GroupName>
      </RightContents>
    </Container>
  );
};

export default SearchedUserItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  cursor: pointer;
`;

const LeftContents = styled.div`
  display: flex;
  gap: 16px;
`;

const LeftFirstContents = styled.div``;

const LeftSecondContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
`;

const RightContents = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.img`
  width: 48px;
  width: 48px;
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const Introduce = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #616161;
`;

const GroupName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #9e9e9e;

  font-size: 10px;
`;
