import styled from 'styled-components';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

const DaysOfWeek = () => {
  return (
    <Container>
      {DAYS.map((day, index) => (
        <Day key={index}>{day}</Day>
      ))}
    </Container>
  );
};

export default DaysOfWeek;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 25px;
`;

const Day = styled.div`
  flex-grow: 1;
  font-size: 12px;
  color: #aaaaaa;
  text-align: center;
`;
