import styled from 'styled-components';

interface Props {
  isSwitchOn: boolean;
  handleTriggerOn: () => void;
  handleTriggerOff: () => void;
  style: {
    mainColor?: string;
  };
}

const ToggleBar = ({
  isSwitchOn,
  handleTriggerOn,
  handleTriggerOff,
  style,
}: Props) => {
  const { mainColor = '#00aaff' } = style;

  const handleClick = () => {
    isSwitchOn ? handleTriggerOff() : handleTriggerOn();
  };

  return (
    <Container>
      <Switch
        onClick={handleClick}
        $isActive={isSwitchOn}
        $mainColor={mainColor}
      >
        <Button $isActive={isSwitchOn} $mainColor={mainColor} />
      </Switch>
    </Container>
  );
};

export default ToggleBar;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Switch = styled.div<{ $isActive: boolean; $mainColor: string }>`
  display: block;
  position: relative;

  width: 70px;
  height: 35px;
  border-radius: 30px;
  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);

  background-color: ${(props) => (props.$isActive ? props.$mainColor : '#fff')};

  transition: all 0.2s ease-in;
  cursor: pointer;
`;

const Button = styled.div<{ $isActive: boolean; $mainColor: string }>`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.$isActive ? 'calc(100% - 32px)' : '4px')};

  width: 28px;
  height: 28px;
  border-radius: 50%;

  background-color: ${(props) =>
    props.$isActive ? '#ffffff' : props.$mainColor};

  transform: translateY(-50%);
  transition: all 0.2s ease-in;
`;
