import styled from 'styled-components';
import profile from '@assets/icons/profile.svg';
import { Event } from '@/types/event';

interface Props extends Event {
  onNext?: () => void;
}

const EventUserItem = ({
  memberId,
  memberName,
  description,
  profileImgUrl,
  onNext,
}: Props) => {
  const handleClick = () => {
    onNext?.();
  };

  return (
    <Container onClick={handleClick}>
      <LeftContents>
        <LeftFirstContents>
          <Profile src={profileImgUrl ?? profile} />
        </LeftFirstContents>
        <LeftSecondContents>
          <Name>{memberName}</Name>
          <Introduce>{description}</Introduce>
        </LeftSecondContents>
      </LeftContents>
      <RightContents>
        <SendButton>메시지 카드 보내기</SendButton>
      </RightContents>
    </Container>
  );
};

export default EventUserItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

const LeftContents = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LeftFirstContents = styled.div`
  display: flex;
  align-items: center;
`;

const LeftSecondContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const RightContents = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;

  object-fit: cover;
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

const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 96px;
  height: 24px;
  border-radius: 13px;
  padding: 6px, 16px, 6px, 16px;
  border: 1px solid #dd432e;

  color: #dd432e;
  font-size: 10px;
`;
