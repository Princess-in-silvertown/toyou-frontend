const NextIcon = ({ color }: { color: string }) => (
  <svg
    width="35px"
    height="31px"
    viewBox="0 0 37 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 33L18.5 24L36 33"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M1 22L18.5 13L36 22"
      stroke={color}
      strokeOpacity="0.5"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M1 11L18.5 2L36 11"
      stroke={color}
      strokeOpacity="0.2"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default NextIcon;
