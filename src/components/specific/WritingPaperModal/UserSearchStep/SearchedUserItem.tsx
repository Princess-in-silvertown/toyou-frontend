import { User } from '@/types/user';
import styled from 'styled-components';
import profile from '@assets/icons/profile.svg';
import { useContext, useRef } from 'react';
import { messageFormDispatchContext } from '@/contexts/states/messageFormContext';
import { Member } from '@/types/member';

interface Props extends Member {
  onNext?: () => void;
}

const SearchedUserItem = ({
  id,
  name,
  imageUrl,
  introduction,
  onNext,
}: Props) => {
  const { handleChangeInfo } = useContext(messageFormDispatchContext);

  const imageRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    handleChangeInfo({ id, name, imgUrl: imageUrl });

    onNext?.();
  };

  const handleErrorProfileImage = () => {
    if (imageRef.current) {
      imageRef.current.src = profile;
    }
  };

  return (
    <Container onClick={handleClick}>
      <LeftContents>
        <LeftFirstContents>
          <Profile
            ref={imageRef}
            src={imageUrl}
            onError={handleErrorProfileImage}
          />
        </LeftFirstContents>
        <LeftSecondContents>
          <Name>{name}</Name>
          <Introduce>{introduction}</Introduce>
        </LeftSecondContents>
      </LeftContents>
      <RightContents />
    </Container>
  );
};

export default SearchedUserItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  height: 55px;

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
  height: 48px;

  border-radius: 50%;
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
