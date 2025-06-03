import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../api/axiosConfig";

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";
import { viewContext } from "../../layouts/HomeLayout/HomeLayout";
import Form from "../../components/Form/Form";
import ShowMessage from "../../components/showMessage/ShowMessage";

const getUser = async (user) => {
  const res = await axiosInstance.post("/auth/login", user);
  return res.data;
};
const newUser = async (user) => {
  const res = await axiosInstance.post("/auth/register", user);
  return res.data;
};

const Sesion = ({ children }) => {

  const { setView } = useContext(viewContext);
  const { saveUser } = useContext(GlobalContext);
  const [viewLogin, setLogin] = useState(true);
  const [message,setMessage] = useState('');

  const changeLogin = () => setLogin((prev) => !prev);

  const navigate = useNavigate();
  const toHome = () => navigate("/");

  useEffect(() => {
    setView(false);
    return () => setView(true);
  }, [setView]);
  const logIn = useMutation({
    mutationFn: getUser,
    onSuccess: (data) => {
      saveUser(data.user);
      setMessage (
        <ShowMessage
          clas={"succed"}
          txt={`Hola ${data.user.name} Su inicio de sesion se ha realizado con exito`}
        />
      );
      setTimeout(() => {
        toHome();
      }, 2000);
    },
    onError: (error) => console.log(error),
  });
  const register = useMutation({
    mutationFn: newUser,
    onSuccess: (data) => {
      saveUser(data.user);
      setMessage(
        <ShowMessage
          clas={"succed"}
          txt={`Hola ${data.user.name} Su inicio de sesion se ha realizado con exito`}
        />
      );
      setTimeout(() => {
        toHome();
      }, 2000);
    },
    onError: (error) => console.log(error),
  });

  return (
    <div className="loginContainer">
      {viewLogin ? (
        <Form
          type="login"
          fn={toHome}
          submit={(userData) => logIn.mutate(userData)}
          changeLogin={changeLogin}
        >
          {children}
        </Form>
      ) : (
        <Form
          type="register"
          fn={toHome}
          onSubmit={(userData) => register.mutate(userData)}
          changeLogin={changeLogin}
        >
          {children}
        </Form>
      )}
      {message}
    </div>
  );
};

export default Sesion;
