import { useCustomNavigate } from '@/routers/useCustomNavigate';
import { Group } from '@/types/group';
import GroupSearch from '@components/specific/GroupSearch/GroupSearch';
import { usePutMyInfo, useSuspenseMyInfo } from '@hooks/queries/useMyInfo';
import { ChangeEventHandler, useState } from 'react';
import back from '@assets/icons/back.svg';
import styled from 'styled-components';
import { Info } from '@/types/user';

const INTRODUCTION_MAX_LENGTH = 20;

const EditMyInfoPage = () => {
  const { data } = useSuspenseMyInfo();
  const { mutateAsync } = usePutMyInfo();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [groups, setGroups] = useState<Group[]>(data.groups ?? []);
  const [introduction, setIntroduction] = useState(data.introduction ?? '');

  const { goToBack, goToHomePage } = useCustomNavigate();

  const goToNextInput = () => {
    if (groups.length === 0) return;

    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevInput = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleClickBackButton = () => {
    if (currentIndex === 0) {
      goToBack();

      return;
    }

    goToPrevInput();
  };

  const handleSubmit = () => {
    const { id, name, birthday, imageUrl } = data;

    const newInfo: Info = {
      id,
      name,
      birthday,
      imageUrl,
      introduction,
      groups,
    };

    mutateAsync(newInfo).then(() => goToHomePage());
  };

  const handleChangeIntroduction: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.value.length > INTRODUCTION_MAX_LENGTH)
      e.target.value = e.target.value.substr(0, INTRODUCTION_MAX_LENGTH);

    setIntroduction(e.target.value);
  };

  const handleAddGroup = (group: Group) => {
    if (groups.findIndex((item) => item.id === group.id) !== -1) return;

    setGroups((prev) => [...prev, group]);
  };

  const handleDeleteGroup = (group: Group) => {
    setGroups((prev) => prev.filter((item) => item.id !== group.id));
  };

  return (
    <Container>
      <ContainerHeader>
        <BackButton src={back} onClick={handleClickBackButton} />
        <Title>{currentIndex === 0 ? '학교 입력' : '프로필 등록'}</Title>
        <Empty />
      </ContainerHeader>
      <FormListContainer>
        <FormItemContainer
          style={{
            transform: `translateX(calc(${-100 * currentIndex}% - ${
              currentIndex * 50
            }px))`,
          }}
        >
          <GroupSearch
            groups={groups}
            handleAddGroup={handleAddGroup}
            handleDeleteGroup={handleDeleteGroup}
          />
        </FormItemContainer>
        <FormItemContainer
          style={{
            transform: `translateX(calc(${-100 * currentIndex}% - ${
              currentIndex * 50
            }px))`,
          }}
        >
          <ProfileImage src={data?.imageUrl} />
          <InputContainer>
            <Input
              maxLength={INTRODUCTION_MAX_LENGTH}
              placeholder="한줄로 자신을 소개해주세요!"
              value={introduction}
              onChange={handleChangeIntroduction}
              tabIndex={-1}
            />
          </InputContainer>
          <TextLength>{`${introduction?.length}/20`}</TextLength>
        </FormItemContainer>
      </FormListContainer>
      {currentIndex === 0 && (
        <NextButton $canNext={groups.length > 0} onClick={goToNextInput}>
          다음으로
        </NextButton>
      )}
      {currentIndex === 1 && (
        <NextButton $canNext={true} onClick={handleSubmit}>
          제출하기
        </NextButton>
      )}
    </Container>
  );
};

export default EditMyInfoPage;

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

const FormListContainer = styled.div`
  display: flex;
  gap: 50px;

  overflow: hidden;
`;

const Empty = styled.div`
  width: 30px;
`;

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 100%;

  transition: transform 0.3s ease-out;
  will-change: transform;
`;

const TextLength = styled.div`
  display: flex;
  flex-direction: row-reverse;

  box-sizing: border-box;
  padding: 6px 8px;
  width: 100%;

  font-size: 12px;
  color: ${({ theme }) => theme.color.gray300};
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

const Input = styled.input`
  width: calc(100% - 40px);

  background-color: transparent;
`;

const BackButton = styled.img`
  height: 15px;
  width: 8px;

  cursor: pointer;
`;
