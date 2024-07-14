import styled from 'styled-components';
import profile from '@assets/icons/profile.svg';

interface Props {
  userName: string;
  imgUrl: string;
}

const Recipient = ({ userName, imgUrl }: Props) => {
  if (!userName || userName.length === 0) return null;

  return (
    <RecipientContainer>
      <UserImage src={profile} />
      <RecipientMessage>{userName}님에게 메세지 작성 중</RecipientMessage>
      <div />
    </RecipientContainer>
  );
};

export default Recipient;

const RecipientContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  width: fit-content;
  height: 40px;
  padding: 0 3.5px;
  margin: 0 auto;
  border-radius: 20px;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.gray100};
`;

const UserImage = styled.img`
  width: 34px;
  height: 34px;
`;

const RecipientMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
`;
