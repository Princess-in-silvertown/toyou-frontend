import styled from 'styled-components';

interface Props {
  isSelected: boolean;
  name: string;
  svg: React.FC<{ color: string }>;
  handleClick: () => void;
}

const NavBarItem = ({ isSelected, name, svg, handleClick }: Props) => {
  const Svg = svg;

  return (
    <Container onClick={handleClick}>
      <Svg color={isSelected ? 'black' : 'gray'} />
      <Text $isSelected={isSelected}>{name}</Text>
    </Container>
  );
};

export default NavBarItem;

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

const Icon = styled.img`
  fill: 'blue';
`;

const Text = styled.div<{ $isSelected: boolean }>`
  color: ${({ $isSelected }) => ($isSelected ? 'black' : 'gray')};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: center;
`;
