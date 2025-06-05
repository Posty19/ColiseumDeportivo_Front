import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../../api/axiosConfig";

import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";

const getUsers = async () => {
  const res = await axiosInstance.get("/users/users");
  return res.data;
};

const createUser = async (user) => {
  const res = await axiosInstance.post("/users/user", user);
  return res;
};

const updateUser = async (userData) => {
  const res = await axiosInstance.put(`/users/update/${userData.id}`,userData.data);
  return res;
};

const deleteUser = async (userId) => {
  const res = await axiosInstance.delete(`/users/delete/${userId}`);
  return res;
};

const DashboardUsers = ({ children }) => {
  let table;
  const [newForm, setViewNew] = useState(false);
  const viewNewForm = () => setViewNew((prev) => !prev);
  const [updateForm, updateView] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({});
  const viewUpdateForm = (id) => {
    updateView((prev) => !prev);
    if (id) {
      const user = data.users.find((user) => user._id === id || user.id === id);
      setUserToUpdate(user);
    }else setUserToUpdate({});
  };


  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 0,
  });

  const queryClient = useQueryClient();
  const newUser = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["users"] });
      }, 500);
      setViewNew(false);
    },
    onError: (error) => console.log("Error al crear el usuario", error),
  });

  const eraseUser = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["users"] });
      }, 500);
    },
  });

  const changeUser = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["users"] });
      }, 500);
      updateView(false);
    },
  });

  const fns = {
    delete: eraseUser,
    update: viewUpdateForm,
  };

  if (isLoading) table = <p>Cargando Usuarios</p>;
  else if (error) table = <p>Error: {error}</p>;
  else if (!data.users) table = <p>No existen usuarios registrados</p>;
  else
    table = (
      <Table rows={data.users} dataType={"user"} fns={fns}>
        {children}
      </Table>
    );

  return (
    <>
      {newForm ? (
        <Form
          type="user"
          className={'dform'}
          fn={viewNewForm}
          submit={(userData) => newUser.mutate(userData)}
        >
          {children}
        </Form>
      ) : updateForm ? (
        <Form
          type="user"
          updtElement = {userToUpdate}
          className={'dform'}
          fn={viewUpdateForm}
          submit={(userData) =>{
            
            changeUser.mutate({
              id: userData._id || userData.id,
              data: userData,
            })
          }
          }
        >
          {children}
        </Form>
      ) : null}
      {!newForm && !updateForm ? (
        <Button type={"new"} txt="Crear Usuario" fn={viewNewForm}></Button>
      ) : null}
      {table}
    </>
  );
};
export default DashboardUsers;
