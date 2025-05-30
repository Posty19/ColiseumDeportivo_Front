import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import axiosInstance from "../../api/axiosConfig";

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";

const getUsers = async () => {
  const res = await axiosInstance.get("/users/users");
  return res.data;
};

/* const createUsers = async (user) => {
  const res = await axiosInstance.post("/user", user);
  return res;
};
 */
const DashboardUsers = ({ children }) => {
  /*
        C => boton => form 
        **R => fetch => imprimir
        U => boton => form => reimprimir
        D => boton => reimprimir
    */
  const { state } = useContext(GlobalContext);
  console.log(state.newUser);
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  let table;
  if (isLoading) table = <p>Cargando Usuarios</p>;
  else if (error) table = <p>Error: {error}</p>;
  else if (!data.users) table = <p>No existen usuarios</p>;
  else
    table = (
      <Table rows={data.users} dataType={"user"}>
        {children}
      </Table>
    );

  return (
    <>
      {state.newUser ? <Form type="newUser">{children}</Form> : null}
      {!state.newUser ? <Button type={"new"} fn="newUser"></Button> : null}
      {table}
    </>
  );
};
export default DashboardUsers;
