import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


import axiosInstance from "../../api/axiosConfig";

import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";

const getNotables = async () => {
  const res = await axiosInstance.get("/notables");
  return res.data;
};
const saveNotable = async (notableData) => {
  const res = await axiosInstance.post("/notables", notableData);
  return res.data;
};
const updateNotable = async (notableData) => {
    const res = await axiosInstance.put(
    `/notables/update/${notableData._id}`,
    notableData
  );
  return res.data;
};
const deleteNotable = async (notableId) => {
  const res = await axiosInstance.delete(`/notables/delete/${notableId}`);
  return res.data;
};
const saveFile = async (file) => {
  const res = await axiosInstance.post("/files/upload", file);
  return res;
};
const DashboardNotables = ({ children }) => {
  let table;
  const [newForm, setViewNew] = useState(false);
  const viewNewForm = () => setViewNew((prev) => !prev);
  const [updateForm, updateView] = useState(false);
  const [notableToUpdate, setNtblToUpdate] = useState(false);

  const viewUpdateForm = (id) => {
    updateView((prev) => !prev);
    if (id) {
      const ntbl = data.notables.find((ntbl) => ntbl._id === id || ntbl.id === id);
      setNtblToUpdate(ntbl);
    } else setNtblToUpdate({});
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["notables"],
    queryFn: getNotables,
    stateTime: 0,
  });

  const queryClient = useQueryClient();
  const newNotable = useMutation({
    mutationFn: saveNotable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notables"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["notables"] });
        setViewNew(false);
      }, 5000);
    },
    onError: (error) => console.log("Error al crear al perjonaje", error),
  });

  const changeNotable = useMutation({
    mutationFn: updateNotable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notables"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["notables"] });
        updateView(false);
      }, 5000);
    },
    onError: (error) => console.log("Error al actualizar al personaje", error),
  });
  const uploadFile = useMutation({
    mutationFn: saveFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["articles"] });
      }, 500);
    },
    onError: (error) => console.log("Error al subir el archivo", error),
  });

  const eraseNtbl = useMutation({
    mutationFn: deleteNotable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notables"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["notables"] });
      }, 5000);
    },
    onError: (error) => console.log("Error al eliminar al personaje", error),
  });

  const handlerNtbl = async (ntbl, mutation) => {
    try {
      if (ntbl.file) {
        const formDataFile = new FormData();
        formDataFile.append("file", ntbl.file);
        await uploadFile.mutateAsync(formDataFile);
      }
      const notable = {
        _id: ntbl._id || null,
        name: ntbl.name,
        description: ntbl.description,
        photoRoute: ntbl.file? ntbl.file.name:ntbl.photoRoute,
      };
      mutation === "new"
        ? newNotable.mutate(notable)
        : mutation === "update"
        ? changeNotable.mutate(notable)
        : null;
    } catch (error) {
      console.log(error);
    }
  };
  const fns = {
    delete: eraseNtbl,
    update: viewUpdateForm,
  };

  if (isLoading) table = <p>Cargando a los personajes</p>;
  else if (error) table = <p>Error al cargar a los personajes</p>;
  else if (!data.notables) table = <p>No existen registros de personajes</p>;
  else
    table = (
      <Table rows={data.notables} dataType={"notables"} fns={fns}>
        {children}
      </Table>
    );

  return (
    <>
      {newForm ? (
        <Form
          type="notable"
          fn={viewNewForm}
          submit={(ntblData) => handlerNtbl(ntblData, "new")}
        >
          {children}
        </Form>
      ) : updateForm ? (
        <Form
          type="notable"
          fn={viewUpdateForm}
          updtElement={notableToUpdate}
          submit={(ntblData) => handlerNtbl(ntblData, "update")}
        >
          {children}
        </Form>
      ) : null}
      {!newForm && !updateForm ? (
        <Button type={"new"} txt="Crear Personaje" fn={viewNewForm}></Button>
      ) : null}
      {table}
    </>
  );
};
export default DashboardNotables;
