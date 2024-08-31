import { CalenderProvider } from '@/contexts/providers/CalenderProvider';
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
      <CalenderProvider>
        <Calendar onChangeEventList={handleChangeEventList} />
      </CalenderProvider>
      <BorderLine />
      <EventContainer>
        <EventHeader>
          <EventTitle>이벤트</EventTitle>
          <EventLength>{eventList.length}개</EventLength>
        </EventHeader>
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
  touch-action: none;
`;

const BorderLine = styled.div`
  border: 1px solid #e9e9e9;
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: -0.03em;
`;

const EventTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: -0.03em;
`;

const EventLength = styled.div`
  font-size: 14px;
  line-height: 20.27px;
  letter-spacing: -0.02em;
  text-align: center;

  color: #9e9e9e;
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
  gap: 16px;

  margin-top: 16px;
  margin-bottom: 116px;

  overflow: auto;
`;
