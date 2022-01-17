import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../Avatar";
import { youtube_parser } from "../../general/getYoutubeId";
import Loading from "../Loading";
import FloatButton from "../FloatButton";
import { VIDEO_PATH } from "../../../utils/paths";
import api from "../../../services/api";
import { toogleData } from "../../../store/actions";
import { toast } from "react-toastify";

const ListVideo: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const loadMoreRef = useRef(null);
  const dispatch = useDispatch();
  const listVideos: any = useSelector((state) => state);

  const getVideo = async () => {
    try {
      const response = await api.get(VIDEO_PATH);
      const { success, data } = response.data;

      if (success) {
        dispatch(toogleData(data));
        toast.success("Dados Carregados com sucesso");
      }
    } catch (err) {
      console.log(err.request.message);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];

      if (target.isIntersecting && currentPage * 8 <= listVideos.length - 8) {
        setCurrentPage((page) => page + 1);
      }
    }, options);

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
  });

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <>
      <div className="list-video-main">
        {listVideos?.data?.slice(0, 8 * currentPage)?.map((video) => (
          <div className="list-video-list ">
            <embed
              src={`https://www.youtube.com/embed/${youtube_parser(video.url)}`}
              className="iframe-video"
              title="video"
            />
            <div className="list-video-body">
              <Avatar
                likeNumber={video?.qtdReactions}
                name={video?.user?.username}
                id={video.id}
                liked={video.liked}
              />
              <p className="list-video-description">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="loading" ref={loadMoreRef}>
        <Loading />
      </div>
      <FloatButton />
    </>
  );
};

export default ListVideo;
