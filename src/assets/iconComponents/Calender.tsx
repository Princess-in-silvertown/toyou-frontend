const DEFAULT_COLOR = '#212121';

const Calender = ({ color = DEFAULT_COLOR }) => (
  <svg
    width="64"
    height="32"
    viewBox="0 0 64 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.2222 8.8H37.3333V7H35.5556V8.8H28.4444V7H26.6667V8.8H25.7778C24.7911 8.8 24 9.61 24 10.6V23.2C24 24.19 24.7911 25 25.7778 25H38.2222C39.2 25 40 24.19 40 23.2V10.6C40 9.61 39.2 8.8 38.2222 8.8ZM38.2222 23.2H25.7778V13.3H38.2222V23.2ZM27.1111 16.9C27.1111 15.658 28.1067 14.65 29.3333 14.65C30.56 14.65 31.5556 15.658 31.5556 16.9C31.5556 18.142 30.56 19.15 29.3333 19.15C28.1067 19.15 27.1111 18.142 27.1111 16.9Z"
      fill={color}
    />
  </svg>
);

export default Calender;