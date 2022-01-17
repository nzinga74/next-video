import type { NextPage } from "next";

const Loading: NextPage = () => {
  return (
    <div className="lds-ellipsis ">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
