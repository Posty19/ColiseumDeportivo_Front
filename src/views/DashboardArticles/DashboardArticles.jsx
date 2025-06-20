import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";

import axiosInstance from "../../api/axiosConfig";

import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";

const getArticles = async () => {
  const res = await axiosInstance.get("/articles/articles");
  return res.data;
};

const deleteArticle = async (artId) => {
  const res = await axiosInstance.delete(`/articles/delete/${artId}`);
  return res;
};

const saveArticle = async (article) => {
  article.authorId =
    article.authorId || article.authorId;
  const res = await axiosInstance.post("/articles", article);
  return res;
};

const updateArticle = async (article) => {
  const res = await axiosInstance.put(
    `/articles/update/${article._id}`,
    article.data
  );
  return res;
};

const saveFile = async (file) => {
  const res = await axiosInstance.post("/files/upload", file);
  return res;
};

const DashboardArticles = ({ children }) => {
  let table;
  const { user } = useContext(GlobalContext);
  const [newForm, setViewNew] = useState(false);
  const viewNewForm = () => setViewNew((prev) => !prev);
  const [updateForm, updateView] = useState(false);
  const [atrToUpdate, setAtrToUpdate] = useState({});

  const viewUpdateForm = (id) => {
    updateView((prev) => !prev);
    if (id) {
      const art = data.articles.find((art) => art._id === id || art.id === id);
      setAtrToUpdate(art);
    } else setAtrToUpdate({});
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    stateTime: 0,
  });

  const queryClient = useQueryClient();
  const newArticle = useMutation({
    mutationFn: saveArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["articles"] });
      }, 500);
      setViewNew(false);
    },
    onError: (error) => console.log("Error al crear el articulo", error),
  });
  const changeArticle = useMutation({
    mutationFn: updateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["articles"] });
      }, 500);
      updateView(false);
    },
    onError: (error) => console.log("Error al actualizar el articulo", error),
  });
  const uploadFile = useMutation({
    mutationFn: saveFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["articles"] });
      }, 500);
      updateView(false);
    },
    onError: (error) => console.log("Error al subir el archivo", error),
  });

  const handlerAtr = async (art, mutation) => {
    try {
      if (art.file instanceof FileList && art.file.length !== 0) {
        const formDataFile = new FormData();
        formDataFile.append("file", art.file);
        await uploadFile.mutateAsync(formDataFile);
      }
      console.log(art);
      const article = {
        _id: art._id,
        title: art.title,
        authorId: art.authorId ? article.authorId : user.Id,
        subTitle: art.subTitle,
        content: art.content,
        imgRoute: art.file.name || '',
      };
      mutation === "new"
        ? newArticle.mutate(article)
        : mutation === "update"
        ? changeArticle.mutate(article)
        : null;
        setViewNew(false);
        updateView(false);
    } catch (error) {
      console.log(error);
    }
  };

  const eraseArt = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["users"] });
      }, 500);
    },
    onError: (error) => console.log("Error al elininar el archivo", error),
  });
  const fns = {
    delete: eraseArt,
    update: viewUpdateForm,
  };

  if (isLoading) table = <p>Cargando articulos...</p>;
  else if (error) table = <p>Error: {error}</p>;
  else if (!data.articles) table = <p>No existen articulos por el momento</p>;
  else
    table = (
      <Table rows={data.articles} dataType={"articles"} fns={fns}>
        {children}
      </Table>
    );
  return (
    <>
      {newForm ? (
        <Form
          type="article"
          fn={viewNewForm}
          className={'dform'}
          submit={(articleData) => handlerAtr(articleData, "new")}
        >
          {children}
        </Form>
      ) : updateForm ? (
        <Form
          type="article"
          fn={viewUpdateForm}
          updtElement={atrToUpdate}
          className={'dform'}
          submit={(articleData) => handlerAtr(articleData, "update")}
        >
          {children}
        </Form>
      ) : null}
      {!newForm && !updateForm ? (
        <Button type={"new"} txt="Crear Articulo" fn={viewNewForm}></Button>
      ) : null}
      {table}
    </>
  );
};
export default DashboardArticles;
