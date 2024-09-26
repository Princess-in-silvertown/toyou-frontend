import styled from 'styled-components';
import schoolIcon from '@assets/icons/school.svg';
import { Group } from '@/types/group';

interface Props extends Group {
  handleAddGroup: (group: Group) => void;
}

const SearchedGroupItem = ({ handleAddGroup, id, name }: Props) => {
  const handleClick = () => {
    handleAddGroup({ id, name });
  };

  return (
    <Container onClick={handleClick}>
      <LeftContents>
        <Icon src={schoolIcon} alt="학교아이콘" />
        <Name>{name}</Name>
      </LeftContents>
      <RightContents />
    </Container>
  );
};

export default SearchedGroupItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
`;

const LeftContents = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RightContents = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  display: flex;
  flex-direction: center;
  align-items: center;

  width: 36px;
  height: 36px;

  border-radius: 50%;

  background-color: ${({ theme }) => theme.color.gray100};
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.09px;
  text-align: left;
`;
