import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import "./ComentSection.css";

import axiosInstance from "../../api/axiosConfig";
import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";

import Button from "../Button/Button";

const getComents = async (artId) => {
  const res = await axiosInstance.get(`/coments/${artId}`);
  return res.data;
};
const createArticle = async (article) => {
  const res = await axiosInstance.post("/coments", article);
  return res.data;
};
const ComentSection = ({ articleId }) => {
  let comentList;
  const [inactive, setInactive] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState("");
  const { user } = useContext(GlobalContext);
  const navigate = new useNavigate();
  const toLogin = () => {
    navigate("/sesion");
  };

  const handlerChange = (e) => {
    e.target.value.length > 0 &&
      (setInactive(false), setTextAreaValue(e.target.value));
    e.target.value.length === 0 && setInactive(true);
  };

  const queryClient = useQueryClient();
  const users = queryClient.getQueryData(["users"]).users;

  const { data, isLoading, error } = useQuery({
    queryKey: ["coments", articleId],
    queryFn: ({ queryKey }) => getComents(queryKey[1]),
    staleTime: 0,
    retry: 3,
    //retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 3000),
  });

  const newComent = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coments"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["coments"] });
      }, 500);
    },
    onError: (error) => console.log("Error al creae el comentario: ", error),
  });

  const handleSend = (e) => {
    const coment = {
      content: textAreaValue,
      userId: user.id,
      articleId: articleId,
    };
    newComent.mutate(coment);
    e.target.parentNode.firstChild.value = "";
  };

  if (!user.email)
    return (
      <div className="toLogin">
        <Button
          txt="inica sesion para ver/comentar"
          fn={toLogin}
          type={"change"}
        />
      </div>
    );
  if (isLoading)
    comentList = <p className="noComents">Cargndo Comentarios...</p>;
  if (error)
    comentList = <p className="noComents">Error en la carga de comentarios</p>;

  if (!data || !data.coments || data.coments.length === 0)
    comentList = <p className="noComents">Se el primero en comentar</p>;
  else
    comentList = (
      <div className="comentsContainer">
        {data.coments.map((coment) => {
          return (
            <div
              className={`coment ${
                users.find((user) => user._id === coment.userId) && "right"
              }`}
              key={coment._id}
            >
              <span>
                {users.find((user) => user._id === coment.userId).name}{" "}
                {users.find((user) => user._id === coment.userId).lastName}:
              </span>
              <span>
                {new Intl.DateTimeFormat("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "UTC",
                }).format(new Date(coment.createDate))}
              </span>
              <p>{coment.content}</p>
            </div>
          );
        })}
      </div>
    );

  return (
    <div>
      <div className="newComent">
        <textarea
          name="newComent"
          id="newComentContent"
          className="writeComent"
          placeholder="Escribe tu comentario"
          onChange={handlerChange}
        ></textarea>
        <Button
          txt={"Comenta"}
          type={"save"}
          fn={handleSend}
          disabled={inactive}
        />
      </div>
      {comentList}
    </div>
  );
};

export default ComentSection;
