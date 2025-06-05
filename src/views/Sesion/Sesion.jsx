import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import "./Sesion.css";

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
  const [message, setMessage] = useState("");

  useEffect(()=>{
    setMessage('');
  },[viewLogin])

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
      //console.log(data);
      localStorage.setItem("user", JSON.stringify(data.user));
      saveUser(data.user);
      setMessage(
        <ShowMessage
          clas={"succedMsg"}
          txt={`Hola ${data.user.name} Su inicio de sesion se ha realizado con exito`}
        />
      );
      setTimeout(() => {
        toHome();
      }, 2000);
    },
    onError: (error) => {
      setMessage(
        <ShowMessage
          clas={"errorMsg"}
          txt={`El usuario o la contraseña no son ccorrectos`}
        />
      );
    },
  });
  const register = useMutation({
    mutationFn: newUser,
    onSuccess: (data) => {
      saveUser(data.user);
      setMessage(
        <ShowMessage
          clas={"succedMsg"}
          txt={`Hola ${data.user.name} Su inicio de sesion se ha realizado con exito`}
        />
      );
      setTimeout(() => {
        toHome();
      }, 2000);
    },
    onError: (error) => {//console.log(error)
      let mssg;
      error.response.data.error.code === 11000? mssg = 'El correo electronico ya esta en uso':mssg = 'Ha ocurrido un error, por favor vuelva a intentarlo'
      setMessage(
        <ShowMessage
          clas={"errorMsg"}
          txt={mssg}
        />
      );
    },
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
          submit={(userData) => register.mutate(userData)}
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
