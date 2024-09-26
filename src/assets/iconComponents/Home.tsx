const DEFAULT_COLOR = '#212121';

const Home = ({ color = DEFAULT_COLOR }) => (
  <svg
    width="17"
    height="19"
    viewBox="0 0 17 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1.03332"
      y="5.0398"
      width="8.4"
      height="13.4"
      rx="1.2"
      transform="rotate(-20.9709 1.03332 5.0398)"
      stroke={color}
      strokeWidth="1.6"
    />
    <rect
      x="7.8"
      y="0.8"
      width="8.4"
      height="13.4"
      rx="1.2"
      fill="white"
      stroke={color}
      strokeWidth="1.6"
    />
  </svg>
);

export default Home;
