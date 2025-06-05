import { Link } from "react-router-dom";

const DashboardNav = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Inicio</Link></li>
        <li><Link to="/dashboard/Users">Usuarios</Link></li>
        <li><Link to="/dashboard/Articles">Articulos</Link></li>
        <li><Link to="/dashboard/Notables">Personajes</Link></li>
        <li><Link to="/">Inicio</Link></li>
      </ul>
    </nav>
  );
};

export default DashboardNav;
