import { Link } from "react-router-dom";

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";
import { useContext } from "react";

const NavBar = () => {

  const {user} = useContext(GlobalContext);
  return (
    <nav>
      <ol>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/articles">Articulos</Link></li>
        <li><Link to="/notables">Personajes</Link></li>
        {!user.id?<li><Link to="/sesion">Sesión</Link></li>:null}
        {user.id?<li><Link to="/user">Mi Cuenta</Link></li>:null}
        {user.role==='admin'?<li><Link to="/dashboard">dashboard</Link></li>:null}
      </ol>
    </nav>
  );
};

export default NavBar;
