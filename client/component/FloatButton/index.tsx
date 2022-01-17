import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUserPlus,
  faSignInAlt,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const FloatButton: NextPage = () => {
  const router = useRouter();
  return (
    <div className="fab-wrapper">
      <input id="fabCheckbox" type="checkbox" className="fab-checkbox" />
      <label className="fab" htmlFor="fabCheckbox">
        <span className="fab-dots fab-dots-1"></span>
        <span className="fab-dots fab-dots-2"></span>
        <span className="fab-dots fab-dots-3"></span>
      </label>
      <div className="fab-wheel">
        <a
          className="fab-action fab-action-1"
          onClick={() => router.push("/addVideo")}
        >
          <FontAwesomeIcon icon={faPlus} className="btn-like" color="#fff" />
        </a>
        <a
          className="fab-action fab-action-2"
          onClick={() => router.push("/login")}
        >
          <FontAwesomeIcon
            icon={faSignInAlt}
            className="btn-like"
            color="#fff"
          />
        </a>
        <a className="fab-action fab-action-3" onClick={() => router.back()}>
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            className="btn-like"
            color="#fff"
          />
        </a>
        <a
          className="fab-action fab-action-4"
          onClick={() => router.push("/register")}
        >
          <FontAwesomeIcon
            icon={faUserPlus}
            className="btn-like"
            color="#fff"
          />
        </a>
      </div>
    </div>
  );
};

export default FloatButton;
