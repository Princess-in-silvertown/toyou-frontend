import styled from 'styled-components';

interface Props {
  currentIndex: number;
  totalCount: number;
}

const ProgressiveDots = ({ totalCount, currentIndex }: Props) => {
  return (
    <Progressive>
      {new Array(totalCount).fill(0).map((_, i) => {
        return <ProgressiveDot key={i} $isCurrent={i === currentIndex} />;
      })}
    </Progressive>
  );
};

export default ProgressiveDots;

const Progressive = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProgressiveDot = styled.div<{ $isCurrent: boolean }>`
  width: ${({ $isCurrent }) => ($isCurrent ? '27px' : '5px')};
  height: 5px;
  border-radius: 4px;

  background-color: ${({ $isCurrent, theme }) =>
    $isCurrent ? theme.color.gray500 : theme.color.gray300};

  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
  transform-origin: center;
`;
