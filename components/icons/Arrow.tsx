const Arrow = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4.616 1.384L1 5l3.616 3.616"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path stroke="#000" d="M1.34 4.752h25"></path>
    </svg>
  );
};

export default Arrow;
