import { Events } from '@/types/event';
import Calendar from '@components/specific/Calender/Calender';
import EventUserItem from '@components/specific/EventList/EventUserItem';
import { useState } from 'react';
import styled from 'styled-components';

const MyCalender = () => {
  const [eventList, setEventList] = useState<Events>([]);

  const handleChangeEventList = (events?: Events) => {
    setEventList(events ?? []);
  };

  return (
    <Container>
      <Calendar onChangeEventList={handleChangeEventList} />
      <BorderLine />
      <EventContainer>
        <EventTitle>오늘의 이벤트</EventTitle>
        <EventMemberList>
          {eventList.map((item) => {
            return <EventUserItem key={item.memberId} {...item} />;
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
