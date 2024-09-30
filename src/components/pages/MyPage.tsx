import { useCustomNavigate } from '@/routers/useCustomNavigate';
import { Group } from '@/types/group';
import GroupSearch from '@components/specific/GroupSearch/GroupSearch';
import { usePutMyInfo, useSuspenseMyInfo } from '@hooks/queries/useMyInfo';
import { ChangeEventHandler, useState } from 'react';
import back from '@assets/icons/back.svg';
import styled from 'styled-components';
import { Info } from '@/types/user';

const MyPage = () => {
  const { data } = useSuspenseMyInfo();

  const { goToBack, goToEditMyInfo } = useCustomNavigate();

  const handleClickBackButton = () => {
    goToBack();
  };

  return (
    <Container>
      <ContainerHeader>
        <BackButton src={back} onClick={handleClickBackButton} />
        <Title>{'프로필'}</Title>
        <Empty />
      </ContainerHeader>
      <FormItemContainer>
        <ProfileImage src={data?.imageUrl} />
        <InputContainer>
          <Input>{data.introduction ?? '소개글이 없어요'}</Input>
        </InputContainer>
        <GroupList>
          {data?.groups?.map((group) => (
            <GroupContainer key={group.id}>
              <GroupText>{group.name}</GroupText>
            </GroupContainer>
          ))}
        </GroupList>
      </FormItemContainer>
      <NextButton $canNext={true} onClick={goToEditMyInfo}>
        수정하기
      </NextButton>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 19.09px;
  letter-spacing: -0.02em;
  text-align: center;
`;

const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 60px;
`;

const Empty = styled.div`
  width: 30px;
`;

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const NextButton = styled.div<{ $canNext: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 30px;

  width: 153px;
  height: 50px;
  margin: 0 auto;
  border-radius: 25px;

  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
  text-align: center;
  color: ${({ theme, $canNext }) =>
    $canNext ? theme.color.white : theme.color.gray300};

  background-color: ${({ theme, $canNext }) =>
    $canNext ? theme.color.red500 : theme.color.gray100};
`;

const ProfileImage = styled.img`
  width: 97px;
  height: 97px;
  margin: 28px 0;
  border-radius: 50%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 43px;
  padding: 0 6px 0 20px;
  box-sizing: border-box;
  border-radius: 20px;

  background: ${({ theme }) => theme.color.white};
`;

const Input = styled.div`
  width: calc(100% - 40px);

  color: ${({ theme }) => theme.color.gray300};
  background-color: transparent;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BackButton = styled.img`
  height: 15px;
  width: 8px;

  cursor: pointer;
`;

const GroupList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 14px 16px;

  width: 100%;
  margin-top: 20px;
`;

const GroupContainer = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;

  width: fit-content;
  height: 33px;
  padding: 0 16px;
  border-radius: 16.5px;

  background-color: ${({ theme }) => theme.color.white};

  cursor: pointer;
`;

const GroupText = styled.div`
  font-size: 14px;
  font-weight: 500;

  color: ${({ theme }) => theme.color.red500};
`;
