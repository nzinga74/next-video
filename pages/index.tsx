import type { NextPage } from "next";
import ListVideo from "../client/component/ListVideo";

const Home: NextPage = () => {
  return (
    <div className="wrapper-app ">
      <ListVideo />
    </div>
  );
};

export default Home;
