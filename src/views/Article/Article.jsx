import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";

const getArticle = async (id)=>{
    const res = await axiosInstance.get(`/articles/articles/${id}`);
    console.log(res.data);
    return res.data;
}

const Article = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["article",id],
    queryFn:({ queryKey }) => getArticle(queryKey[1]),
    stateTime: 0,
  });
  if(isLoading) return <p>cargando...</p>
  if(error) return <p>Error</p>
  const paragraphs = data.article.content.split('\n')
  return (
    <div className="article">
      <h3>{data.article.title}</h3>
      <h4>{data.article.subTitle}</h4>
      {
        data.article.imgRoute?<img src={`http://localhost:3000/files/download/${data.article.imgRoute}`}
        crossOrigin="use-credentials" alt={data.article.title} />:null
      }
        <div>
            {
            paragraphs.map((paragraph,i)=>
                paragraph.trim().length>0?<p key={i}>{paragraph}</p>:null
            )
        }
        </div>
    </div>
  );
};
export default Article;
