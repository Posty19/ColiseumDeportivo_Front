import { Link } from "react-router-dom";

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";
import { useContext } from "react";

const NavBar = () => {

  const {user} = useContext(GlobalContext);
  return (
    <nav>
      <ol>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Articles">Articulos</Link></li>
        <li><Link to="/Notables">Personajes</Link></li>
        {!user?<li><Link to="/Sesion">Sesión</Link></li>:null}
        {user?<li><Link to="/Usuario">Mi Cuenta</Link></li>:null}
        {user.role==='admin'?<li><Link to="/dashboard">dashboard</Link></li>:null}
      </ol>
    </nav>
  );
};

export default NavBar;
