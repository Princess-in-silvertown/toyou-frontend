import styled, { keyframes } from 'styled-components';

interface Props {
  isSelected: boolean;
  name: string;
  svg: React.FC<{ color: string }>;
  handleClick: () => void;
  eventCount: number;
}

const NavBarItem = ({
  isSelected,
  name,
  svg,
  eventCount,
  handleClick,
}: Props) => {
  const Svg = svg;

  return (
    <Container onClick={handleClick}>
      <IconContainer>
        <Svg color={isSelected ? 'black' : '#9E9E9E'} />
        {eventCount > 0 && <EventCount>{eventCount}</EventCount>}
      </IconContainer>
      <Text $isSelected={isSelected}>{name}</Text>
    </Container>
  );
};

export default NavBarItem;

const appear = keyframes`
  from{
    transform: scale(0);
  }
  
  to{
    transform: scale(1);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  border-radius: 25px;

  background-color: none;
`;

const IconContainer = styled.div`
  position: relative;
`;

const EventCount = styled.div`
  position: absolute;
  top: 2px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 13px;
  height: 13px;
  border-radius: 50%;

  color: white;
  font-size: 10px;

  background-color: ${({ theme }) => theme.color.red500};
`;

const Text = styled.div<{ $isSelected: boolean }>`
  color: ${({ $isSelected }) => ($isSelected ? 'black' : 'gray')};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: center;
  font-display: swap;
`;
