export type EventData = {
  days: Day[];
};

export type Day = {
  date: string;
  events: Events;
};

export type Events = Event[];

export type Event = {
  id: number;
  name: string;
  eventType: string;
  profileImageUrl: string;
  description: string;
};

export type ParsedEvent = {
  [key: string]: { count: 0; events: Events };
};
