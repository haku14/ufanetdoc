const Like = ({ fill = "white" }: { fill: string }) => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 -3.71 75.17 75.17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Path_1"
        data-name="Path 1"
        d="M117.606,280.375s22.263-15.459,31.959-30.318c9.6-14.708.354-31.054-10.533-33.8-14.457-3.65-21.426,10.478-21.426,10.478s-6.968-14.128-21.425-10.478c-10.888,2.748-20.132,19.094-10.534,33.8C95.343,264.916,117.606,280.375,117.606,280.375Z"
        transform="translate(-80.021 -214.131)"
        fill={fill}
        stroke="black"
        stroke-linejoin="round"
        stroke-width="3"
      />
    </svg>
  );
};

export default Like;
