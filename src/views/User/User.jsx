import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";

import './User.css'

import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { saveUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("user");
    saveUser({})
    navigate("/");
  };
  return (
    <div className="container">
      <Button type={"logOut"} txt={"Cerrar Sesión"} fn={logOut} />
    </div>
  );
};
export default User;
