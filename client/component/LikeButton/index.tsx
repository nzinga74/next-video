import type { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton: NextPage = () => {
  return (
    <FontAwesomeIcon icon={faHeart} className="btn-like" color="#d0312d" />
  );
};

export default LikeButton;
