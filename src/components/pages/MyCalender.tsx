import Calendar from '@components/specific/Calender/Calender';
import EventUserItem from '@components/specific/Calender/EventUserItem';
import styled from 'styled-components';

const MyCalender = () => {
  const data = [
    {
      memberId: 1,
      name: '댄디효섭',
      introduce: '댄디함',
      eventType: '생일',
      imgUrl: '',
    },
    {
      memberId: 2,
      name: '시크효섭',
      introduce: '시크함',
      eventType: '생일',
      imgUrl: '',
    },
  ];

  return (
    <Container>
      <Calendar />
      <BorderLine />
      <EventContainer>
        <EventTitle>오늘의 이벤트</EventTitle>
        <EventMemberList>
          {data.map((item) => {
            const { memberId, name, introduce, eventType, imgUrl } = item;
            return (
              <EventUserItem
                key={memberId}
                id={memberId}
                name={name}
                imgUrl={imgUrl}
                introduce={introduce}
              />
            );
          })}
        </EventMemberList>
      </EventContainer>
    </Container>
  );
};

export default MyCalender;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const BorderLine = styled.div`
  border: 1px solid #e9e9e9;
`;

const EventTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: -0.03em;
`;

const EventContainer = styled.div`
  padding: 0 25px;

  font-size: 14px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: -0.03em;
`;

const EventMemberList = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 10px;
  gap: 10px;
`;
