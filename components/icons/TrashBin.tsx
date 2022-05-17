const TrashBin = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000"
      aria-hidden="true"
      fill="none"
      {...props}
    >
      <path d="M11,13H4a1,1,0,0,1-1-1V3h9v9a1,1,0,0,1-1,1Z"></path>
      <path d="M6,10V6"></path>
      <path d="M9,10V6"></path>
      <path d="M1,3H14"></path>
      <path d="M9,1H6a1,1,0,0,0-.71.29A1,1,0,0,0,5,2V3h5V2a1,1,0,0,0-.29-.71A1,1,0,0,0,9,1Z"></path>
    </svg>
  );
};

export default TrashBin;
