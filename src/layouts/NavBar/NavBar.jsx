import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

import './NavBar.css'

import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext";
import { useContext } from "react";

const NavBar = () => {

  const {user} = useContext(GlobalContext);
  return (
    <div className="nav-container">
      <img src="../../../public/1.png" alt="Coliseum deportivo" className="coliseumDeportivo-logo" />
      <nav className="navBar">
        <input type="checkbox" name="open-menu" id="open-menu" className="header-checkbox" />
        <label htmlFor="open-menu" className="menu-icon">
          <i className="bi bi-list"></i>
        </label>
        <ul className="navBar_list">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/articles">Noticias</Link></li>
          <li><Link to="/notables">Deportistas</Link></li>
          {!user.id?<li><Link to="/sesion">Sesión</Link></li>:null}
          {user.id?<li><Link to="/user">Mi Cuenta</Link></li>:null}
          {user.role==='admin'?<li><Link to="/dashboard">dashboard</Link></li>:null}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
