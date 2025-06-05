
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import "./Article.css";

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";

import ComentSection from "../../components/ComentSection/ComentSection";

const getArticle = async (id) => {
  const res = await axiosInstance.get(`/articles/articles/${id}`);
  return res.data;
};

const Article = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: ({ queryKey }) => getArticle(queryKey[1]),
    stateTime: 0,
  });
  if (isLoading) return <p>cargando...</p>;
  if (error) return <p>Error</p>;
  const paragraphs = data.article.content.split("\n");
  return (
    <div className="container">
      <div className="articleContent">
        <h3 className="articleTitle">{data.article.title}</h3>
        {data.article.imgRoute ? (
          <img
            src={`https://coliseumdeportivo-back.onrender.com/${data.article.imgRoute}`}
            crossOrigin="use-credentials"
            className="articleImage"
            alt={data.article.title}
          />
        ) : null}
        <h4 className="articleSubtitle">{data.article.subTitle}</h4>
        <div className="articleContent">
          {paragraphs.map((paragraph, i) =>
            paragraph.trim().length > 0 ? <p key={i}>{paragraph}</p> : null
          )}
        </div>
      </div>
          <ComentSection articleId={id}/>
    </div>
  );
};
export default Article;
