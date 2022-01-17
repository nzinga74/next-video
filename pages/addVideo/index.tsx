import type { NextPage } from "next";
import { useFormik } from "formik";
import api from "../../services/api";
import { VIDEO_PATH } from "../../utils/paths";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import withAuth from "../../auth/withAuth";
import { useState } from "react";
import FloatButton from "../../client/component/FloatButton";
import Loading from "../../client/component/Loading";
const AddVideo: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useAuth();
  const formik = useFormik({
    initialValues: {
      url: "",
      title: "",
      description: "",
    },
    onSubmit: async (values) => {
      const { title, url, description } = values;
      setIsLoading(true);
      try {
        const response = await api.post(VIDEO_PATH, {
          title,
          url,
          description,
          userId,
        });
        const { success } = response.data;

        if (success) {
          toast.success("Video Cadastrado Com Sucesso");
        }
      } catch (err) {
        console.log(err.request.response);
        toast.warning(JSON.parse(err.request.response).message);
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <>
      <div className="wrapper-add">
        <div className="form-side form-side-add">
          <form onSubmit={formik.handleSubmit}>
            <input
              className="input-type"
              type="text"
              name="url"
              placeholder="Link do Youtube"
              onChange={formik.handleChange}
              value={formik.values.url}
              required
            />
            <input
              className="input-type"
              type="title"
              name="title"
              placeholder="Titulo"
              onChange={formik.handleChange}
              value={formik.values.title}
              required
            />
            <textarea
              placeholder="Descrição"
              className="text-area-description"
              onChange={formik.handleChange}
              name="description"
              value={formik.values.description}
              required
            ></textarea>
            <input
              className="login-button"
              type="submit"
              value="Cadastrar"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="loading">
                <Loading />
              </div>
            )}
          </form>
        </div>
        <div className="preview-side "></div>
      </div>
      <FloatButton />
    </>
  );
};

export default withAuth(AddVideo);
