import type { NextPage } from "next";
import { LIKE_PATH } from "../../../utils/paths";
import { Props } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import api from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { toogleLike } from "../../../store/actions";
import { useDispatch } from "react-redux";
import Loading from "../Loading";
import { useState } from "react";

const Avatar: NextPage<Props> = ({ likeNumber, name, id, liked }) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const putLike = async () => {
    if (userId == null) {
      toast.error("deves logar primeiro");
      return;
    }
    setIsLoading(true);

    try {
      const response = await api.post(LIKE_PATH, {
        userId,
        videoId: id,
      });
      const { success, data } = response.data;

      if (success) {
        if (data == "Liked") {
          dispatch(toogleLike({ id: id, value: 1 }));
        } else {
          dispatch(toogleLike({ id: id, value: -1 }));
        }
        toast.success("Feito com sucesso");
      }
    } catch (err) {
      const message = JSON.parse(err?.request?.response).message;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <ul className="avatar-list">
        <li className="image-avatar">
          <img src="/assets/user.png" />
        </li>
        <li className="name-avatar">
          <p>{name}</p>
          <p className="total-like">{`${likeNumber} curtidas`} </p>
          <i className="fas fa-heart"></i>
        </li>
        <li onClick={() => putLike()}>
          <FontAwesomeIcon
            icon={faHeart}
            className="btn-like"
            color={liked ? "#d0312d" : "#aaa"}
          />
        </li>
      </ul>
      {isLoading && (
        <div className="loading">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Avatar;
