import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";

import "./Notable.css";

const getNotable = async (id) => {
  const res = await axiosInstance.get(`/notables/notable/${id}`);
  return res.data;
};
const Notable = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["notable", id],
    queryFn: ({ queryKey }) => getNotable(queryKey[1]),
    staleTime: 0,
  });
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error</p>;
  const paragraphs = data.Notable.description.split("\n");
  return (
    <div className="notableDesc">
      <div className="image">
        <img
          src={`http://localhost:3000/files/download/${data.Notable.photoRoute}`}
          crossOrigin="use-credentials"
          alt={data.Notable.name}
        />
      </div>
      <div className="text">
        <h3 className="notableNameTitle">{data.Notable.name}</h3>
        <div className="NotableDescription">
          {paragraphs.map((paragraph, i) =>
            paragraph.trim().length > 0 ? <p key={i}>{paragraph}</p> : null
          )}
        </div>
      </div>
    </div>
  );
};
export default Notable;
