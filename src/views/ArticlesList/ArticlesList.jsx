import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";

import Card from "../../components/Card/Card";

const getArticles = async () => {
  const res = await axiosInstance.get("/articles/articles");
  console.log(res.data);
  return res.data;
};
const ArticlesList = ({ children }) => {
  const { data, isLoading, error } = useQuery({
      queryKey: ["articles"],
      queryFn: getArticles,
      stateTime: 0,
    });
  if (isLoading) return <Card className="loading">{children}</Card>;
  else if (error) return <p>Error</p>;
  else if (!data.articles) return <p>Sin Contenido por el momento</p>;
  else {
    return <>
    {
      data.articles.map((article) => {
      return (
        <Card
          key={article._id}
          id={article._id}
          img={article.imgRoute}
          title={article.title}
          subtitle={article.subTitle}
          className="article"
        >
          {children}
        </Card>
      );
    })
    }
    </>
  }
};
export default ArticlesList;
