const EmptyMark = ({ ...props }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.083 9.307l-1.28-1.455 1.28 1.455a1.16 1.16 0 00.907.456 1.133 1.133 0 00.89-.396l4.79-5.04-4.79 5.04a1.133 1.133 0 01-.89.396 1.16 1.16 0 01-.907-.456zm-.148-2.45l1.06 1.205 4.582-4.775a.924.924 0 011.34 1.274L5.132 9.596a1.474 1.474 0 01-1.15.508 1.502 1.502 0 01-1.163-.58L1.538 8.065a.924.924 0 011.386-1.22l.01.011z"
        fill="#fff"
      ></path>
    </svg>
  );
};

export default EmptyMark;
