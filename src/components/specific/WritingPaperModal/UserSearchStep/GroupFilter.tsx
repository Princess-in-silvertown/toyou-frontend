import { Group } from '@/types/group';
import styled from 'styled-components';
import down from '@assets/icons/down.svg';
import close from '@assets/icons/filterclose.svg';
import { useMyGroupList } from '@hooks/queries/useMyGroupList';
import {
  EventHandler,
  ReactEventHandler,
  TouchEventHandler,
  useState,
} from 'react';
import { useViewport } from '@hooks/useViewport';

interface Props {
  group: Group | null;
  onChangeGroup: (group: Group | null) => void;
}

const GroupFilter = ({ group, onChangeGroup }: Props) => {
  const { data } = useMyGroupList();

  const [isVisible, setIsVisible] = useState(false);

  const showGroupList = () => {
    setIsVisible(true);
  };

  const notShowGroupList = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 0);
  };

  const handleCloseFilterList: ReactEventHandler = (e) => {
    e.stopPropagation();
    onChangeGroup(null);
  };

  return (
    <Container>
      <SelectButton
        onClick={showGroupList}
        onBlur={notShowGroupList}
        $isGroupNull={!group}
      >
        {group?.name ?? '그룹 선택'}
        {group ? (
          <CloseIcon src={close} onClick={handleCloseFilterList} />
        ) : (
          <DownIcon src={down} />
        )}
      </SelectButton>
      {isVisible && (
        <ListContainer>
          {data?.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => {
                onChangeGroup({ ...item });
                notShowGroupList();
              }}
            >
              {item?.name}
            </ListItem>
          ))}
        </ListContainer>
      )}
    </Container>
  );
};

export default GroupFilter;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectButton = styled.button<{ $isGroupNull: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  height: 31px;
  padding: 0 16px;
  border-radius: 15.5px;

  color: #fcfcfc;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  text-align: center;
  white-space: nowrap;

  background-color: ${({ $isGroupNull }) =>
    $isGroupNull ? '#616161' : '#dd432e'};
`;

const DownIcon = styled.img`
  width: 11px;
`;

const CloseIcon = styled.img`
  width: 9px;
`;

const ListContainer = styled.ul`
  position: absolute;
  top: 45px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100px;
  padding: 12px;
  border-radius: 15px;

  background-color: #fcfcfc;
  box-shadow: 10px 10px 60px -16px #6161615f;

  z-index: 2;
`;

const ListItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  text-align: left;
  color: #616161;
`;
