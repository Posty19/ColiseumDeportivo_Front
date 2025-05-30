import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ol>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Articles">Articulos</Link></li>
        <li><Link to="/Notables">Personajes</Link></li>
        <li><Link to="/dashboard">dashboard</Link></li>
      </ol>
    </nav>
  );
};

export default NavBar;
